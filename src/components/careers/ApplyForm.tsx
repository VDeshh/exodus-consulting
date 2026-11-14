"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/track";

/**
 * Application form for an open role. Posts JSON to /api/apply (a Vercel
 * function beside the static site), which emails the founders with the resume
 * attached. The resume travels as base64, so it is capped at 3 MB here and
 * again on the server.
 *
 * Validation follows the usual pattern: each field checks itself on blur with
 * the message tied to it by aria-describedby, and a failed submit puts a
 * focusable summary at the top that links to every problem.
 */

const MAX_BYTES = 3 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const EXPERIENCE = ["Under 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"];
const SUMMARY_MAX = 2000;

type Field = "name" | "email" | "phone" | "location" | "linkedin" | "experience" | "summary" | "source" | "resume" | "consent";
type Errors = Partial<Record<Field, string>>;

const LABEL: Record<Field, string> = {
  name: "Full name",
  email: "Email",
  phone: "Phone",
  location: "Where you are based",
  linkedin: "LinkedIn profile",
  experience: "Years of B2B sales experience",
  summary: "Your B2B closing experience",
  source: "How did you hear about us?",
  resume: "Resume",
  consent: "Consent",
};

function check(field: Field, v: Record<string, unknown>): string | undefined {
  const s = (k: string) => String(v[k] ?? "").trim();
  switch (field) {
    case "name": return s("name").length < 2 ? "Enter your full name." : undefined;
    case "email": return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s("email")) ? undefined : "Enter a valid email address, like name@company.com.";
    case "location": return s("location").length < 2 ? "Enter the city and province or country you work from." : undefined;
    case "linkedin": return !s("linkedin") || /^https?:\/\/\S+$/i.test(s("linkedin")) ? undefined : "Enter the full link, starting with https://";
    case "experience": return s("experience") ? undefined : "Choose your years of B2B sales experience.";
    case "summary": return s("summary").length < 40 ? "Tell us a little more: a few sentences on what you sold, to whom, and what you closed." : undefined;
    case "resume": {
      const f = v.resume as File | null;
      if (!f) return "Attach your resume as a PDF or Word document.";
      if (!/\.(pdf|docx?)$/i.test(f.name)) return "Upload a PDF or Word document.";
      if (f.size > MAX_BYTES) return "Your resume must be 3 MB or smaller.";
      return undefined;
    }
    case "consent": return v.consent ? undefined : "Please confirm we can use your application to assess it.";
    default: return undefined;
  }
}

const REQUIRED: Field[] = ["name", "email", "location", "linkedin", "experience", "summary", "resume", "consent"];

const toBase64 = (file: File) =>
  new Promise<string>((ok, fail) => {
    const r = new FileReader();
    r.onload = () => ok(String(r.result).split(",")[1] ?? "");
    r.onerror = () => fail(r.error);
    r.readAsDataURL(file);
  });

const kb = (n: number) => (n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`);

export function ApplyForm({ role, roleTitle }: { role: string; roleTitle: string }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const started = useRef(Date.now());
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const [v, setV] = useState<Record<string, unknown>>({ name: "", email: "", phone: "", location: "", linkedin: "", experience: "", summary: "", source: "", resume: null, consent: false, website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [failMsg, setFailMsg] = useState("");
  const [drag, setDrag] = useState(false);

  useEffect(() => { if (showSummary) summaryRef.current?.focus(); }, [showSummary]);
  // The form collapses into a much shorter panel on success, which leaves the
  // viewport below it. Bring the panel to just under the nav, then focus it.
  useEffect(() => {
    if (state !== "done" || !doneRef.current) return;
    const el = doneRef.current;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    el.focus({ preventScroll: true });
  }, [state]);

  const set = (k: string, val: unknown) => {
    setV((p) => ({ ...p, [k]: val }));
    // Once a field has shown an error, re-check it as the person fixes it.
    if (errors[k as Field]) setErrors((e) => ({ ...e, [k]: check(k as Field, { ...v, [k]: val }) }));
  };
  const blur = (k: Field) => setErrors((e) => ({ ...e, [k]: check(k, v) }));

  const pickFile = (file: File | undefined | null) => {
    if (!file) return;
    set("resume", file);
    setErrors((e) => ({ ...e, resume: check("resume", { ...v, resume: file }) }));
  };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    const next: Errors = {};
    for (const f of REQUIRED) { const m = check(f, v); if (m) next[f] = m; }
    setErrors(next);
    if (Object.keys(next).length) { setShowSummary(false); requestAnimationFrame(() => setShowSummary(true)); return; }
    setShowSummary(false);
    setState("sending");
    try {
      const file = v.resume as File;
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          name: v.name, email: v.email, phone: v.phone, location: v.location, linkedin: v.linkedin,
          experience: v.experience, summary: v.summary, source: v.source, consent: v.consent === true,
          resume: await toBase64(file), resumeName: file.name,
          website: v.website, elapsed: Date.now() - started.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) { setState("done"); track("career_application_sent", { role }); return; }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors); setState("idle"); requestAnimationFrame(() => setShowSummary(true)); return;
      }
      setFailMsg(data.error || "Something went wrong on our side.");
      setState("failed");
    } catch {
      setFailMsg("We could not reach the server. Check your connection and try again.");
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} className="apply-done glass p-8 md:p-10 outline-none lg:self-start" role="status">
        <div className="apply-tick" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.2 4.2L19 7" /></svg>
        </div>
        <p className="display display-md text-paper mt-6">Application sent.</p>
        <p className="lede mt-4">Thank you, {String(v.name).split(" ")[0]}. Your application for {roleTitle} went straight to the founders, with your resume attached. If your experience fits, we will be in touch by email at {String(v.email)}.</p>
      </div>
    );
  }

  const errList = (Object.keys(errors) as Field[]).filter((k) => errors[k]);
  const describe = (f: Field, hint?: boolean) => [hint ? id(`${f}-hint`) : "", errors[f] ? id(`${f}-err`) : ""].filter(Boolean).join(" ") || undefined;
  const Err = ({ f }: { f: Field }) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="apply-err">
        <svg viewBox="0 0 16 16" aria-hidden><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M8 4.5v4.2M8 11.2v.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        {errors[f]}
      </p>
    ) : null;
  const Label = ({ f, optional }: { f: Field; optional?: boolean }) => (
    <label htmlFor={id(f)} className="apply-label">
      {LABEL[f]} {optional ? <span className="apply-opt">Optional</span> : null}
    </label>
  );
  const file = v.resume as File | null;
  const summaryLen = String(v.summary).length;

  return (
    <form onSubmit={submit} noValidate className="apply-form glass p-6 md:p-10" aria-describedby={id("intro")}>
      <p id={id("intro")} className="note">Fields marked optional can be left blank. Everything else is required.</p>

      {showSummary && errList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby={id("sum-title")} className="apply-summary mt-6 outline-none">
          <p id={id("sum-title")} className="text-paper font-semibold">There {errList.length === 1 ? "is 1 thing" : `are ${errList.length} things`} to fix</p>
          <ul className="mt-2 grid gap-1">
            {errList.map((f) => (
              <li key={f}><a href={`#${id(f)}`} className="apply-sum-link" onClick={(e) => { e.preventDefault(); document.getElementById(id(f))?.focus(); }}>{errors[f]}</a></li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div className="apply-hp" aria-hidden>
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" value={String(v.website)} onChange={(e) => set("website", e.target.value)} />
      </div>

      <fieldset className="mt-8">
        <legend className="apply-legend">About you</legend>
        <div className="grid gap-5 md:grid-cols-2 mt-4">
          <div>
            <Label f="name" />
            <input id={id("name")} className="field" autoComplete="name" value={String(v.name)} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} aria-invalid={!!errors.name} aria-describedby={describe("name")} aria-required />
            <Err f="name" />
          </div>
          <div>
            <Label f="email" />
            <input id={id("email")} type="email" inputMode="email" className="field" autoComplete="email" value={String(v.email)} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} aria-invalid={!!errors.email} aria-describedby={describe("email")} aria-required />
            <Err f="email" />
          </div>
          <div>
            <Label f="phone" optional />
            <input id={id("phone")} type="tel" inputMode="tel" className="field" autoComplete="tel" value={String(v.phone)} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <Label f="location" />
            <input id={id("location")} className="field" autoComplete="address-level2" placeholder="e.g. Vancouver, BC" value={String(v.location)} onChange={(e) => set("location", e.target.value)} onBlur={() => blur("location")} aria-invalid={!!errors.location} aria-describedby={describe("location")} aria-required />
            <Err f="location" />
          </div>
          <div className="md:col-span-2">
            <Label f="linkedin" optional />
            <input id={id("linkedin")} type="url" inputMode="url" className="field" placeholder="https://www.linkedin.com/in/your-name" value={String(v.linkedin)} onChange={(e) => set("linkedin", e.target.value)} onBlur={() => blur("linkedin")} aria-invalid={!!errors.linkedin} aria-describedby={describe("linkedin")} />
            <Err f="linkedin" />
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="apply-legend">Your selling</legend>
        <div className="mt-4">
          <p className="apply-label" id={id("experience-label")}>{LABEL.experience}</p>
          <div role="radiogroup" aria-labelledby={id("experience-label")} aria-describedby={describe("experience")} aria-required className="flex flex-wrap gap-2" id={id("experience")} tabIndex={-1}>
            {EXPERIENCE.map((x) => (
              <label key={x} className={`apply-pill ${v.experience === x ? "is-on" : ""}`}>
                <input type="radio" name={id("experience")} value={x} checked={v.experience === x} onChange={() => { set("experience", x); setErrors((e) => ({ ...e, experience: undefined })); }} className="sr-only" />
                {x}
              </label>
            ))}
          </div>
          <Err f="experience" />
        </div>
        <div className="mt-6">
          <Label f="summary" />
          <p id={id("summary-hint")} className="note -mt-1 mb-2">What you sold, who you sold it to, deal sizes, and what you closed. A few sentences is plenty.</p>
          <textarea id={id("summary")} rows={6} maxLength={SUMMARY_MAX} className="field resize-y" value={String(v.summary)} onChange={(e) => set("summary", e.target.value)} onBlur={() => blur("summary")} aria-invalid={!!errors.summary} aria-describedby={describe("summary", true)} aria-required />
          <div className="flex justify-between gap-4">
            <Err f="summary" />
            <span className={`note ml-auto mt-2 tabular ${summaryLen > SUMMARY_MAX - 100 ? "text-human" : ""}`} aria-live="polite">{summaryLen.toLocaleString()} / {SUMMARY_MAX.toLocaleString()}</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-10">
        <legend className="apply-legend">Resume</legend>
        <div
          className={`apply-drop mt-4 ${drag ? "is-drag" : ""} ${file ? "has-file" : ""} ${errors.resume ? "is-bad" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => { e.preventDefault(); setDrag(false); pickFile(e.dataTransfer.files?.[0]); }}
        >
          <input
            ref={fileInput}
            id={id("resume")}
            type="file"
            accept={ACCEPT}
            className="apply-file"
            onChange={(e) => pickFile(e.target.files?.[0])}
            aria-invalid={!!errors.resume}
            aria-describedby={[id("resume-hint"), errors.resume ? id("resume-err") : ""].filter(Boolean).join(" ")}
            aria-required
          />
          {file ? (
            <div className="flex items-center gap-4 w-full">
              <span className="apply-doc" aria-hidden>{/\.pdf$/i.test(file.name) ? "PDF" : "DOC"}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-paper font-medium truncate">{file.name}</span>
                <span className="note">{kb(file.size)}</span>
              </span>
              <button type="button" className="btn btn-ghost !min-h-[44px] relative z-[2]" onClick={() => { set("resume", null); if (fileInput.current) fileInput.current.value = ""; fileInput.current?.focus(); }}>
                Replace
              </button>
            </div>
          ) : (
            <div className="text-center pointer-events-none">
              <span className="apply-upload-ico" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" /></svg>
              </span>
              <p className="text-paper font-medium mt-3"><span className="text-signal-2 underline underline-offset-4">Choose a file</span> or drag it here</p>
            </div>
          )}
        </div>
        <p id={id("resume-hint")} className="note mt-2">PDF or Word, up to 3 MB.</p>
        <Err f="resume" />
      </fieldset>

      <fieldset className="mt-10">
        <legend className="apply-legend">Last thing</legend>
        <div className="mt-4">
          <Label f="source" optional />
          <input id={id("source")} className="field" value={String(v.source)} onChange={(e) => set("source", e.target.value)} />
        </div>
        <label className="apply-check mt-6" htmlFor={id("consent")}>
          <input id={id("consent")} type="checkbox" checked={v.consent === true} onChange={(e) => { set("consent", e.target.checked); if (e.target.checked) setErrors((x) => ({ ...x, consent: undefined })); }} aria-invalid={!!errors.consent} aria-describedby={describe("consent")} aria-required />
          <span className="apply-box" aria-hidden>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 8.5l3 3 6-7" /></svg>
          </span>
          <span className="body-2 text-sm">I agree that Exodus Consulting may store and review my application and resume to assess me for this role.</span>
        </label>
        <Err f="consent" />
      </fieldset>

      {state === "failed" && (
        <div role="alert" className="apply-summary mt-8">
          <p className="text-paper font-semibold">Your application did not send.</p>
          <p className="body-2 text-sm mt-1">{failMsg} Your answers are still here, so you can try again, or email your resume to <a className="link text-paper" href={`mailto:vish@exdsconsulting.com?subject=${encodeURIComponent(`Application: ${roleTitle}`)}`}>vish@exdsconsulting.com</a>.</p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={state === "sending"} aria-busy={state === "sending"}>
          {state === "sending" ? (<><span className="apply-spin" aria-hidden /> Sending application…</>) : `Send application`}
        </button>
        <p className="note">It goes straight to the founders.</p>
      </div>
    </form>
  );
}

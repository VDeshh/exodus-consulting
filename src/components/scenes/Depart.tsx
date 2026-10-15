"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

/**
 * 12 — READY TO DEPART THE OLD WAY?  Final CTA plus SIGNATURE 10, the
 * bottleneck input. The old workflow drifts out of frame as the section
 * scrolls in. Tags are a rough keyword read, labelled as such, not a real
 * classifier. Submission opens a pre-filled email: no form, no queue,
 * matching the live site's policy.
 */

const OLD = ["Email", "Spreadsheet", "Manual report", "Copy / paste", "Someone remembers", "Meeting", "Another spreadsheet", "Rework"];
const NEW = ["Connected data", "Automation", "Software", "AI where it pays", "Visibility", "Human oversight"];

const TAGS: [string, RegExp][] = [
  ["Data", /spreadsheet|excel|csv|export|database|sheet|xls/i],
  ["Reporting", /report|dashboard|kpi|numbers|summary|management/i],
  ["Manual handoff", /email|forward|send|copy|paste|re-?type|enter|manually|combine/i],
  ["Repeat task", /every|weekly|daily|monday|each|again|per week|per day/i],
  ["Waiting", /wait|follow.?up|chase|remind|sits|until/i],
  ["Customer", /customer|guest|client|booking|lead|support|ticket/i],
  ["Revenue", /invoice|payment|revenue|tip|payout|price|quote/i],
];

const PLACEHOLDER = "Every Monday someone exports three spreadsheets, combines them manually and emails a report to management.";

export function Depart() {
  const root = useRef<HTMLElement>(null);
  const [text, setText] = useState("");
  const tracked = useRef(false);
  const tags = useMemo(() => TAGS.filter(([, re]) => re.test(text)).map(([t]) => t), [text]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.to(q(".old-word"), { yPercent: -160, opacity: 0, stagger: 0.05, ease: "none", scrollTrigger: { trigger: root.current, start: "top 80%", end: "top 10%", scrub: 0.6 } });
        gsap.from(q(".new-word"), { yPercent: 120, opacity: 0, stagger: 0.06, ease: "none", scrollTrigger: { trigger: root.current, start: "top 60%", end: "top 5%", scrub: 0.6 } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("What is still manual at our business")}&body=${encodeURIComponent(`${text || PLACEHOLDER}\n\n(Sent from exdsconsulting.com. A founder replies within one business day.)`)}`;

  return (
    <section ref={root} className="relative overflow-hidden border-t hairline" aria-labelledby="depart-h2" id="depart">
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none select-none" aria-hidden>
        <div className="wrap flex flex-wrap gap-x-8 gap-y-2 pt-6 opacity-70">
          {OLD.map((w) => (
            <span key={w} className="old-word mono text-stone/70 line-through decoration-friction/60">{w}</span>
          ))}
        </div>
      </div>
      <div className="wrap section pt-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
          <div>
            <p className="fig"><b>12</b> · Departure</p>
            <h2 id="depart-h2" className="display display-xl text-paper mt-4">Ready to depart the old way?</h2>
            <div className="mt-6 flex flex-wrap gap-2" aria-hidden>
              {NEW.map((w) => (
                <span key={w} className="new-word chip chip-live">{w}</span>
              ))}
            </div>
            <p className="lede mt-8">Thirty minutes, and you leave with the arithmetic either way. Tell us the process that annoys you most. We will map where it leaks, put a number on it, and say plainly whether it is worth building. Two founders on the call.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start" onClick={() => track("call_booked", { from: "depart" })}>
                Book a 30-minute call
              </a>
              <a href={`mailto:${site.email}`} className="btn btn-ghost" onClick={() => track("email_clicked", { from: "depart" })}>
                {site.email}
              </a>
            </div>
            <p className="mono text-stone mt-5">Free first conversation. No commitment. You keep the map.</p>
          </div>

          <form
            className="glass p-5 md:p-6"
            onSubmit={(e) => { e.preventDefault(); track("bottleneck_submitted", { tags: tags.join(","), length: text.length }); window.location.href = mailto; }}
            data-cursor="start"
          >
            <label htmlFor="bottleneck" className="display display-sm text-paper block">What is your team still doing manually?</label>
            <p className="text-sm text-stone mt-2">One process, not a list. Rough is fine. We tighten the numbers together on the call.</p>
            <textarea
              id="bottleneck"
              name="bottleneck"
              rows={5}
              className="field mt-4 resize-y"
              placeholder={PLACEHOLDER}
              value={text}
              onChange={(e) => { setText(e.target.value); if (e.target.value.length >= 12 && !tracked.current) { tracked.current = true; track("bottleneck_input"); } }}
            />
            <div className="mt-3 min-h-[2rem] flex flex-wrap items-center gap-2" aria-live="polite">
              {tags.length ? (
                <>
                  <span className="fig">Rough read, not a classification ·</span>
                  {tags.map((t) => (
                    <span key={t} className="chip text-signal-2 border-signal/40">{t}</span>
                  ))}
                </>
              ) : (
                <span className="fig">Tags appear as you type. Nothing is sent until you choose to.</span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="submit" className="btn btn-signal max-sm:w-full">Show us the workflow</button>
              <span className="text-xs text-stone">Opens a draft email to {site.email} with your text in it. No form, no queue. A founder replies within one business day.</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

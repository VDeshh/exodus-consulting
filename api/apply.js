/**
 * POST /api/apply — careers applications, emailed to the founders.
 *
 * The site is a static export, so this is a standalone Vercel Node function
 * that Vercel serves beside the static output. It validates everything again
 * here (the browser is never trusted), checks the resume by its magic bytes
 * rather than its extension, and sends one email through Resend with the
 * resume attached and Reply-To set to the applicant.
 *
 * Env:
 *   RESEND_API_KEY        required
 *   APPLY_TO              default vish@exdsconsulting.com
 *   APPLY_FROM            default "Exodus Careers <careers@exdsconsulting.com>"
 *   APPLY_FROM_FALLBACK   default "Exodus Careers <careers@fennecapp.com>"
 * Senders are tried in order, because exdsconsulting.com may still be
 * pending verification at Resend while fennecapp.com is verified.
 */

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const ROLES = { "sales-executive": "Sales Executive" };
const ALLOWED_ORIGIN = /^https:\/\/((www\.)?exdsconsulting\.com|[a-z0-9-]+\.vercel\.app)$|^http:\/\/localhost:\d+$/;

const LIMITS = { name: 120, email: 200, phone: 40, location: 120, linkedin: 300, experience: 40, summary: 4000, source: 200 };

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Identify the resume from its first bytes: PDF, DOCX (zip), or legacy DOC (OLE). */
function sniff(buf) {
  if (buf.length > 4 && buf.subarray(0, 4).toString("latin1") === "%PDF") return { ext: "pdf", type: "application/pdf" };
  if (buf.length > 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04)
    return { ext: "docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" };
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])))
    return { ext: "doc", type: "application/msword" };
  return null;
}

function emailHtml(f, roleTitle) {
  const row = (k, v) =>
    v ? `<tr><td style="padding:8px 12px;border:1px solid #CCCCDD;background:#F4F5F7;font-weight:bold;width:34%;color:#1C1C2E">${esc(k)}</td><td style="padding:8px 12px;border:1px solid #CCCCDD;color:#1C1C2E">${v}</td></tr>` : "";
  const link = (u) => `<a href="${esc(u)}" style="color:#3B6FE8">${esc(u)}</a>`;
  return `<!doctype html><html><body style="margin:0;background:#f4f5f7;font-family:Calibri,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff">
<tr><td style="background:#0D1B3E;padding:20px 24px;color:#fff">
  <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9fb7ff">New application</div>
  <div style="font-size:22px;font-weight:bold;margin-top:4px">${esc(roleTitle)}</div>
</td></tr>
<tr><td style="height:3px;background:#3B6FE8"></td></tr>
<tr><td style="padding:22px 24px">
  <p style="margin:0 0 14px;font-size:15px;color:#1C1C2E"><b>${esc(f.name)}</b> applied through exdsconsulting.com/careers. Reply to this email to reach them directly.</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
    ${row("Email", `<a href="mailto:${esc(f.email)}" style="color:#3B6FE8">${esc(f.email)}</a>`)}
    ${row("Phone", esc(f.phone))}
    ${row("Location", esc(f.location))}
    ${row("LinkedIn", f.linkedin ? link(f.linkedin) : "")}
    ${row("B2B sales experience", esc(f.experience))}
    ${row("Heard about us", esc(f.source))}
  </table>
  <div style="margin-top:18px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#3B6FE8;font-weight:bold">B2B closing experience</div>
  <div style="margin-top:6px;padding:14px 16px;border-left:3px solid #3B6FE8;background:#f2f5fd;font-size:14px;line-height:1.55;color:#1C1C2E;white-space:pre-wrap">${esc(f.summary)}</div>
  <p style="margin:16px 0 0;font-size:13px;color:#5d6275">Resume attached: ${esc(f.fileName)}</p>
</td></tr>
<tr><td style="background:#0D1B3E;padding:12px;text-align:center;color:#fff;font-size:12px">Exodus Consulting &middot; Careers</td></tr>
</table></td></tr></table></body></html>`;
}

function emailText(f, roleTitle) {
  const line = (k, v) => (v ? `${k}: ${v}` : null);
  return [
    `New application: ${roleTitle}`,
    "",
    line("Name", f.name),
    line("Email", f.email),
    line("Phone", f.phone),
    line("Location", f.location),
    line("LinkedIn", f.linkedin),
    line("B2B sales experience", f.experience),
    line("Heard about us", f.source),
    "",
    "B2B closing experience:",
    f.summary,
    "",
    `Resume attached: ${f.fileName}`,
  ].filter((l) => l !== null).join("\n");
}

async function send(payload, from) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, from }),
  });
  const body = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, body };
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGIN.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });
  if (origin && !ALLOWED_ORIGIN.test(origin)) return res.status(403).json({ ok: false, error: "Forbidden" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Spam traps: a hidden field people never fill, and a form submitted faster
  // than a person could. Bots get a success response so they learn nothing.
  if (b.website || (Number(b.elapsed) > 0 && Number(b.elapsed) < 3000)) return res.status(200).json({ ok: true });

  const f = {};
  for (const [k, max] of Object.entries(LIMITS)) f[k] = clean(b[k], max);
  const role = ROLES[b.role] ? b.role : null;

  const errors = {};
  if (!role) errors.role = "Unknown role.";
  if (f.name.length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) errors.email = "Enter a valid email address.";
  if (f.location.length < 2) errors.location = "Enter where you are based.";
  if (!f.experience) errors.experience = "Choose your years of B2B sales experience.";
  if (f.summary.length < 40) errors.summary = "Tell us a little more about your B2B closing experience.";
  if (f.linkedin && !/^https?:\/\/[^\s]+$/i.test(f.linkedin)) errors.linkedin = "Enter a full link, starting with https://";
  if (b.consent !== true) errors.consent = "Please confirm we can use your application to assess it.";

  let file = null;
  if (typeof b.resume !== "string" || !b.resume) errors.resume = "Attach your resume.";
  else {
    const buf = Buffer.from(b.resume, "base64");
    const kind = sniff(buf);
    if (buf.length > MAX_FILE_BYTES) errors.resume = "Your resume must be 3 MB or smaller.";
    else if (!kind) errors.resume = "Upload a PDF or Word document.";
    else {
      const base = clean(b.resumeName, 120).replace(/\.[a-z0-9]+$/i, "").replace(/[^\w.\- ]+/g, "").trim() || "resume";
      file = { name: `${base}.${kind.ext}`, b64: buf.toString("base64") };
      f.fileName = file.name;
    }
  }

  if (Object.keys(errors).length) return res.status(422).json({ ok: false, errors });
  if (!process.env.RESEND_API_KEY) {
    console.error("apply: RESEND_API_KEY is not set");
    return res.status(503).json({ ok: false, error: "Applications are temporarily unavailable." });
  }

  const roleTitle = ROLES[role];
  const payload = {
    to: [process.env.APPLY_TO || "vish@exdsconsulting.com"],
    reply_to: f.email,
    subject: `Application: ${roleTitle} — ${f.name}`,
    html: emailHtml(f, roleTitle),
    text: emailText(f, roleTitle),
    attachments: [{ filename: file.name, content: file.b64 }],
  };
  const senders = [
    process.env.APPLY_FROM || "Exodus Careers <careers@exdsconsulting.com>",
    process.env.APPLY_FROM_FALLBACK || "Exodus Careers <careers@fennecapp.com>",
  ];

  let last;
  for (const from of senders) {
    last = await send(payload, from);
    if (last.ok) return res.status(200).json({ ok: true });
    console.error("apply: send failed", from, last.status, JSON.stringify(last.body).slice(0, 300));
  }
  return res.status(502).json({ ok: false, error: "We could not send your application." });
};

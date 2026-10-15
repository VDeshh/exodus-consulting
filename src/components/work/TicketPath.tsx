/**
 * The Uniserve ticket path, as described on the live services page.
 * Inbound → Machine (classified, routed, summarised) → Draft (held) → Gate (technician approves, then it sends).
 */
const STEPS = [
  ["Inbound", "Request lands in the support queue", "signal"],
  ["Machine", "Classified, routed and summarised", "signal"],
  ["Draft", "Suggested reply, held", "signal"],
  ["Gate", "Technician approves, then it sends", "human"],
] as const;

export function TicketPath() {
  return (
    <figure className="glass p-5 md:p-6" data-cursor="inspect">
      <p className="fig"><b>Interface diagram</b> · ticket path · not a screenshot</p>
      <ol className="mt-5 grid gap-3 sm:grid-cols-4">
        {STEPS.map(([h, t, tone], i) => (
          <li key={h} className={`relative p-4 rounded-md border ${tone === "human" ? "border-human/50 bg-human/5" : "border-signal/30 bg-signal/5"}`}>
            <p className={`mono ${tone === "human" ? "text-human" : "text-signal-2"}`}>{String(i + 1).padStart(2, "0")} · {h}</p>
            <p className="text-sm text-silver mt-2 leading-5">{t}</p>
            {i < STEPS.length - 1 && <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 mono text-stone" aria-hidden>→</span>}
          </li>
        ))}
      </ol>
      <figcaption className="fig mt-4">The gate is the point: the draft sits until a technician reads it. Nothing irreversible leaves without a person.</figcaption>
    </figure>
  );
}

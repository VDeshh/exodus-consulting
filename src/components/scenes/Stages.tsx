import Link from "next/link";
import { capabilities, STATUS_LABEL } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 05 — THE BUILD. Three stages of one transformation, not three cards.
 * SEE (the audit) → BUILD (five capabilities) → ADVANCE (intelligence, measured).
 * Every capability carries its real status from the live services page.
 */
const STAGES = [
  { key: "see", n: "01", name: "See", line: "Understand how the business actually runs.", text: "Every engagement starts with the free operations audit. We sit with the team that does the work, map where the hours go, and score the candidates on return and feasibility. Nothing gets built before the arithmetic is on the page." },
  { key: "build", n: "02", name: "Build", line: "Software, automation and assistants around the real workflow.", text: "The two or three things that move the signed number, not a platform. Sometimes that is an AI assistant. Sometimes it is a POS integration. Sometimes it is the operating system the business should have had." },
  { key: "advance", n: "03", name: "Advance", line: "Measure what changed. Keep improving.", text: "The clock starts at deployment. Once the data is clean and the process is real, agents and copilots are worth building, because an agent cannot tell you what is leaking if the numbers sit in five accounts that never speak." },
] as const;

export function Stages() {
  return (
    <section className="section border-t hairline" aria-labelledby="stages-h2">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="fig" data-reveal><b>05</b> · The build</p>
          <h2 id="stages-h2" className="display display-lg text-paper mt-4" data-reveal>
            AI is not the product. The better way of working is.
          </h2>
          <p className="lede mt-6" data-reveal>
            We do not force AI into every problem. Some businesses need better software, a workflow, an integration, an assistant, or a whole operating system. The technology follows the operational problem, not the other way round.
          </p>
        </Reveal>

        <ol className="mt-16 relative">
          <div className="absolute left-[1.15rem] lg:left-0 lg:right-0 lg:top-[1.15rem] top-0 bottom-0 lg:bottom-auto w-px lg:w-auto lg:h-px bg-gradient-to-b lg:bg-gradient-to-r from-signal via-signal-2 to-advance opacity-60" aria-hidden />
          <div className="grid gap-10 lg:grid-cols-3">
            {STAGES.map((s) => {
              const caps = capabilities.filter((c) => c.stage === s.key);
              return (
                <Reveal as="li" key={s.key} className="relative pl-12 lg:pl-0 lg:pt-12">
                  <span className={`absolute left-0 top-0 lg:left-0 w-9 h-9 rounded-full grid place-items-center mono ${s.key === "advance" ? "bg-advance text-bg-0" : "bg-signal text-white"}`} data-reveal>
                    {s.n}
                  </span>
                  <h3 className="display display-md text-paper" data-reveal>{s.name}</h3>
                  <p className="mt-2 text-paper font-medium" data-reveal>{s.line}</p>
                  <p className="mt-3 body-2 text-[0.98rem]" data-reveal>{s.text}</p>
                  {s.key === "see" && (
                    <div className="mt-6 glass p-4" data-reveal>
                      <p className="fig"><b>Free</b> · 30 minutes · a founder answers</p>
                      <p className="mt-2 text-sm text-silver">You leave with the leak map and the arithmetic, whether or not you hire us.</p>
                    </div>
                  )}
                  {caps.length > 0 && (
                    <ul className="mt-6 space-y-3 snap-row">
                      {caps.map((c) => (
                        <li key={c.n} className="glass p-4" data-reveal data-cursor="explore">
                          <div className="flex flex-col gap-2">
                            <p className="text-paper font-medium"><span className="mono text-stone mr-2">{c.n}</span>{c.name}</p>
                            <span className="flex flex-wrap gap-1">
                              {c.status.map((st) => (
                                <span key={st} className={`chip chip-${st}`}>{STATUS_LABEL[st]}</span>
                              ))}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-silver">{c.what}</p>
                          <p className="fig mt-3">Running for · {c.runningFor}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.key === "advance" && (
                    <div className="mt-6 flat p-4" data-reveal>
                      <p className="fig"><b>Measured</b> · against the signed page</p>
                      <p className="mt-2 text-sm text-silver">Same method, same process, arithmetic printed. If the bar has not cleared, we keep working at no additional cost until it does.</p>
                      <Link href="/how-we-work/" className="link text-sm mt-2 inline-flex items-center min-h-[44px]">How we charge</Link>
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </ol>
      </div>
    </section>
  );
}

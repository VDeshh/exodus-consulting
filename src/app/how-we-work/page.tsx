import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Process } from "@/components/scenes/Process";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/facts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we work and charge: free operations audit, signed baseline, clock starts at deployment",
  description: "Talk, map, sign, build, measure. The bar is agreed in writing before anything is built. If the system misses it we keep working at no additional cost. Cancel any time. You own the code.",
};

import { ProcessRail } from "@/components/work/ProcessRail";

const CALL = [
  ["The workflow, out loud", "You describe the process that hurts most, step by step. Who touches it, how often, how long each pass takes and where it stalls waiting on one person."],
  ["The arithmetic, in front of you", "Hours a week against a loaded hourly rate, worked out on the call rather than modelled later. If the number turns out to be small, we say the number is small."],
  ["What is worth building, and what is not", "We name the one or two places software or an AI agent pays for itself, and the places it does not. Some workflows cost less left exactly as they are."],
  ["The map goes with you", "Hire us, hire someone else, or build it in house. The leak map and the working behind it are written down either way."],
];

const FAQ = [
  ["What happens in the free audit?", "We map where time and money leak, then show the arithmetic. You keep the map whether or not you hire us. Nothing is built at this stage and nothing is charged for it."],
  ["Who owns the code?", "You do. It is written into the agreement before anything is built."],
  ["What are you measured against, and when does the clock start?", "We agree the baseline in writing before anything is built, and you sign off on the exact numbers we are measured against. The clock starts at deployment, not at signature. If the system misses the agreed bar, we keep working at no additional cost until it clears. You can cancel at any time. The bar and the timeframe are agreed per engagement. Nothing guarantees a particular dollar amount."],
  ["Can you work inside our data rules?", "Constraints come first, because they decide the architecture. Uniserve required every model and every byte hosted in Canada, so that requirement shaped the build before a line of it was written."],
  ["Are we too small for this?", "Owner-led is the whole point. Our clients run from a multi-venue restaurant group to a Canadian internet and telecom provider. What they share is an owner who can make a decision in one meeting."],
];

export default function HowWeWork() {
  return (
    <>
      <PageHero
        eyebrow={<><b>How we work and charge</b> · free audit · signed baseline · you own the code</>}
        title="The bar is signed before a line of code exists, and we work until it clears."
        lede="Most AI spending fails. We priced for that. The scope is narrow, the order is measure then build, and we carry the risk until the number moves."
      >
        <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book the audit call</a>
        <span className="mono text-stone">30 minutes · free · Shiv or Vishal answers</span>
      </PageHero>

      <section className="section-tight" aria-labelledby="why-h2">
        <div className="wrap">
          <Reveal className="grid gap-6 md:grid-cols-3">
            {[stats[1], stats[2], stats[3]].map((s) => (
              <div key={s.source} className="border-l hairline pl-5" data-reveal>
                <p className="display display-md tabular text-paper">{s.value}</p>
                <p className="text-sm text-silver mt-2">{s.text}</p>
                <p className="fig mt-2">{s.source}</p>
              </div>
            ))}
          </Reveal>
          <Reveal className="mt-10 max-w-3xl">
            <h2 id="why-h2" className="display display-md text-paper" data-reveal>Read those three numbers together and the failure is not the technology.</h2>
            <p className="body-2 mt-4" data-reveal>It is scope set too wide to measure and adoption nobody paid for. Carrying the risk changes how we work: if we are on the hook to keep working until the number moves, we cannot afford a twelve-month platform with a vague benefit. So we scope narrowly, pick the two or three problems with the clearest arithmetic, and measure them the same way before and after.</p>
          </Reveal>
        </div>
      </section>

      <Process />

      <section className="section border-t hairline" aria-labelledby="call-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>The call</b> · what happens in the 30 minutes</p>
            <h2 id="call-h2" className="display display-lg text-paper mt-4" data-reveal>No demo. No slide deck. No requirements questionnaire.</h2>
            <p className="lede mt-6" data-reveal>One workflow, then the numbers behind it. Bring the process that hurts most, roughly what it costs today, and whoever else has to say yes.</p>
          </Reveal>
          <Reveal>
            <ProcessRail steps={CALL as [string, string][]} />
          </Reveal>
        </div>
      </section>

      <section className="section border-t hairline" aria-labelledby="faq-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>Before you sign</b></p>
            <h2 id="faq-h2" className="display display-lg text-paper mt-4" data-reveal>The five questions owners ask us first.</h2>
            <p className="body-2 mt-4" data-reveal>The answers are the same ones we give on the call.</p>
          </Reveal>
          <Reveal as="ul" className="border-t hairline" stagger={0.06}>
            {FAQ.map(([q, a]) => (
              <li key={q} data-reveal>
                <details className="group border-b hairline">
                  <summary className="cursor-pointer list-none py-5 flex items-start justify-between gap-4 min-h-[48px]">
                    <span className="text-paper font-medium">{q}</span>
                    <span className="mono text-stone group-open:rotate-45 transition-transform" aria-hidden>+</span>
                  </summary>
                  <p className="text-sm text-silver pb-5 max-w-2xl">{a}</p>
                </details>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

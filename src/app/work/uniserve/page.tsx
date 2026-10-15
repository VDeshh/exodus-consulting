import type { Metadata } from "next";
import { CaseHeader, CaseSections, CaseSource } from "@/components/work/CaseStudy";
import { TicketPath } from "@/components/work/TicketPath";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/content/facts";
import { demosFor } from "@/content/demos";
import { VideoDemo } from "@/components/work/VideoDemo";

export const metadata: Metadata = {
  title: "Uniserve Communications: AI enablement for a Canadian ISP, in build",
  description: "A three-month AI enablement engagement against repeat residential support questions. A customer-facing chatbot and voice agent, all data and models hosted in Canada. Projection, not a booked result: roughly 1 hour of a technician's day back.",
};

const ROWS = [
  ["Technician time given back", "about 1 hour per day"],
  ["Working days a year", "about 250"],
  ["Hourly cost", "about $40"],
  ["Per technician per year", "1 hr/day × ~250 days × $40 = about $10,000"],
  ["Five technicians", "about $50,000 (illustrative multiple)"],
  ["Ten technicians", "about $100,000 (illustrative multiple)"],
];

export default function UniservePage() {
  return (
    <>
      <CaseHeader slug="uniserve" kicker="Case study 01 · Uniserve" />
      <CaseSections slug="uniserve" to={4} />

      <section className="section-tight border-t hairline">
        <Reveal className="wrap grid gap-6 md:grid-cols-2">
          {[stats[1], stats[3]].map((s) => (
            <div key={s.source} className="border-l hairline pl-5" data-reveal>
              <p className="display display-md tabular text-paper">{s.value}</p>
              <p className="text-sm text-silver mt-2">{s.text}</p>
              <p className="fig mt-2">{s.source}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <CaseSections slug="uniserve" from={4} to={7} />

      <section className="section-tight border-t hairline">
        <Reveal className="wrap">
          <div data-reveal><TicketPath /></div>
        </Reveal>
      </section>

      <CaseSections slug="uniserve" from={7} to={8} />

      {demosFor("uniserve").length > 0 && (
      <section className="section border-t hairline" aria-labelledby="demos-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Product demos</b> · films of software we built</p>
            <h2 id="demos-h2" className="display display-md lg:display-lg text-paper mt-4" data-reveal>The assistant answers the customer. This one reads the operation.</h2>
            <p className="lede mt-6" data-reveal>
              A technical operation runs its projects through channels, threads, emails and tickets. The status is in there, spread across all of it, and somebody has to go and assemble it. pm-scan reads what is already there and prints what is urgent. Built for Uniserve and for the managed service providers with the same problem.
            </p>
          </Reveal>
          <Reveal className="mt-10 grid gap-5" stagger={0.1}>
            {demosFor("uniserve").map((d) => (
              <div key={d.slug} data-reveal><VideoDemo demo={d} /></div>
            ))}
          </Reveal>
        </div>
      </section>
      )}

      <section className="section-tight border-t hairline" aria-labelledby="proj-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>Fig. 01</b> · Projection arithmetic · <span className="chip chip-projection !py-0.5">Projection</span></p>
            <h2 id="proj-h2" className="display display-md text-paper mt-4" data-reveal>Not a booked result.</h2>
            <p className="body-2 mt-4" data-reveal>One technician is the unit. Scales with team size. The five and ten technician rows are illustrative multiples; Uniserve&apos;s team size is not published here.</p>
          </Reveal>
          <Reveal>
            <table className="w-full text-sm" data-reveal>
              <thead><tr className="fig text-left"><th className="py-2 font-medium">Line</th><th className="py-2 font-medium text-right">Value</th></tr></thead>
              <tbody>
                {ROWS.map(([k, v]) => (
                  <tr key={k} className="border-t hairline"><td className="py-3 text-silver">{k}</td><td className="py-3 tabular text-paper text-right">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <CaseSections slug="uniserve" from={8} />
      <CaseSource slug="uniserve" />
      <CtaBand title="A support queue is the same handful of questions." text="If your team answers the same question forty times a week, that is the workflow to bring to the call." />
    </>
  );
}

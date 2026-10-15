import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { industries } from "@/content/facts";

/** Spelt out so the two headings can never contradict the lists beneath them. */
const WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const word = (n: number) => WORDS[n] ?? String(n);
const Word = ({ n }: { n: number }) => <>{word(n).charAt(0).toUpperCase() + word(n).slice(1)}</>;

export const metadata: Metadata = {
  title: `Industries: ${industries.total} sectors, one method`,
  description: `Learn the operation first, find the one workflow worth fixing, agree the number in writing, then ship software the team actually uses. ${word(industries.built.length).charAt(0).toUpperCase() + word(industries.built.length).slice(1)} sectors where our own engagements sit, including dental clinics, car dealerships and MSPs, and ${word(industries.applies.length)} where the same build applies.`,
};

const BUILT_LINK: Record<string, string> = {
  "Nightlife and hospitality": "/work/fennec/",
  "Restaurants and bars": "/work/current/#b-side-group",
  "Event venues and ticketing": "/work/fennec/",
  "Telecom and internet providers": "/work/uniserve/",
  "Political campaigns": "/work/current/#political-campaign",
  "Tour and experience operators": "/work/palapa-tours/",
  "Dental clinics": "/what-we-do/patient-recall/",
  "Car dealerships": "/what-we-do/dealership-os/",
  "MSPs and IT service providers": "/what-we-do/client-health-dashboard/",
};


const PROBLEMS = ["Repetitive admin", "Fragmented data", "Slow customer workflows", "Poor visibility", "Internal tool gaps", "Legacy systems", "Reporting burden", "Revenue leakage", "Disconnected platforms"];

export default function Industries() {
  return (
    <>
      <PageHero
        eyebrow={<><b>Industries</b> · {industries.total} sectors · {industries.built.length} with our own engagements</>}
        title={`${industries.total} industries. One method.`}
        lede="The way we build does not change: learn the operation first, find the one workflow worth fixing, agree the number in writing, then ship software the team actually uses. What changes per industry is the systems of record, the rules, and the failure that costs the most."
      />

      <section className="section-tight">
        <Reveal className="wrap">
          <p className="fig" data-reveal><b>Industry agnostic.</b> Problem specific.</p>
          <p className="display display-md text-paper mt-3 max-w-3xl" data-reveal>The commonality is not the sector. It is operational friction.</p>
          <ul className="mt-6 flex flex-wrap gap-2" data-reveal>
            {PROBLEMS.map((p) => <li key={p} className="chip">{p}</li>)}
          </ul>
        </Reveal>
      </section>

      <section className="section border-t hairline" aria-labelledby="built-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>Where we have built</b></p>
            <h2 id="built-h2" className="display display-lg text-paper mt-4" data-reveal><Word n={industries.built.length} /> sectors our own engagements sit in.</h2>
            <p className="body-2 mt-4" data-reveal>Each links to the work, or to the tool built for that sector.</p>
          </Reveal>
          <Reveal as="ol" className="grid gap-3 sm:grid-cols-2" stagger={0.06}>
            {industries.built.map((name, i) => (
              <li key={name} data-reveal>
                <Link href={BUILT_LINK[name] ?? "/work/"} className="glass p-5 block h-full hover:border-signal/40 transition-colors" data-cursor="view">
                  <p className="mono text-signal-2">{String(i + 1).padStart(2, "0")}</p>
                  <p className="text-paper font-medium mt-2">{name}</p>
                  <p className="fig mt-3">{(BUILT_LINK[name] ?? "/work/").startsWith("/what-we-do/") ? "See the tool →" : "See the work →"}</p>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section border-t hairline" aria-labelledby="applies-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>Where the same build applies</b></p>
            <h2 id="applies-h2" className="display display-lg text-paper mt-4" data-reveal><Word n={industries.applies.length} /> more, with a different set of systems, rules and failure modes.</h2>
            <p className="body-2 mt-4" data-reveal>We have not built in these yet, and we say so. The audit works the same way.</p>
          </Reveal>
          <Reveal as="ol" className="grid gap-2 sm:grid-cols-2" stagger={0.03}>
            {industries.applies.map((name, i) => (
              <li key={name} className="flat px-4 py-3 text-sm text-silver flex items-center gap-3" data-reveal>
                <span className="mono text-stone">{String(i + industries.built.length + 1).padStart(2, "0")}</span>{name}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

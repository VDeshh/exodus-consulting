import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { engagements, STATUS_LABEL } from "@/content/facts";

export const metadata: Metadata = {
  title: "Current engagements: a political campaign (live) and B-Side Group (in build)",
  description: "The two current engagements outside the flagship studies, each at its real status. A municipal political campaign: record reconciliation with confidence scoring. B-Side Group: inventory software across three restaurant venues, in build.",
};

export default function CurrentPage() {
  const list = engagements.filter((e) => ["political-campaign", "b-side-group"].includes(e.slug));
  return (
    <>
      <PageHero
        eyebrow={<><b>Work</b> · current engagements · one live · one in build</>}
        title="A build in progress is not a launch, and we will not write it as one."
        lede="Fennec and Uniserve are the flagship studies, and Palapa Tours has its own shipped study. These two are the rest of what is on the bench right now. Neither has a product surface of ours worth capturing yet, so there are no screenshots here. Every shot on this site is a real capture of a live product."
      />
      {list.map((e, i) => (
        <section key={e.slug} id={e.slug} className="section border-t hairline" aria-labelledby={`${e.slug}-h2`}>
          <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <p className="fig" data-reveal><b>Engagement 0{i + 1}</b> · {e.sector} · <span className={`chip chip-${e.status} !py-0.5`}>{STATUS_LABEL[e.status]}</span></p>
              <h2 id={`${e.slug}-h2`} className="display display-lg text-paper mt-4" data-reveal>{e.client}</h2>
              <p className="lede mt-6" data-reveal>{e.short}</p>
            </Reveal>
            <Reveal className="space-y-8">
              {[["The old way", e.problem], ["What we are building", e.built], ["Human role", e.human]].map(([h, t]) => (
                <div key={h} data-reveal>
                  <p className="fig">{h}</p>
                  <p className="body-2 mt-2 max-w-2xl">{t}</p>
                </div>
              ))}
              <div className="glass p-5" data-reveal>
                <p className="fig"><b>Results</b></p>
                <p className="text-paper font-medium mt-2">{e.outcomes[0].metric}</p>
                <p className="text-sm text-silver mt-1">{e.outcomes[0].detail}</p>
                <p className="fig mt-3">Source · {e.outcomes[0].source}</p>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
      <CtaBand />
    </>
  );
}

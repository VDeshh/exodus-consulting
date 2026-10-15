import type { Metadata } from "next";
import { CaseHeader, CaseSections, CaseSource } from "@/components/work/CaseStudy";
import { FennecOS } from "@/components/scenes/FennecOS";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { fennecVenues } from "@/content/facts";
import { ToolVideo } from "@/components/work/ToolVideo";
import { ScreenFrame } from "@/components/work/ScreenFrame";
import { toolBySlug } from "@/content/tools";

export const metadata: Metadata = {
  title: "Fennec: the venue operating system, live tonight",
  description: "A full operating system for premium nightlife and event venues, live at Harbour Event Centre, TradeX, The Pit UBC, The Show Ottawa and Twins Nightclub, with 20+ event companies on the network. Floor plans, ticketing, guest CRM, POS sync and the Ferry AI agent network.",
};

const SHOTS = [
  ["/tools/13-fennec.webp", "The operator dashboard with Ferry open beside it: door count, tables, bar sales and pace, read off the same records the floor is writing. Captured on a demo venue, so every figure on it is sample data."],
  ["/work/table-select.webp", "Guest-facing table selection over a photograph of the real room. Tables carry seat counts; the legend shows available, requested, booked, unavailable and selected. Guest details blurred at source."],
  ["/work/floorplan-editor.webp", "Operator floor plan editor. Every table carries a label, section, capacity, fee, shape, VIP flag and its own QR code. Activating a layout publishes the map the guest picks from, which is why the two screens can never disagree."],
];

const fennecClip = toolBySlug("fennec");

export default function FennecPage() {
  return (
    <>
      <CaseHeader slug="fennec" kicker="Case study 02 · Fennec" />
      <CaseSections slug="fennec" to={4} />
      <FennecOS />
      <CaseSections slug="fennec" from={4} to={5} />

      <section className="section border-t hairline" aria-labelledby="shots-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Real screens</b> · from the live product · guest details blurred at source</p>
            <h2 id="shots-h2" className="display display-lg text-paper mt-4" data-reveal>Every shot here is a real capture of a live product.</h2>
          </Reveal>
          <Reveal as="ul" className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.08}>
            {SHOTS.map(([src, cap], i) => (
              <li key={src} className={i === 0 ? "md:col-span-2" : ""} data-reveal>
                <ScreenFrame
                  src={src}
                  alt={cap}
                  caption={`Fig. ${String(i + 1).padStart(2, "0")} · ${cap}`}
                  label="Fennec · live product"
                  aspect={i === 0 ? "16/8" : "16/10"}
                />
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CaseSections slug="fennec" from={5} />

      <section className="section-tight border-t hairline">
        <Reveal className="wrap">
          <p className="fig" data-reveal><b>The network</b> · live venues running on Fennec tonight</p>
          <ul className="mt-4 flex flex-wrap gap-2" data-reveal>
            {fennecVenues.map((v) => <li key={v} className="chip chip-live"><span className="dot dot-live" />{v}</li>)}
            <li className="chip">20+ event companies</li>
          </ul>
        </Reveal>
      </section>


      <section id="demo" className="section border-t hairline" aria-labelledby="fdemo-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Demo</b> · {fennecClip?.videos[0].seconds}s · no sound</p>
            <h2 id="fdemo-h2" className="display display-lg text-paper mt-4" data-reveal>A short pass through the product.</h2>
            <p className="lede mt-6" data-reveal>Screen capture of the live product. Figures shown inside the recording belong to a demo venue and are not claimed as results.</p>
          </Reveal>
          {fennecClip?.videos[0] && (
            <div className="mt-10" data-reveal>
              <ToolVideo media={fennecClip.videos[0]} slug="fennec" />
            </div>
          )}
        </div>
      </section>

      <CaseSource slug="fennec" />
      <CtaBand title="Your business does not need five tools either." text="Tell us the workflow that runs through a group chat at 11pm. We map where it leaks and say plainly whether it is worth building." />
    </>
  );
}

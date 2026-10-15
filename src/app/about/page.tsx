import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Founders } from "@/components/scenes/Founders";
import { ExodusPortal } from "@/components/scenes/ExodusPortal";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { proof, site } from "@/lib/about-facts";

export const metadata: Metadata = {
  title: "About: two founders, no account managers",
  description: "Exodus: a movement of people leaving one place to begin something new. We named the company after the moment a business decides to stop running the old way, then we build the thing it runs on next. Shiv Lohia and Vishal Desh, Vancouver.",
};

const SECTORS = [
  { name: "Hospitality, nightlife and events", status: "Live · Shipped · In build", text: "Fennec runs at Harbour Event Centre, TradeX, The Pit UBC and The Show Ottawa, plus more than 20 event companies. Palapa Tours' tip-out software is shipped. B-Side Group's inventory software is in build across three restaurant venues.", href: "/work/fennec/" },
  { name: "Telecom and internet", status: "In build", text: "Uniserve Communications Corporation is a Canadian internet and telecom provider. A customer-facing chatbot and voice agent for residential support, with every model and byte hosted in Canada.", href: "/work/uniserve/" },
  { name: "Political campaigns", status: "Live", text: "A municipal political campaign in Vancouver. Record parsing and reconciliation with a confidence score on every match, plus targeted campaign support. The campaign is not named and no electoral outcome is claimed.", href: "/work/current/" },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow={<><b>exodus</b> · noun · /ˈeksədəs/</>}
        title={<>A departure. A movement from one place toward another.</>}
        lede="We named the company after the moment a business decides to stop running the old way. Then we build the thing it runs on next."
      >
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full border-t hairline pt-6">
          {[["Founders", String(proof.founders)], ["Account managers", String(proof.accountManagers)], ["Where", site.where], ["Base", site.base]].map(([k, v]) => (
            <div key={k}><dt className="fig">{k}</dt><dd className="text-paper mt-1">{v}</dd></div>
          ))}
        </dl>
      </PageHero>

      <ExodusPortal />

      <Founders />

      <section className="section border-t hairline" aria-labelledby="where-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Where we work</b> · owner-led clients across three sectors</p>
            <h2 id="where-h2" className="display display-lg text-paper mt-4" data-reveal>The method does not change when the sector does.</h2>
            <p className="lede mt-6" data-reveal>Every status below is stated plainly: live, shipped or still in build.</p>
          </Reveal>
          <Reveal as="ul" className="mt-12 grid gap-5 lg:grid-cols-3 snap-row snap-wide snap-bleed" stagger={0.1}>
            {SECTORS.map((s) => (
              <li key={s.name} data-reveal>
                <Link href={s.href} className="glass p-6 block h-full hover:border-signal/40 transition-colors" data-cursor="view">
                  <p className="fig">{s.status}</p>
                  <p className="display display-sm text-paper mt-3">{s.name}</p>
                  <p className="text-sm text-silver mt-3">{s.text}</p>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

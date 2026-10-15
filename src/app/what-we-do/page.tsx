import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Stages } from "@/components/scenes/Stages";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { TicketPath } from "@/components/work/TicketPath";
import Link from "next/link";
import { toolPages, TOOL_TONE_CLASS } from "@/content/tools";

export const metadata: Metadata = {
  title: "What we do: AI enablement, custom software and operational intelligence",
  description: "Thirteen tools we have built, each at its real status: call automation, voice agents, an AI receptionist, patient recall, an AI project manager, a client health dashboard, a support chatbot, penetration testing, Dealership OS, tip-out, multi-venue inventory and Fennec.",
};

const BELONGS: { workflow: string; verdict: "Software" | "AI" | "Automation + control" | "Human"; why: string }[] = [
  { workflow: "Splitting a gratuity pool by role after a shift", verdict: "Software", why: "Deterministic arithmetic that must come out the same every night. Fixed rules, no model. (Palapa Tours)" },
  { workflow: "Working out what a customer is actually asking", verdict: "AI", why: "Intent classification and routing over messy language. Repeat questions answered from the company's own material, with the source attached. (Uniserve)" },
  { workflow: "Replying to that customer", verdict: "Automation + control", why: "The draft is prepared and held. A technician approves, then it sends. Nothing irreversible leaves without a person. (Uniserve)" },
  { workflow: "Reordering stock before a line runs dry", verdict: "Automation + control", why: "The reorder point fires off real consumption and flags the line. A person places the order. (Fennec inventory, B-Side Group in build)" },
  { workflow: "Matching three versions of the same person across systems", verdict: "AI", why: "Fuzzy matching with a confidence score on every join, so a weak match stays visible for a person to judge. (A municipal political campaign)" },
  { workflow: "Setting the price, sending the campaign, hiring the host", verdict: "Human", why: "The exception, the price, the hire and the send stay with your people. Every system we build has a place where a person looks at the output and clicks." },
];

const VERDICT_STYLE: Record<string, string> = {
  Software: "chip-shipped",
  AI: "text-violet border-violet/50",
  "Automation + control": "text-signal-2 border-signal/40",
  Human: "chip-in-build",
};

export default function WhatWeDo() {
  return (
    <>
      <PageHero
        eyebrow={<><b>What we do</b> · six capabilities · three stages</>}
        title={<>Judgment stays human. Volume goes to software.</>}
        lede="We do not automate the call. We automate the work around it: the sorting, the summarising, the drafting, the reconciling. A person still approves anything that leaves the building."
      />
      <Stages />

      <section className="section border-t hairline" aria-labelledby="tools-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>The tools</b> · {toolPages.length} pages · each at its real status</p>
            <h2 id="tools-h2" className="display display-lg text-paper mt-4" data-reveal>What we have actually built.</h2>
            <p className="lede mt-6" data-reveal>One page per tool: what it does, how it works, what it runs on and where it stands. Nothing here is a brochure item. If it has not shipped, the status says so.</p>
          </Reveal>
          <Reveal as="ul" className="mt-12 grid gap-3 md:grid-cols-2" stagger={0.05}>
            {toolPages.map((t) => (
              <li key={t.slug} data-reveal>
                <Link href={t.href ?? `/what-we-do/${t.slug}/`} className="glass p-5 h-full flex flex-col hover:border-signal/40 transition-colors" data-cursor="view">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-paper font-medium"><span className="mono text-stone mr-2">{t.n}</span>{t.name}</p>
                    <span className={`chip shrink-0 ${TOOL_TONE_CLASS[t.tone]}`}>{t.status}</span>
                  </div>
                  <p className="text-sm text-silver mt-2">{t.tagline}</p>
                  <p className="fig mt-auto pt-4">
                    {t.videos.length > 0 ? "Demo available" : "Demo coming soon"}
                    {t.href ? " · Case study" : ""}
                  </p>
                </Link>
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-8">
            <p className="body-2 max-w-2xl" data-reveal>
              The thirteenth is <Link href="/work/fennec/" className="link">Fennec</Link>, the venue operating system we co-founded and built. It has its own case study under Work rather than a tool page.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section border-t hairline" aria-labelledby="belongs-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Where AI actually belongs</b> · and where it does not</p>
            <h2 id="belongs-h2" className="display display-lg text-paper mt-4" data-reveal>Some of this is software. Some is AI. Some stays with you.</h2>
            <p className="lede mt-6" data-reveal>The same six workflows keep coming up. Here is how we decide, using the engagements on this site as the examples.</p>
          </Reveal>
          <Reveal as="ul" className="mt-12 border-t hairline" stagger={0.06}>
            {BELONGS.map((b) => (
              <li key={b.workflow} className="grid gap-3 md:grid-cols-[1.1fr_11rem_1.6fr] items-start py-5 border-b hairline" data-reveal>
                <p className="text-paper font-medium">{b.workflow}</p>
                <span className={`chip w-max ${VERDICT_STYLE[b.verdict]}`}>{b.verdict}</span>
                <p className="text-sm text-silver">{b.why}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section border-t hairline" aria-labelledby="control-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] items-center">
          <Reveal>
            <p className="fig" data-reveal><b>Human control</b> · the approval gate</p>
            <h2 id="control-h2" className="display display-lg text-paper mt-4" data-reveal>Automate work. Not accountability.</h2>
            <p className="lede mt-6" data-reveal>AI prepares. The system acts where it is safe to. High-impact steps pause. A person approves. This is the ticket path being built for Uniserve, and the shape of every assistant we ship.</p>
          </Reveal>
          <Reveal>
            <div data-reveal><TicketPath /></div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

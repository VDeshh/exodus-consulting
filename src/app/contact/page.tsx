import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { founders } from "@/content/facts";

export const metadata: Metadata = {
  title: "Contact: book a free 30-minute operations audit",
  description: "Two ways to start, both landing in front of the same two founders: book the 30-minute audit call, or email shiv@exdsconsulting.com. No contact form, no queue.",
};

const BRING = [
  ["The workflow that hurts most", "One process, not a list. The one your team complains about, or the one that only works because a particular person is in the building. Quoting, ticket triage, scheduling, reconciliation, payouts, onboarding, reporting."],
  ["Roughly what it costs today", "Two numbers get us there: hours a week spent on it, and a loaded hourly rate for the people spending them. Round figures are enough."],
  ["Whoever else has to say yes", "The person who actually does the work, and the person who signs. Having both on the first call turns three meetings into one."],
];

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow={<><b>Contact</b> · 30 minutes · free · a founder answers</>}
        title="Thirty minutes. You keep the map either way."
        lede="The first call is a free operations audit. You walk us through the workflow that hurts most, we put your own hours and your own hourly rate against it while you watch, and you leave with a map of where the time and the money leak."
      />

      <section className="pb-8">
        <Reveal className="wrap grid gap-5 md:grid-cols-2" stagger={0.1}>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="glass p-6 md:p-8 block hover:border-signal/40 transition-colors" data-reveal data-cursor="start">
            <p className="fig"><b>Door one</b> · 30 min</p>
            <p className="display display-md text-paper mt-3">Book the audit call</p>
            <p className="text-silver mt-3">Open the calendar, take a slot, and it is booked. There is no qualification form in front of it and no discovery call before the discovery call.</p>
            <p className="mono text-signal-2 mt-5">calendly.com/shiv-exdsconsulting/30min →</p>
          </a>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent("The workflow that hurts most")}&body=${encodeURIComponent("The workflow:\n\nRoughly what it costs today (hours a week, hourly rate):\n\nWho else has to say yes:\n")}`} className="glass p-6 md:p-8 block hover:border-signal/40 transition-colors" data-reveal data-cursor="start">
            <p className="fig"><b>Door two</b> · direct</p>
            <p className="display display-md text-paper mt-3">Email us instead</p>
            <p className="text-silver mt-3">Two lines about the workflow that hurts is enough to start. We reply with times, or with an honest answer that this is not something we should be building for you.</p>
            <p className="mono text-signal-2 mt-5">{site.email} →</p>
          </a>
        </Reveal>
        <Reveal className="wrap mt-6">
          <p className="text-sm text-stone max-w-2xl" data-reveal>There is no contact form on this page. A form that posts into a queue nobody reads is worse than an address, so you get the address. Both routes go to a founder, and both get answered by a founder.</p>
        </Reveal>
      </section>

      <section className="section border-t hairline" aria-labelledby="bring-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>Before the call</b></p>
            <h2 id="bring-h2" className="display display-lg text-paper mt-4" data-reveal>What to bring.</h2>
            <p className="body-2 mt-4" data-reveal>Three things. Rough is fine. We tighten the numbers together while you are on the call. Not needed: an RFP, a requirements document, a stack preference, a budget figure. We do not bring a slide deck either.</p>
          </Reveal>
          <Reveal as="ol" className="grid gap-4" stagger={0.08}>
            {BRING.map(([h, t], i) => (
              <li key={h} className="flat p-5 grid grid-cols-[2.5rem_1fr] gap-3" data-reveal>
                <span className="mono text-signal-2 pt-1">0{i + 1}</span>
                <div>
                  <p className="text-paper font-medium">{h}</p>
                  <p className="text-sm text-silver mt-2">{t}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section border-t hairline" aria-labelledby="reply-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <Reveal>
            <p className="fig" data-reveal><b>Response time</b></p>
            <h2 id="reply-h2" className="display display-lg text-paper mt-4" data-reveal>We answer ourselves.</h2>
            <p className="body-2 mt-4" data-reveal>We aim to reply within one business day. Some days that is twenty minutes. Inside a build week it can take the whole day, and we would rather write that here than promise an hour and miss it. If the honest answer is that we are not the right two people to build your thing, you get that answer instead of a proposal.</p>
          </Reveal>
          <Reveal>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t hairline pt-6" data-reveal>
              {[["Aim", "Reply within one business day"], ["Replies from", founders.map((f) => f.name.split(" ")[0]).join(" or ")], ["Coordinators", "None"], ["Slide decks", "None"], ["Base", site.base], ["Where", site.where], ["Instagram", "@exodus_consulting_"], ["Email", site.email]].map(([k, v]) => (
                <div key={k}><dt className="fig">{k}</dt><dd className="text-silver text-sm mt-1">{v}</dd></div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}

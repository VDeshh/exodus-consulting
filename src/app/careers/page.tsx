import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Cell } from "@/components/work/ToolBento";
import { ProcessRail } from "@/components/work/ProcessRail";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { roles } from "@/content/careers";
import { site } from "@/lib/site";

const role = roles[0];

export const metadata: Metadata = {
  title: `Careers: ${role.title}`,
  description: `${role.title}, ${role.line}. ${role.type}, ${role.location}. $5,000 CAD monthly retainer, conditional on one qualifying client that month, plus variable bonuses. Apply on this page.`,
  alternates: { canonical: "/careers/" },
};

/**
 * Google for Jobs data. baseSalary is deliberately left out: the retainer is
 * conditional on closing a qualifying client that month, and the schema has no
 * way to say so, so a search snippet would show it as guaranteed pay. The page
 * states it with its condition. jobLocation is the firm's base; the package
 * itself says only "Canada".
 */
const jobLd = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title,
  description: [
    `<p>${role.summary}</p>`,
    `<h3>What you will own</h3><ul>${role.own.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    `<h3>What success looks like</h3><ul>${role.success.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    `<h3>Who thrives here</h3><ul>${role.thrive.map((x) => `<li>${x}</li>`).join("")}</ul>`,
    `<h3>Compensation</h3><ul>${role.pay.map((x) => `<li>${x}</li>`).join("")}</ul>`,
  ].join(""),
  datePosted: role.posted,
  employmentType: "CONTRACTOR",
  hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/icon-512.png` },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" } },
  directApply: true,
};

export default function Careers() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }} />

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="careers-glow" aria-hidden />
        <Reveal className="wrap relative">
          <p className="fig" data-reveal><b>Careers</b> · one open role</p>
          <h1 className="display display-page text-paper mt-5" data-reveal>Sell what we build.</h1>
          <p className="lede mt-6" data-reveal>
            Two founders build the software. We are looking for the person who opens the door: someone who finds owners with work that should not be manual, leads the conversation, and closes.
          </p>

          <div className="role-card glass mt-12 p-6 md:p-8" data-reveal>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0">
                <p className="note"><span className="role-dot" aria-hidden /> Now hiring</p>
                <h2 className="display display-lg text-paper mt-2">{role.title}</h2>
                <p className="body-2 mt-2">{role.line}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Role details">
                  <li className="chip">{role.location}</li>
                  <li className="chip">{role.type}</li>
                  <li className="chip">$5,000 CAD monthly retainer, conditional</li>
                  <li className="chip">Variable bonuses</li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#apply" className="btn btn-primary">Apply for this role</a>
                <a href="#role" className="btn btn-ghost">Read the role</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ----------------------------------------------------------- at a glance */}
      <section className="section-tight border-t hairline" aria-labelledby="glance-h2">
        <div className="wrap">
          <h2 id="glance-h2" className="fig"><b>At a glance</b></h2>
          <Reveal className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10" stagger={0.08}>
            {role.glance.map((g, i) => (
              <div key={g.k} className={i ? "md:border-l hairline md:pl-10" : ""} data-reveal>
                <p className="display display-lg text-paper tabular">{g.v}</p>
                <p className="text-paper font-medium mt-2">{g.k}</p>
                <p className="note mt-1">{g.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- the role */}
      <section id="role" className="section border-t hairline" aria-labelledby="role-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <p className="fig" data-reveal><b>The role</b></p>
            <h2 id="role-h2" className="display display-md text-paper mt-4" data-reveal>From first call to signed contract.</h2>
          </Reveal>
          <Reveal>
            <p className="text-lg md:text-xl leading-relaxed text-paper/90 text-pretty" data-reveal>{role.summary}</p>
          </Reveal>
        </div>

        <Reveal className="wrap mt-12 grid gap-3 md:grid-cols-6" stagger={0.07}>
          <Cell className="md:col-span-6 lg:col-span-3" label="What you will own">
            <ul className="grid gap-3">{role.own.map((x) => <li key={x} className="flex gap-3 body-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" aria-hidden />{x}</li>)}</ul>
          </Cell>
          <Cell className="md:col-span-6 lg:col-span-3" label="What success looks like">
            <ul className="grid gap-3">{role.success.map((x) => <li key={x} className="flex gap-3 body-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" aria-hidden />{x}</li>)}</ul>
          </Cell>
          <Cell className="md:col-span-3" label="Who thrives here">
            <ul className="grid gap-3">{role.thrive.map((x) => <li key={x} className="flex gap-3 body-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" aria-hidden />{x}</li>)}</ul>
          </Cell>
          <Cell className="md:col-span-3" label="What the founders bring">
            <ul className="grid gap-3">{role.support.map((x) => <li key={x} className="flex gap-3 body-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" aria-hidden />{x}</li>)}</ul>
          </Cell>
        </Reveal>
      </section>

      {/* ----------------------------------------------------------- compensation */}
      <section className="section border-t hairline" aria-labelledby="pay-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <Reveal>
            <p className="fig" data-reveal><b>Compensation</b></p>
            <h2 id="pay-h2" className="display display-md text-paper mt-4" data-reveal>How you are paid.</h2>
            <p className="note mt-4" data-reveal>Candidate-facing terms. The written qualifying-client definition, bonus plan and payment timing are shared with selected candidates.</p>
          </Reveal>
          <Reveal as="ol" className="pay-list" stagger={0.07}>
            {role.pay.map((x, i) => (
              <li key={x} data-reveal>
                <span className="pay-n tabular">{String(i + 1).padStart(2, "0")}</span>
                <p className="body-2 text-paper/90">{x}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- hiring */}
      <section className="section border-t hairline" aria-labelledby="hire-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>How hiring works</b></p>
            <h2 id="hire-h2" className="display display-lg text-paper mt-4" data-reveal>Three steps, both founders.</h2>
          </Reveal>
          <Reveal>
            <ProcessRail steps={role.interview} />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------------- apply */}
      <section id="apply" className="section border-t hairline scroll-mt-[calc(var(--nav-h)+1rem)]" aria-labelledby="apply-h2">
        <div className="wrap grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start">
            <p className="fig" data-reveal><b>Apply</b> · {role.title}</p>
            <h2 id="apply-h2" className="display display-lg text-paper mt-4" data-reveal>Tell us what you have closed.</h2>
            <p className="lede mt-6" data-reveal>Your resume and a few sentences on your B2B closing experience. It arrives in the founders&apos; inbox, not a portal.</p>
            <p className="note mt-6" data-reveal>Rather email? Send your resume to <a className="link text-paper" href={`mailto:vish@exdsconsulting.com?subject=${encodeURIComponent(`Application: ${role.title}`)}`}>vish@exdsconsulting.com</a>.</p>
          </Reveal>
          <ApplyForm role={role.slug} roleTitle={role.title} />
        </div>
      </section>

      {/* ------------------------------------------------------------- about us */}
      <section className="section-tight border-t hairline">
        <Reveal className="wrap flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="fig" data-reveal><b>About Exodus Consulting</b></p>
            <p className="display display-sm text-paper mt-3" data-reveal>Build smarter. Operate better. Scale faster.</p>
            <p className="body-2 mt-3" data-reveal>Exodus Consulting partners with businesses to deploy AI-powered customer experiences, automations, custom software and data-driven solutions.</p>
          </div>
          <div className="flex flex-wrap gap-3" data-reveal>
            <Link href="/work/" className="btn btn-ghost">See what we have built</Link>
            <Link href="/about/" className="btn btn-ghost">Meet the founders</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

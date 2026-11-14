import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Cell } from "@/components/work/ToolBento";
import { ProcessRail } from "@/components/work/ProcessRail";
import { ApplyForm } from "@/components/careers/ApplyForm";
import { notFound } from "next/navigation";
import { roles, roleBySlug, type Role } from "@/content/careers";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

const money = (r: Role) => `$${r.retainer.toLocaleString("en-CA")}`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = roleBySlug(slug);
  if (!role) return {};
  return {
    title: `Careers: ${role.title}`,
    description: `${role.title}, ${role.line}. ${role.hours} ${role.type.toLowerCase()}, ${role.location}. ${money(role)} CAD monthly retainer, conditional on one qualifying client that month, plus variable bonuses. Apply on this page.`,
    alternates: { canonical: `/careers/${role.slug}/` },
  };
}

/**
 * Google for Jobs data. baseSalary is deliberately left out: the retainer is
 * conditional on closing a qualifying client that month, and the schema has no
 * way to say so, so a search snippet would show it as guaranteed pay. The page
 * states it with its condition. jobLocation is the firm's base; the package
 * itself says only "Canada".
 */
const jobLd = (role: Role) => ({
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
  employmentType: [role.hours === "Full-time" ? "FULL_TIME" : "PART_TIME", "CONTRACTOR"],
  hiringOrganization: { "@type": "Organization", name: site.name, sameAs: site.url, logo: `${site.url}/icon-512.png` },
  jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC", addressCountry: "CA" } },
  directApply: true,
});

export default async function CareerRole({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = roleBySlug(slug);
  if (!role) notFound();
  const other = roles.find((r) => r.slug !== role.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd(role)) }} />

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="careers-glow" aria-hidden />
        <Reveal className="wrap relative">
          <p className="fig" data-reveal><Link href="/careers/" className="hover:text-paper inline-flex items-center min-h-[44px] px-2 -mx-2 -my-3">Careers</Link> · <span className="role-dot" aria-hidden /> now hiring</p>
          <h1 className="display display-page text-paper mt-5" data-reveal>{role.title}</h1>
          <p className="lede mt-6" data-reveal>{role.line}. Find owners with work that should not be manual, lead the conversation, and close, with both founders behind every deal.</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Role details" data-reveal>
            <li className="chip">{role.location}</li>
            <li className="chip">{role.hours}</li>
            <li className="chip">{role.type}</li>
            <li className="chip">{money(role)} CAD monthly retainer, conditional</li>
            <li className="chip">Variable bonuses</li>
          </ul>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal>
            <a href="#apply" className="btn btn-primary">Apply for this role</a>
            <a href="#role" className="btn btn-ghost">Read the role</a>
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

      {other && (
        <section className="section-tight border-t hairline">
          <Reveal className="wrap flex flex-wrap items-center justify-between gap-4">
            <p className="note" data-reveal>Also hiring · {other.title} · {money(other)} CAD monthly retainer, same conditions</p>
            <Link href={`/careers/${other.slug}/`} className="btn btn-ghost" data-reveal>View the {other.hours.toLowerCase()} role →</Link>
          </Reveal>
        </section>
      )}

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

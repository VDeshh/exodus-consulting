import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ProcessRail } from "@/components/work/ProcessRail";
import { roles } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers: Sales Executive, full-time and part-time",
  description:
    "Two open roles: Sales Executive, full-time ($5,000 CAD monthly retainer) or part-time ($500 CAD monthly retainer), each conditional on one qualifying client that month, with a quota of 4 a month and variable bonuses.",
  alternates: { canonical: "/careers/" },
};

/** The two roles differ only in hours and retainer, so the listing shows them side by side. */
export default function Careers() {
  const money = (n: number) => `$${n.toLocaleString("en-CA")}`;
  return (
    <>
      <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
        <div className="careers-glow" aria-hidden />
        <Reveal className="wrap relative">
          <p className="fig" data-reveal><b>Careers</b> · {roles.length} open roles</p>
          <h1 className="display display-page text-paper mt-5" data-reveal>Sell what we build.</h1>
          <p className="lede mt-6" data-reveal>
            Two founders build the software. We are looking for the person who opens the door: someone who finds owners with work that should not be manual, leads the conversation, and closes. Full-time or part-time, on the same terms.
          </p>
        </Reveal>

        <Reveal className="wrap relative mt-12 grid gap-4 md:grid-cols-2" stagger={0.08}>
          {roles.map((r) => (
            <Link key={r.slug} href={`/careers/${r.slug}/`} className="role-tile glass group block p-6 md:p-8" data-reveal data-cursor="view">
              <div className="flex items-center justify-between gap-3">
                <p className="note"><span className="role-dot" aria-hidden /> Now hiring</p>
                <span className="chip">{r.hours}</span>
              </div>
              <h2 className="display display-md text-paper mt-4">{r.title}</h2>
              <p className="body-2 mt-2">{r.line}</p>
              <dl className="role-terms mt-7">
                <div><dt>Retainer</dt><dd><span className="display display-sm text-paper tabular">{money(r.retainer)}</span><span className="note"> CAD / month</span></dd></div>
                <div><dt>Quota</dt><dd><span className="display display-sm text-paper tabular">4</span><span className="note"> clients / month</span></dd></div>
                <div><dt>Base needs</dt><dd><span className="display display-sm text-paper tabular">1</span><span className="note"> qualifying client</span></dd></div>
              </dl>
              <p className="role-go mt-7">View role and apply <span aria-hidden>→</span></p>
            </Link>
          ))}
        </Reveal>
        <Reveal className="wrap relative">
          <p className="note mt-5" data-reveal>Both roles: the retainer is paid in a month with at least one qualifying client closed. The quota is assessed as 12 clients over a rolling 3 months. Bonuses vary with results. Contractor arrangement, {roles[0].location}.</p>
        </Reveal>
      </section>

      <section className="section border-t hairline" aria-labelledby="hire-h2">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="fig" data-reveal><b>How hiring works</b></p>
            <h2 id="hire-h2" className="display display-lg text-paper mt-4" data-reveal>Three steps, both founders.</h2>
          </Reveal>
          <Reveal>
            <ProcessRail steps={roles[0].interview} />
          </Reveal>
        </div>
      </section>

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

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { engagements, STATUS_LABEL } from "@/content/facts";
import { cases } from "@/content/cases";
import { site } from "@/lib/site";

/** Case study template. Renders facts + sections for a slug. Scenes are slotted in by the page. */
export function CaseHeader({ slug, kicker }: { slug: string; kicker: string }) {
  const e = engagements.find((x) => x.slug === slug)!;
  const c = cases[slug];
  return (
    <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-14 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden />
      <Reveal className="wrap relative">
        <p className="fig" data-reveal><Link href="/work/" className="hover:text-paper inline-flex items-center min-h-[44px] px-2 -mx-2 -my-3">Work</Link> · {kicker} · <span className={`chip chip-${e.status} !py-0.5`}>{STATUS_LABEL[e.status]}</span></p>
        <h1 className="display display-xl text-paper mt-5 max-w-5xl" data-reveal>{e.short}</h1>
        <p className="lede mt-8" data-reveal>{e.problem}</p>
        <div className="mt-8 flex flex-wrap gap-3" data-reveal>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book a free audit</a>
          <a href="#build" className="btn btn-ghost">What we built</a>
        </div>
        <dl className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 border-t hairline pt-6" data-reveal>
          {c.facts.map((f) => (
            <div key={f.k}>
              <dt className="fig">{f.k}</dt>
              <dd className="text-sm text-silver mt-1">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

export function CaseSections({ slug, from = 0, to }: { slug: string; from?: number; to?: number }) {
  const c = cases[slug];
  const list = c.sections.slice(from, to);
  return (
    <div className="wrap">
      {list.map((s, i) => (
        <Reveal key={s.label} className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr] py-12 border-t hairline" as="section">
          <div data-reveal>
            <p className="fig"><b>{String(from + i + 1).padStart(2, "0")}</b> · {s.label}</p>
            <h2 id={s.label === "The build" ? "build" : undefined} className="display display-md text-paper mt-3">{s.title}</h2>
          </div>
          <div className="body-2 space-y-4 max-w-2xl" data-reveal>
            {s.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            {s.note && <p className="fig !normal-case !tracking-normal border-l hairline pl-3">{s.note}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function CaseSource({ slug }: { slug: string }) {
  const c = cases[slug];
  return (
    <div className="wrap py-8 border-t hairline">
      <p className="fig">Source of every statement on this page · {c.source} · verified 2026-09-16</p>
    </div>
  );
}

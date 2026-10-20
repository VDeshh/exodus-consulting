import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { engagements, STATUS_LABEL } from "@/content/facts";
import { cases } from "@/content/cases";
import { site } from "@/lib/site";
import { ReadProgress } from "./ReadProgress";

/** Case study template. Renders facts + sections for a slug. Scenes are slotted in by the page. */
export function CaseHeader({ slug, kicker }: { slug: string; kicker: string }) {
  const e = engagements.find((x) => x.slug === slug)!;
  const c = cases[slug];
  return (
    <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-14 overflow-hidden">
      <ReadProgress />
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden />
      <Reveal className="wrap relative">
        <p className="fig" data-reveal><Link href="/work/" className="hover:text-paper inline-flex items-center min-h-[44px] px-2 -mx-2 -my-3">Work</Link> · {kicker} · <span className={`chip chip-${e.status} !py-0.5`}>{STATUS_LABEL[e.status]}</span></p>
        <h1 className="display display-page text-paper mt-5" data-reveal>{e.short}</h1>
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
        <Reveal key={s.label} className="case-sec grid gap-6 lg:grid-cols-[0.38fr_0.62fr] lg:gap-14 py-14 md:py-20 border-t hairline" as="section">
          {/* Pinned while the body scrolls past it, magazine-style. */}
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2.5rem)] lg:self-start" data-reveal>
            <p className="fig"><b>{String(from + i + 1).padStart(2, "0")}</b> · {s.label}</p>
            <h2 id={s.label === "The build" ? "build" : undefined} className="display display-md text-paper mt-4">{s.title}</h2>
          </div>
          <div className="case-body space-y-5 max-w-2xl" data-reveal>
            {s.body.map((p, k) => (
              <p key={p.slice(0, 40)} className={k === 0 ? "text-lg md:text-xl leading-relaxed text-paper/90 text-pretty" : "body-2 leading-relaxed"}>{p}</p>
            ))}
            {s.note && (
              <aside className="case-note mt-8">
                <p className="text-paper/85 leading-relaxed">{s.note}</p>
              </aside>
            )}
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

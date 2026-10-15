import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { ToolVideo } from "@/components/work/ToolVideo";
import { ToolBento } from "@/components/work/ToolBento";
import { toolPages, toolBySlug, TOOL_TONE_CLASS } from "@/content/tools";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return toolPages.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) return {};
  return {
    title: `${t.name}: ${t.tagline}`,
    description: `${t.tagline} For ${t.who.charAt(0).toLowerCase()}${t.who.slice(1)} ${t.statusNote ?? t.status}`,
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t || t.href) notFound();

  const idx = toolPages.findIndex((x) => x.slug === t.slug);
  const next = toolPages[(idx + 1) % toolPages.length];

  return (
    <>
      <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-70" aria-hidden />
        <Reveal className="wrap relative max-w-5xl">
          <p className="fig" data-reveal>
            <Link href="/what-we-do/" className="hover:text-paper inline-flex items-center min-h-[44px] px-2 -mx-2 -my-3">What we do</Link>
            {" · "}{t.n}{" · "}
            <span className={`chip ${TOOL_TONE_CLASS[t.tone]} !py-0.5`}>{t.status}</span>
          </p>
          <h1 className="display display-lg lg:display-xl text-paper mt-5" data-reveal>{t.name}</h1>
          <p className="lede mt-6" data-reveal>{t.tagline}</p>
          <p className="mt-6 body-2 max-w-2xl" data-reveal><span className="fig">Who it&apos;s for</span><br />{t.who}</p>
          <div className="mt-8 flex flex-wrap gap-3" data-reveal>
            <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book a free audit</a>
            {t.videos.length > 0 && <a href="#demo" className="btn btn-ghost">Watch the demo</a>}
          </div>
        </Reveal>
      </section>

      {t.screenshots.length > 0 && (
        <section className="section-tight border-t hairline">
          <Reveal className="wrap grid gap-5" stagger={0.08}>
            {t.screenshots.map((s) => (
              <figure key={s.src} className="glass overflow-hidden" data-reveal data-cursor="inspect">
                <div className="relative aspect-[16/10] bg-bg-1">
                  <Image src={s.src} alt={s.caption} fill sizes="(min-width:1024px) 80vw, 100vw" className="object-cover object-top" />
                </div>
                <figcaption className="fig p-4">{s.caption}</figcaption>
              </figure>
            ))}
          </Reveal>
        </section>
      )}

      <section className="section border-t hairline" aria-labelledby="does-h2">
        <div className="wrap">
          <h2 id="does-h2" className="sr-only">What {t.name} does and how it works</h2>
          <Reveal stagger={0.07}>
            <ToolBento does={t.does} how={t.how} worksWith={t.worksWith} status={t.statusNote ?? t.status} />
          </Reveal>
        </div>
      </section>

      <section id="demo" className="section border-t hairline" aria-labelledby="demo-h2">
        <div className="wrap">
          <Reveal className="max-w-3xl">
            <p className="fig" data-reveal><b>Demo</b></p>
            <h2 id="demo-h2" className="display display-md text-paper mt-3" data-reveal>
              {t.videos.length > 0 ? "See it running." : "Demo coming soon."}
            </h2>
            <p className="body-2 mt-3" data-reveal>{t.demoNote}</p>
          </Reveal>
          {t.videos.length > 0 && (
            <Reveal className={`mt-8 grid gap-5 ${t.videos.length > 1 && t.videos[0].aspect === "16/9" ? "lg:grid-cols-2" : ""}`} stagger={0.1}>
              {t.videos.map((v) => (
                <div key={v.src} data-reveal><ToolVideo media={v} slug={t.slug} /></div>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      <section className="section-tight border-t hairline">
        <Reveal className="wrap flex flex-wrap items-center justify-between gap-4">
          <p className="fig" data-reveal>Next · {next.n} {next.name}</p>
          <Link href={`/what-we-do/${next.slug}/`} className="btn btn-ghost" data-reveal data-cursor="view">{next.name} →</Link>
        </Reveal>
      </section>

      <CtaBand
        title="Thirty minutes, and you leave with the arithmetic."
        text={`Tell us the process that annoys you most. We map where it leaks, put a number on it, and say plainly whether ${t.name} is the right answer or whether something else is.`}
      />
    </>
  );
}

export const dynamicParams = false;

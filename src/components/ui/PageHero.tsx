import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lede, children, wide = false }: { eyebrow: React.ReactNode; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode; wide?: boolean }) {
  return (
    <section className="relative pt-[calc(var(--nav-h)+4rem)] pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-70" aria-hidden />
      <Reveal className={`wrap relative ${wide ? "" : "max-w-5xl"}`}>
        <p className="fig" data-reveal>{eyebrow}</p>
        <h1 className="display display-xl text-paper mt-5" data-reveal>{title}</h1>
        {lede && <p className="lede mt-8 !max-w-2xl" data-reveal>{lede}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3 items-center" data-reveal>{children}</div>}
      </Reveal>
    </section>
  );
}

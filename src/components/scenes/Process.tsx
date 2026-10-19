"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { process as steps, guarantee } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";
import { RoiCalculator } from "@/components/ui/RoiCalculator";

/**
 * 10 — HOW WE WORK AND CHARGE. One line travels across the page: Talk → Map →
 * Sign → Build → Measure. It draws as the visitor scrolls. Then the six terms
 * of the guarantee, verbatim in spirit from the live site, and the ROI calculator.
 */

const GLYPH: Record<string, React.ReactNode> = {
  Talk: (<><circle cx="22" cy="26" r="9" stroke="currentColor" /><circle cx="42" cy="22" r="9" stroke="currentColor" /><path d="M22 35v9M42 31v13" stroke="currentColor" /></>),
  Map: (<><path d="M8 32h16l8-12h8l8 12h8" stroke="currentColor" /><path d="M32 20v-8M48 32v10M24 32v10" stroke="currentColor" /><circle cx="32" cy="12" r="2.5" fill="#e0a458" /><circle cx="48" cy="42" r="2.5" fill="#e0a458" /></>),
  Sign: (<><rect x="14" y="8" width="36" height="46" rx="3" stroke="currentColor" /><path d="M20 20h24M20 28h24M20 36h12" stroke="currentColor" /><path d="M22 46c4-6 8 4 12-2s6 2 10-2" stroke="#e0a458" /></>),
  Build: (<><rect x="10" y="12" width="44" height="36" rx="3" stroke="currentColor" /><path d="M10 20h44" stroke="currentColor" /><rect x="15" y="26" width="14" height="16" fill="currentColor" opacity="0.5" /><rect x="33" y="26" width="16" height="6" fill="currentColor" opacity="0.5" /><rect x="33" y="36" width="16" height="6" fill="currentColor" opacity="0.3" /></>),
  Measure: (<><path d="M10 50h44" stroke="currentColor" /><path d="M16 42v8M26 30v20M36 36v14M46 22v28" stroke="#3dbe8b" strokeWidth="3" /><path d="M10 26l36-14" stroke="currentColor" strokeDasharray="3 3" /></>),
};

export function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const line = root.current?.querySelector<SVGPathElement>(".journey-line");
        if (!line) return;
        const L = line.getTotalLength();
        gsap.set(line, { strokeDasharray: L, strokeDashoffset: L });
        gsap.to(line, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: q(".journey")[0], start: "top 75%", end: "bottom 45%", scrub: 0.5 } });
        gsap.fromTo(q(".node"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "expo.out", scrollTrigger: { trigger: q(".journey")[0], start: "top 92%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section border-t hairline" aria-labelledby="proc-h2" id="how-we-work">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="fig" data-reveal><b>How we work and charge</b></p>
          <h2 id="proc-h2" className="display display-lg text-paper mt-4" data-reveal>Nothing is built before the number is on the page.</h2>
          <p className="lede mt-6" data-reveal>Five steps. The bar is agreed in writing before anything is built, the clock starts at deployment, and if the system misses the bar we keep working at no additional cost until it clears.</p>
        </Reveal>

        <div className="journey relative mt-16">
          <svg className="absolute inset-x-0 top-8 hidden lg:block h-4 w-full" viewBox="0 0 1000 16" preserveAspectRatio="none" aria-hidden>
            <path className="journey-line" d="M40 8 H960" stroke="#2f6bff" strokeWidth="1.5" fill="none" />
          </svg>
          <ol className="grid gap-8 lg:grid-cols-5 snap-row snap-wide snap-bleed">
            {steps.map((s) => (
              <li key={s.n} className="node relative">
                <div className="w-16 h-16 rounded-full glass grid place-items-center text-signal-2 relative z-10">
                  <svg viewBox="0 0 64 64" width="40" height="40" fill="none" strokeWidth="1.4" aria-hidden>{GLYPH[s.name]}</svg>
                </div>
                <p className="fig mt-5"><b>{s.n}</b> · {s.time}</p>
                <h3 className="display display-sm text-paper mt-1">{s.name}</h3>
                <p className="text-sm text-silver mt-2">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="snap-hint" aria-hidden>Swipe · five steps</p>
        </div>

        <Reveal className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <p className="fig" data-reveal><b>The guarantee</b> · six terms, written down before we build</p>
            <h3 className="display display-md text-paper mt-3" data-reveal>We stay until it pays.</h3>
            <p className="body-2 mt-4 max-w-md" data-reveal>Most AI work is sold on a promise and invoiced on effort. We would rather be invoiced on a number you signed off on. The bar and the timeframe are set per engagement, and nothing here guarantees a particular dollar amount.</p>
            <ol className="mt-6 space-y-3">
              {guarantee.map((g) => (
                <li key={g.n} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t hairline pt-3" data-reveal>
                  <span className="mono text-signal-2 pt-1">{g.n}</span>
                  <div>
                    <p className="text-paper font-medium">{g.title}</p>
                    <p className="text-sm text-stone mt-1">{g.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div data-reveal>
            <RoiCalculator />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

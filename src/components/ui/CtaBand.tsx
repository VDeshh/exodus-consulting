"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/gsap";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * The closing band on ten pages. Two giant serif lines run behind the
 * statement in opposite directions, one solid and one an outlined italic.
 *
 * Adapted from the 21st.dev "Worth Keeping" CTA, which is a single CSS
 * keyframe marquee. Here each line is a GSAP loop whose timeScale follows
 * scroll velocity: scroll fast and the type surges, stop and it eases back to
 * a drift. The loop is two identical halves slid by exactly half their width,
 * and each half repeats the phrase enough to stay wider than the screen, so
 * the seam never shows. Reduced motion gets the lines standing still.
 */
const ROW_A = "Book a free audit";
const ROW_B = "You keep the map";
const REPEATS = 6;

function Line({ phrase, className }: { phrase: string; className: string }) {
  const half = `${phrase} · `.repeat(REPEATS);
  return (
    <div className={`cta-line flex w-max whitespace-nowrap will-change-transform ${className}`}>
      <span>{half}</span>
      <span>{half}</span>
    </div>
  );
}

export function CtaBand({
  title = "Ready to depart the old way?",
  text = "Thirty minutes, and you leave with the arithmetic either way. Two founders on the call. You keep the map.",
}: {
  title?: string;
  text?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const [a, b] = gsap.utils.toArray<HTMLElement>(".cta-line", root.current);
        const la = gsap.fromTo(a, { xPercent: 0 }, { xPercent: -50, duration: 60, ease: "none", repeat: -1 });
        const lb = gsap.fromTo(b, { xPercent: -50 }, { xPercent: 0, duration: 72, ease: "none", repeat: -1 });

        // Scroll velocity sets a target speed; quickTo eases toward it, and a
        // ticker applies it, so the lines never jump. When scrolling stops for
        // 150ms the target drops back to a drift.
        const speed = { v: 1 };
        const toSpeed = gsap.quickTo(speed, "v", { duration: 0.9, ease: "power3.out" });
        const apply = () => { la.timeScale(speed.v); lb.timeScale(speed.v); };
        gsap.ticker.add(apply);
        const idle = gsap.delayedCall(0.15, () => toSpeed(1)).pause();
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => { toSpeed(1 + Math.min(Math.abs(self.getVelocity()) / 220, 7)); idle.restart(true); },
          onToggle: (self) => { if (self.isActive) { la.resume(); lb.resume(); } else { la.pause(); lb.pause(); } },
        });

        return () => { gsap.ticker.remove(apply); st.kill(); idle.kill(); la.kill(); lb.kill(); };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="cta-band relative overflow-hidden border-t hairline py-24 md:py-36" aria-label="Book a free operations audit">
      <div className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center gap-[1vw] overflow-hidden" aria-hidden>
        <Line phrase={ROW_A} className="cta-solid" />
        <Line phrase={ROW_B} className="cta-outline" />
      </div>
      <div className="cta-glow pointer-events-none absolute inset-0" aria-hidden />

      <Reveal className="wrap relative flex flex-col items-center text-center">
        <p className="fig" data-reveal><b>Free</b> · 30 minutes · a founder answers</p>
        <p className="display display-lg text-paper mt-6 max-w-4xl" data-reveal>{title}</p>
        <p className="lede mt-6 mx-auto text-balance" data-reveal>{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book a free operations audit</a>
          <Link href="/#depart" className="btn btn-ghost">Tell us what&apos;s manual</Link>
        </div>
        <p className="note mt-8" data-reveal>Two founders on the call. Nothing to prepare, and you keep the map either way.</p>
      </Reveal>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

/** Fades children up when they enter the viewport. Children are visible immediately for reduced motion. */
export function Reveal({ children, className = "", stagger = 0.08, as: Tag = "div" }: { children: React.ReactNode; className?: string; stagger?: number; as?: "div" | "section" | "ul" | "ol" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const items = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]") ?? [];
        const targets = items.length ? items : [ref.current!];
        gsap.set(targets, { opacity: 0, y: 18 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const El = Tag as any;
  return (
    <El ref={ref} className={className}>
      {children}
    </El>
  );
}

"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/gsap";

/**
 * A hairline across the top of a case study that fills as you read. Scrubbed
 * to the whole document, transform-only, and hidden under reduced motion,
 * where a bar that tracks scroll is just noise.
 */
export function ReadProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.fromTo(bar.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.2 },
      });
    });
    return () => mm.revert();
  });
  return <div ref={bar} className="read-progress" aria-hidden />;
}

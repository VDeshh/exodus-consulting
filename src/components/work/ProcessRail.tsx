"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION, REDUCED } from "@/lib/gsap";

/**
 * A rail that draws itself as the steps go by.
 *
 * The 21st.dev scroll timeline recomputes progress in a scroll listener and
 * pushes it through React state on every frame. This does the same reading
 * with a scrubbed ScrollTrigger on the line's scaleY and a per-step trigger
 * toggling a class, so nothing re-renders while scrolling and the whole thing
 * stays on Lenis's clock rather than fighting it.
 *
 * Steps are a left rail rather than the reference's zig-zag: alternating sides
 * reads as a product changelog, and this is an engagement process.
 */
export function ProcessRail({ steps }: { steps: [string, string][] }) {
  const root = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(MOTION, () => {
        gsap.fromTo(
          q(".rail-fill"),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: root.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.4,
            },
          },
        );

        q(".rail-step").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 72%",
            onEnter: () => el.classList.add("is-on"),
            onLeaveBack: () => el.classList.remove("is-on"),
          });
        });
      });

      mm.add(REDUCED, () => {
        gsap.set(q(".rail-fill"), { scaleY: 1, transformOrigin: "top" });
        q(".rail-step").forEach((el) => el.classList.add("is-on"));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ol ref={root} className="relative pl-10 sm:pl-14">
      <span className="rail-track" aria-hidden>
        <span className="rail-fill" />
      </span>
      {steps.map(([h, t], i) => (
        <li key={h} className="rail-step relative pb-10 last:pb-0">
          <span className="rail-node" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="display display-sm text-paper">{h}</p>
          <p className="body-2 mt-3 max-w-xl">{t}</p>
        </li>
      ))}
    </ol>
  );
}

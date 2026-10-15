"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Lenis drives the scroll, GSAP's ticker drives Lenis, ScrollTrigger listens
 * to Lenis. One clock. Off for reduced motion and for touch (native momentum
 * scroll is better there).
 */
export function SmoothScroll() {
  useEffect(() => {
    // Dev-only QA hook: /?qa=<px> scrolls to a position after paint so headless
    // screenshots can capture deep sections. Stripped in production builds.
    if (process.env.NODE_ENV !== "production") {
      const qa = new URLSearchParams(window.location.search).get("qa");
      if (qa) window.setTimeout(() => window.scrollTo(0, Number(qa)), 400);
    }
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add("lenis-on");

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis-on");
    };
  }, []);
  return null;
}

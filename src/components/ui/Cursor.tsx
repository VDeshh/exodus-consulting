"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor label. The native cursor stays; a small mono label
 * follows the pointer over elements marked data-cursor="view|explore|start|inspect".
 * No trails, no particles. Off for touch, reduced motion and keyboard users.
 */
const LABELS: Record<string, string> = { view: "View", explore: "Explore", start: "Start", inspect: "Inspect" };

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduced || !el) return;

    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, active = false;
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      el.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const key = t?.dataset.cursor;
      const next = !!(key && LABELS[key]);
      if (next !== active) { active = next; el.dataset.on = String(next); }
      if (next) el.textContent = LABELS[key!];
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed left-0 top-0 z-[150] pointer-events-none mono text-bg-0 bg-paper px-2 py-1 rounded-sm opacity-0 data-[on=true]:opacity-100 transition-opacity duration-150 will-change-transform"
    />
  );
}

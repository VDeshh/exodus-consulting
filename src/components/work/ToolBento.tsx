"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Bento lattice for the tool pages, replacing the two plain columns.
 *
 * Each cell tracks the pointer and paints a soft signal-coloured spotlight
 * under the glass, written to CSS custom properties so the work happens on
 * the compositor and no React state churns on mousemove. Pointer-coarse and
 * reduced-motion users get the flat card, handled in globals.css.
 */

function Cell({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={track} className={`bento-cell ${className}`} data-reveal>
      {label && <p className="fig mb-4">{label}</p>}
      {children}
    </div>
  );
}

export function ToolBento({
  does,
  how,
  worksWith,
  status,
}: {
  does: string[];
  how: string[];
  worksWith: string;
  status: string;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-6">
      <Cell className="md:col-span-6 lg:col-span-3" label="What it does">
        <ul className="grid gap-4">
          {does.map((d) => (
            <li key={d} className="flex gap-3 body-2">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-signal-2" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </Cell>

      <Cell className="md:col-span-6 lg:col-span-3" label="How it works">
        <ol className="grid gap-4">
          {how.map((h, i) => (
            <li key={h} className="grid grid-cols-[2rem_1fr] gap-3">
              <span className="mono text-signal-2 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="body-2">{h}</span>
            </li>
          ))}
        </ol>
      </Cell>

      <Cell className="md:col-span-3 lg:col-span-3" label="Works with">
        <p className="body-2">{worksWith}</p>
      </Cell>

      <Cell className="md:col-span-3 lg:col-span-3" label="Status">
        <p className="body-2">{status}</p>
      </Cell>
    </div>
  );
}

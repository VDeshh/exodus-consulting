"use client";

import { useState } from "react";

/**
 * Clamps long copy on phones with a "Read more" toggle; full text from md up.
 * The clamp lives in a class, not inline styles, so React never sees a
 * shorthand/longhand conflict on re-render.
 */
export function Expandable({ children, lines = 4, className = "" }: { children: React.ReactNode; lines?: number; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="xp-exp">
      <p className={`${className}${open ? "" : " xp-clamp"}`} style={{ ["--xp-lines" as string]: lines }}>{children}</p>
      <button type="button" onClick={() => setOpen((v) => !v)} className="md:hidden mt-1.5 mono text-signal-2 min-h-[40px] -ml-1 px-1" aria-expanded={open}>
        {open ? "Show less" : "Read more"}
      </button>
      <style>{`
        .xp-clamp { display: -webkit-box; -webkit-line-clamp: var(--xp-lines, 4); -webkit-box-orient: vertical; overflow: hidden; }
        @media (min-width: 768px) { .xp-clamp { display: block; overflow: visible; } .xp-exp > button { display: none; } }
      `}</style>
    </div>
  );
}

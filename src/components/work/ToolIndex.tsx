"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { tools, TOOL_TONE_CLASS } from "@/content/tools";

/**
 * The tool index as an editorial list rather than a grid of identical cards.
 *
 * Adapted from the 21st.dev editorial service list: numbered rows, the name
 * shifting right on hover, and a detail panel that expands on a grid-rows
 * transition so it animates without measuring height. Rows carry the real
 * status chip, and the panel holds the tagline, who it is for and the link
 * through. Fennec is in the list but points at its case study.
 */
export function ToolIndex() {
  const [open, setOpen] = useState(-1);
  const id = useId();

  return (
    <div className="border-t hairline">
      {tools.map((t, i) => {
        const isOpen = open === i;
        const href = t.href ?? `/what-we-do/${t.slug}/`;
        return (
          <div key={t.slug} className="border-b hairline" data-reveal>
            <button
              type="button"
              id={`${id}-b-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${id}-p-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="group flex w-full items-center gap-4 py-5 text-left min-h-[56px]"
            >
              <span className="mono w-8 shrink-0 text-sm text-stone">{t.n}</span>
              <span
                className={`display display-sm text-paper transition-transform duration-300 ease-out ${
                  isOpen ? "translate-x-2" : "group-hover:translate-x-2"
                }`}
              >
                {t.name}
              </span>
              <span className={`chip ml-auto shrink-0 ${TOOL_TONE_CLASS[t.tone]}`}>{t.status}</span>
              <svg
                className={`h-4 w-4 shrink-0 text-stone transition-transform duration-300 group-hover:text-paper ${isOpen ? "rotate-90 text-signal-2" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-b-${i}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-5 pb-7 sm:pl-12 lg:grid-cols-[1.4fr_1fr]">
                  <div>
                    <p className="lede">{t.tagline}</p>
                    <p className="note mt-3 max-w-xl">
                      <b>Who it&apos;s for</b> · {t.who}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <p className="note">{t.videos.length > 0 ? "Demo available" : "Demo coming soon"}</p>
                    <Link href={href} className="btn btn-ghost" data-cursor="view">
                      {t.href ? "Read the case study" : `Open ${t.name}`} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

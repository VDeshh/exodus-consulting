"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { engagements, PROBLEM_TAGS, ProblemTag, STATUS_LABEL } from "@/content/facts";
import { track } from "@/lib/track";

/**
 * Work as an index, not a grid of tiles.
 *
 * Each engagement is one wide row. On a fine pointer the row's capture rides
 * the cursor; the plate is a single fixed-position node reused by every row,
 * moved with a transform written straight to the DOM, so hovering down the
 * list never re-renders React.
 *
 * Only the three with a shipped product surface carry a capture. The campaign
 * and B-Side rows deliberately have none: /work/current/ says in as many words
 * that neither has a surface of ours worth capturing yet, and a borrowed
 * screenshot on this page would quietly contradict it.
 */
const PREVIEW: Record<string, string> = {
  fennec: "/tools/13-fennec.webp",
  uniserve: "/tools/08-ai-support-chatbot.webp",
  "palapa-tours": "/tools/11-tip-out-software.webp",
};

const TAGS = Object.keys(PROBLEM_TAGS) as ProblemTag[];

export function WorkRows() {
  const [tag, setTag] = useState<ProblemTag | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const plate = useRef<HTMLDivElement>(null);

  const list = useMemo(
    () => (tag ? engagements.filter((e) => e.fixes.includes(tag)) : engagements),
    [tag],
  );

  const move = (e: React.PointerEvent) => {
    const el = plate.current;
    if (!el) return;
    // Clamped to the viewport, and flipped to the cursor's left when there is
    // no room on the right, so the plate never hangs off an edge or rides up
    // under the nav.
    const w = 340;
    const h = w * 0.625;
    const pad = 16;
    const right = e.clientX + 28;
    const x = right + w + pad > window.innerWidth ? e.clientX - w - 28 : right;
    const y = Math.min(Math.max(e.clientY - h / 2, pad + 64), window.innerHeight - h - pad);
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  return (
    <div className="wrap" onPointerMove={move}>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="What are you trying to fix?">
        <span className="fig mr-2">What are you trying to fix?</span>
        <button
          type="button"
          onClick={() => setTag(null)}
          aria-pressed={tag === null}
          className={`chip !py-2 !px-3 min-h-[40px] cursor-pointer transition-colors ${tag === null ? "bg-paper !text-bg-0 border-paper" : "hover:border-paper/40"}`}
        >
          All
        </button>
        {TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTag(t); track("work_category_selected", { tag: t }); }}
            aria-pressed={tag === t}
            className={`chip !py-2 !px-3 min-h-[40px] cursor-pointer transition-colors ${tag === t ? "bg-paper !text-bg-0 border-paper" : "hover:border-paper/40"}`}
          >
            {PROBLEM_TAGS[t]}
          </button>
        ))}
      </div>

      <ul className="mt-12 border-t hairline" aria-live="polite">
        {list.map((e, i) => (
          <li key={e.slug} className="border-b hairline">
            <Link
              href={e.href}
              className="work-row group grid items-baseline gap-x-6 gap-y-3 py-8 md:grid-cols-[3.5rem_1fr_auto] md:py-10"
              data-cursor="view"
              onClick={() => track("case_study_view", { slug: e.slug })}
              onPointerEnter={() => setPreview(PREVIEW[e.slug] ?? null)}
              onPointerLeave={() => setPreview(null)}
            >
              <span className="mono text-sm text-stone">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="display display-md text-paper block transition-transform duration-500 ease-out md:group-hover:translate-x-3 [overflow-wrap:anywhere]">
                  {e.client}
                </span>
                <span className="text-silver mt-2 block">{e.short}</span>
                <span className="mt-4 flex flex-wrap gap-2">
                  {e.fixes.map((f) => (
                    <span key={f} className={`chip ${f === tag ? "text-signal-2 border-signal/40" : ""}`}>
                      {PROBLEM_TAGS[f]}
                    </span>
                  ))}
                </span>
              </span>
              <span className="flex items-center gap-4 md:justify-end">
                <span className="note hidden lg:inline">{e.sector}</span>
                <span className={`chip chip-${e.status} shrink-0`}>{STATUS_LABEL[e.status]}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="note mt-6">{list.length} of {engagements.length} engagements · nothing here is a proposal</p>

      {/* One plate, reused. Hidden from coarse pointers and from assistive tech. */}
      <div ref={plate} className="work-plate" aria-hidden>
        <div className={`work-plate-inner ${preview ? "is-on" : ""}`}>
          {preview && (
            <Image src={preview} alt="" fill sizes="340px" className="object-cover object-top" />
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { engagements, PROBLEM_TAGS, ProblemTag, STATUS_LABEL } from "@/content/facts";
import { track } from "@/lib/track";

/**
 * Explore by problem, not industry. Each tile has its own cover motif:
 * Fennec = floor plan, Uniserve = ticket path, Palapa = tip split,
 * Political campaign = record reconciliation, B-Side = three-venue stock count.
 */
const TAGS = Object.keys(PROBLEM_TAGS) as ProblemTag[];

export function WorkGrid() {
  const [tag, setTag] = useState<ProblemTag | null>(null);
  const list = useMemo(() => (tag ? engagements.filter((e) => e.fixes.includes(tag)) : engagements), [tag]);

  return (
    <div className="wrap">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="What are you trying to fix?">
        <span className="fig mr-2">What are you trying to fix?</span>
        <button type="button" onClick={() => setTag(null)} aria-pressed={tag === null} className={`chip !py-2 !px-3 min-h-[40px] cursor-pointer transition-colors ${tag === null ? "bg-paper !text-bg-0 border-paper" : "hover:border-paper/40"}`}>All</button>
        {TAGS.map((t) => (
          <button key={t} type="button" onClick={() => { setTag(t); track("work_category_selected", { tag: t }); }} aria-pressed={tag === t} className={`chip !py-2 !px-3 min-h-[40px] cursor-pointer transition-colors ${tag === t ? "bg-paper !text-bg-0 border-paper" : "hover:border-paper/40"}`}>
            {PROBLEM_TAGS[t]}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2" aria-live="polite">
        {list.map((e, i) => (
          <li key={e.slug} className={e.flagship ? "md:col-span-2" : ""}>
            <Link href={e.href} className="group glass block overflow-hidden hover:border-signal/40 transition-colors" data-cursor="view" onClick={() => track("case_study_view", { slug: e.slug })}>
              <div className={`grid ${e.flagship ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3">
                    <span className="fig">{String(i + 1).padStart(2, "0")} · {e.sector}</span>
                    <span className={`chip chip-${e.status}`}>{STATUS_LABEL[e.status]}</span>
                  </div>
                  <h2 className="display display-md text-paper mt-4 [overflow-wrap:anywhere]">{e.client}</h2>
                  <p className="text-silver mt-3">{e.short}</p>
                  <p className="text-sm text-stone mt-4 line-clamp-3">{e.problem}</p>
                  <div className="mt-auto pt-6 flex flex-wrap gap-2">
                    {e.fixes.map((f) => (
                      <span key={f} className={`chip ${f === tag ? "text-signal-2 border-signal/40" : ""}`}>{PROBLEM_TAGS[f]}</span>
                    ))}
                  </div>
                </div>
                <div className={`relative ${e.flagship ? "min-h-[280px]" : "h-44"} flat !rounded-none border-0 border-t md:border-t-0 md:border-l hairline overflow-hidden`}>
                  <Cover slug={e.slug} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="fig mt-6">{list.length} of {engagements.length} engagements · nothing here is a proposal</p>
    </div>
  );
}

function Cover({ slug }: { slug: string }) {
  const common = "absolute inset-0 w-full h-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]";
  switch (slug) {
    case "fennec":
      return (
        <svg viewBox="0 0 600 300" className={common} aria-hidden>
          <rect x="60" y="30" width="480" height="240" rx="6" fill="#0d0e14" stroke="rgba(243,241,236,0.14)" />
          <rect x="220" y="38" width="160" height="22" rx="3" fill="#161925" />
          <rect x="500" y="90" width="30" height="120" rx="3" fill="#161925" />
          {[[130, 110], [220, 100], [310, 110], [400, 120], [130, 200], [220, 190], [310, 205], [400, 210]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="16" fill={["#3dbe8b", "#e0a458", "#7fa6ff", "#3dbe8b", "#7fa6ff", "#e0a458", "#3dbe8b", "#7fa6ff"][i]} fillOpacity="0.85" />
          ))}
          {[[130, 110], [220, 100], [310, 110], [400, 120]].map(([x, y], i) => <line key={i} x1={x} y1={y} x2="515" y2="150" stroke="#2f6bff" strokeOpacity="0.35" />)}
          <rect x="260" y="262" width="80" height="8" fill="#2f6bff" opacity="0.7" />
        </svg>
      );
    case "uniserve":
      return (
        <svg viewBox="0 0 600 300" className={common} aria-hidden>
          {["INBOUND", "MACHINE", "DRAFT · HELD", "GATE"].map((l, i) => (
            <g key={l}>
              <rect x={40 + i * 135} y="120" width="115" height="56" rx="6" fill={i === 3 ? "rgba(224,164,88,0.08)" : "rgba(20,23,32,0.9)"} stroke={i === 3 ? "rgba(224,164,88,0.6)" : "rgba(127,166,255,0.4)"} />
              <text x={97 + i * 135} y="152" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill={i === 3 ? "#e0a458" : "#b8bdc9"}>{l}</text>
              {i < 3 && <path d={`M${155 + i * 135} 148 h20`} stroke="#2f6bff" strokeWidth="1.5" />}
            </g>
          ))}
          <text x="300" y="220" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8a93a6">ALL DATA AND MODELS HOSTED IN CANADA</text>
        </svg>
      );
    case "palapa-tours":
      return (
        <svg viewBox="0 0 600 300" className={common} aria-hidden>
          <rect x="230" y="40" width="140" height="44" rx="6" fill="rgba(20,23,32,0.9)" stroke="rgba(127,166,255,0.4)" />
          <text x="300" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill="#b8bdc9">GRATUITY POOL</text>
          {[["BAR", "40%"], ["DECK", "35%"], ["HELM", "15%"], ["DOCK", "10%"]].map(([r, p], i) => (
            <g key={r}>
              <path d={`M300 84 C300 140, ${90 + i * 140} 140, ${90 + i * 140} 190`} stroke="#2f6bff" strokeOpacity="0.6" fill="none" />
              <rect x={40 + i * 140} y="190" width="100" height="56" rx="6" fill="rgba(20,23,32,0.9)" stroke="rgba(61,190,139,0.4)" />
              <text x={90 + i * 140} y="214" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill="#b8bdc9">{r}</text>
              <text x={90 + i * 140} y="234" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="#3dbe8b">{p}</text>
            </g>
          ))}
          <text x="300" y="280" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="#8a93a6">PLACEHOLDER SPLIT · RULES SET ONCE BY THE OPERATOR</text>
        </svg>
      );
    case "political-campaign":
      return (
        <svg viewBox="0 0 600 300" className={common} aria-hidden>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="40" y={60 + i * 70} width="180" height="44" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.1)" />
              <text x="56" y={87 + i * 70} fontFamily="var(--font-mono)" fontSize="10" fill="#8a93a6">{["J. Smith · 12 Main St", "Jon Smith · 12 Main", "SMITH, J · Main St (old)"][i]}</text>
              <path d={`M220 ${82 + i * 70} C 300 ${82 + i * 70}, 320 150, 380 150`} stroke="#2f6bff" strokeOpacity="0.6" fill="none" />
            </g>
          ))}
          <rect x="380" y="122" width="180" height="56" rx="6" fill="rgba(20,23,32,0.9)" stroke="rgba(127,166,255,0.5)" />
          <text x="470" y="146" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill="#f3f1ec">ONE RECORD</text>
          <text x="470" y="165" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#3dbe8b">CONFIDENCE 0.92</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 600 300" className={common} aria-hidden>
          {["VENUE 1", "VENUE 2", "VENUE 3"].map((v, i) => (
            <g key={v}>
              <rect x={60 + i * 170} y="60" width="140" height="70" rx="6" fill="#10121a" stroke="rgba(243,241,236,0.1)" />
              <text x={130 + i * 170} y="90" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill="#b8bdc9">{v}</text>
              <text x={130 + i * 170} y="112" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="#8a93a6">STOCK COUNT · PER SITE</text>
              <path d={`M${130 + i * 170} 130 V 190`} stroke="#2f6bff" strokeOpacity="0.6" />
            </g>
          ))}
          <rect x="60" y="190" width="480" height="50" rx="6" fill="rgba(20,23,32,0.9)" stroke="rgba(127,166,255,0.4)" />
          <text x="300" y="220" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.5" fill="#f3f1ec">ONE CATALOGUE · BOUGHT VS SOLD · REORDER POINTS</text>
        </svg>
      );
  }
}

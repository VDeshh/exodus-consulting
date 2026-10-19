"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SIGNATURE 02 — YOU BECAME THE INTEGRATION.
 * Eight systems, one person. Toggle BEFORE / AFTER: before, every system routes
 * through the person (data mover). After, the systems route through the
 * operating layer and the person gets one line (decision maker).
 * Illustrative workflow, labelled as such.
 */

const SYSTEMS = ["CRM", "EMAIL", "POS", "CALENDAR", "SPREADSHEET", "ACCOUNTING", "INVENTORY", "SUPPORT"];
const C = { x: 300, y: 190 };
const R = 150;
const LAYER = { x: 90, y: 300, w: 420, h: 40 };

const pos = (i: number) => {
  const a = (i / SYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C.x + Math.cos(a) * R * 1.55, y: C.y + Math.sin(a) * R * 0.78 };
};

const SENTENCES = [
  ["The same numbers get retyped into three systems", "A booking is entered once by the guest, once by the host and once again at close. Two of those are unpaid data entry."],
  ["A web lead sits until tomorrow morning", "Contacting a web lead inside an hour made firms about 7 times more likely to qualify it than waiting an hour longer. Harvard Business Review, 2011."],
  ["Support answers the same questions every week", "A high volume of repeat questions arrives through the support channels at Uniserve. Most already have an answer written down somewhere the customer could not find."],
];

export function Integration() {
  const [after, setAfter] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { duration: 0.6, ease: "power2.inOut" } });
      if (after) {
        tl.to(q(".to-person"), { opacity: 0, duration: 0.3 }, 0)
          .to(q(".layer"), { opacity: 1, y: 0 }, 0.1)
          .to(q(".to-layer"), { opacity: 1, stagger: 0.04 }, 0.2)
          .to(q(".person"), { y: -60 }, 0.2)
          .to(q(".riser"), { opacity: 1 }, 0.6)
          .to(q(".ring"), { stroke: "#e0a458" }, 0.6)
          .set(q(".role"), { textContent: "DECISION MAKER", fill: "#e0a458" }, 0.6);
      } else {
        tl.to(q(".to-layer, .riser"), { opacity: 0, duration: 0.3 }, 0)
          .to(q(".layer"), { opacity: 0, y: 20 }, 0)
          .to(q(".person"), { y: 0 }, 0.1)
          .to(q(".to-person"), { opacity: 1, stagger: 0.04 }, 0.2)
          .to(q(".ring"), { stroke: "#f3f1ec" }, 0.2)
          .set(q(".role"), { textContent: "DATA MOVER", fill: "#8a93a6" }, 0.2);
      }
    },
    { scope: root, dependencies: [after] },
  );

  return (
    <section className="section" aria-labelledby="integ-h2">
      <div className="wrap grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
        <Reveal>
          <p className="fig" data-reveal><b>The human integration</b></p>
          <h2 id="integ-h2" className="display display-lg text-paper mt-4" data-reveal>
            Your team should not be the API.
          </h2>
          <p className="lede mt-6" data-reveal>
            Every system sends its data to a person. The person moves it into the next system. More systems arrive. Eventually everything routes through the human, and the human is the only thing holding the operation together.
          </p>
          <p className="mt-6 body-2 max-w-xl" data-reveal>Owners do not call us about AI. They call us about three sentences.</p>
          <ol className="mt-6 space-y-5 max-w-xl">
            {SENTENCES.map(([h, t], i) => (
              <li key={h} className="grid grid-cols-[2.5rem_1fr] gap-3" data-reveal>
                <span className="mono text-signal-2 pt-1">0{i + 1}</span>
                <div>
                  <p className="text-paper font-medium">{h}</p>
                  <p className="text-sm text-stone mt-1">{t}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div ref={root} className="glass p-4 md:p-6" data-cursor="explore">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="fig"><b>Fig. 02</b> · Where the data goes</div>
            <div role="group" aria-label="Before or after Exodus" className="inline-flex rounded-md border hairline p-0.5">
              {[false, true].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={after === v}
                  onClick={() => setAfter(v)}
                  className={`mono px-3 py-2 rounded-[5px] min-h-[40px] transition-colors ${after === v ? "bg-paper text-bg-0" : "text-silver hover:text-paper"}`}
                >
                  {v ? "After Exodus" : "Before Exodus"}
                </button>
              ))}
            </div>
          </div>

          <svg viewBox="0 0 600 380" className="w-full mt-4" role="img" aria-label={after ? "After: eight systems route through the Exodus operating layer; one line reaches the person, who is now the decision maker." : "Before: eight systems each send data to one person, who moves it manually into the next system."}>
            {/* Operating layer */}
            <g className="layer" style={{ opacity: 0 }}>
              <rect x={LAYER.x} y={LAYER.y} width={LAYER.w} height={LAYER.h} rx="6" fill="rgba(20,23,32,0.7)" stroke="rgba(127,166,255,0.4)" />
              <text x={LAYER.x + 12} y={LAYER.y + 25} fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5" fill="#7fa6ff">EXODUS · OPERATING LAYER</text>
              <text x={LAYER.x + LAYER.w - 12} y={LAYER.y + 25} textAnchor="end" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="1.5" fill="#8a93a6">CONNECTED · AUTOMATED</text>
            </g>
            {SYSTEMS.map((s, i) => {
              const p = pos(i);
              const lx = LAYER.x + 30 + (i / (SYSTEMS.length - 1)) * (LAYER.w - 60);
              return (
                <g key={s}>
                  <line className="to-person" x1={p.x} y1={p.y} x2={C.x} y2={C.y} stroke="#8a93a6" strokeOpacity="0.7" strokeWidth="1" />
                  <path className="to-layer" d={`M${p.x} ${p.y} C ${p.x} ${LAYER.y - 40}, ${lx} ${LAYER.y - 60}, ${lx} ${LAYER.y}`} stroke="#2f6bff" strokeOpacity="0.8" strokeWidth="1" fill="none" style={{ opacity: 0 }} />
                  <rect x={p.x - 52} y={p.y - 13} width="104" height="26" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.08)" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="1.5" fill="#b8bdc9">{s}</text>
                </g>
              );
            })}
            <path className="riser" d={`M${C.x} ${LAYER.y} V ${C.y - 60 + 28}`} stroke="#e0a458" strokeWidth="1.5" style={{ opacity: 0 }} />
            <g className="person">
              <circle className="ring" cx={C.x} cy={C.y} r="26" stroke="#f3f1ec" strokeWidth="1.5" fill="#0a0b0f" />
              <circle cx={C.x} cy={C.y - 7} r="6" fill="#f3f1ec" />
              <path d={`M${C.x - 12} ${C.y + 14} a12 12 0 0 1 24 0z`} fill="#f3f1ec" />
              <text className="role" x={C.x} y={C.y - 38} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2" fill="#8a93a6">DATA MOVER</text>
            </g>
          </svg>
          <p className="fig mt-3">Illustrative workflow, not a client diagram.</p>
        </div>
      </div>
    </section>
  );
}

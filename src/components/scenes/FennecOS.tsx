"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE } from "@/lib/gsap";
import { fennecEventCompanies, fennecVenues } from "@/content/facts";

/**
 * SIGNATURE 07 — FENNEC OPERATING SYSTEM.
 * A venue on a Saturday: five tools, five versions of the same night.
 * Fennec collapses them into one record. The diagram then becomes the
 * real product: the operator floor plan editor, a live screenshot.
 */

const TOOLS = [
  { k: "Floor plan", v: "a drawing, on paper or in a design file", at: [80, 90] },
  { k: "Tickets", v: "a third-party page that knows the sale, not the seat", at: [80, 250] },
  { k: "Guestlist", v: "a spreadsheet, or a text thread, stale by midnight", at: [80, 410] },
  { k: "Bar POS", v: "a till that has never heard of the table", at: [860, 130] },
  { k: "Marketing", v: "a separate address book of last Friday's guests", at: [860, 370] },
];
const MODULES = ["Events & floor", "Ticketing & guests", "POS & payments", "Inventory", "Staff", "Media", "Intelligence"];
const ROOM = { x: 300, y: 70, w: 400, h: 400 };
const TABLES: [number, number, string][] = [
  [370, 180, "T1"], [470, 170, "T2"], [570, 180, "T3"], [640, 260, "T4"],
  [360, 300, "T5"], [470, 290, "T6"], [570, 310, "T7"], [400, 400, "T8"], [520, 410, "T9"],
];
const STATUS = ["#3dbe8b", "#e0a458", "#7fa6ff", "#3dbe8b", "#7fa6ff", "#e0a458", "#3dbe8b", "#7fa6ff", "#3dbe8b"];

export function FennecOS() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const finalState = () => {
        gsap.set(q(".fx-tool, .fx-fric"), { opacity: 0 });
        gsap.set(q(".fx-os, .fx-rail, .fx-mod, .fx-link"), { opacity: 1 });
        gsap.set(q(".fx-table"), { fill: (i: number) => STATUS[i], fillOpacity: 0.9 });
        gsap.set(q(".fx-diagram"), { opacity: 0 });
        gsap.set(q(".fx-shot"), { opacity: 1 });
        gsap.set(q(".fx-final > *"), { opacity: 1, y: 0 });
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        gsap.set(q(".fx-os, .fx-rail, .fx-link, .fx-shot"), { opacity: 0 });
        gsap.set(q(".fx-mod"), { opacity: 0, y: 10 });
        gsap.set(q(".fx-final > *"), { opacity: 0, y: 16 });
        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=240%", scrub: 0.6, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });
        // 1 five tools argue about one night
        tl.to(q(".fx-fric"), { strokeDashoffset: -60, duration: 1.2, ease: "none" }, 0);
        // 2 Fennec OS envelops the room
        tl.to(q(".fx-fric"), { opacity: 0, duration: 0.4 }, 1.0);
        tl.to(q(".fx-tool"), { opacity: 0, x: (i: number) => (i < 3 ? -40 : 40), duration: 0.5, stagger: 0.05 }, 1.0);
        tl.to(q(".fx-os"), { opacity: 1, duration: 0.6 }, 1.2);
        tl.to(q(".fx-rail"), { opacity: 1, duration: 0.4 }, 1.5);
        tl.to(q(".fx-mod"), { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, 1.6);
        // 3 the room comes alive: one record of the night
        tl.to(q(".fx-table"), { fill: (i: number) => STATUS[i], fillOpacity: 0.9, duration: 0.3, stagger: 0.06 }, 2.2);
        tl.to(q(".fx-link"), { opacity: 1, duration: 0.3, stagger: 0.05 }, 2.4);
        // 4 the diagram becomes the real product
        tl.to(q(".fx-diagram"), { opacity: 0, duration: 0.5 }, 3.4);
        tl.to(q(".fx-shot"), { opacity: 1, duration: 0.6 }, 3.5);
        tl.to(q(".fx-final > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 3.8);
        tl.to({}, { duration: 0.8 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => finalState());
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="fx-h2" className="relative border-t hairline">
      <div ref={pin} className="relative lg:min-h-[100dvh] overflow-hidden">
        <div className="wrap pt-[calc(var(--nav-h)+1.5rem)] pb-10 lg:h-[100dvh] grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div className="relative z-10">
            <p className="fig"><b>Fennec</b> · <span className="text-advance">Live</span></p>
            <h2 id="fx-h2" className="display display-lg text-paper mt-4">One system running the room, the door and the bar.</h2>
            <p className="lede mt-6">
              A venue does not need five tools. It needs one record of the night. Fennec is the operating system we co-founded and still build: floor plans, live ops, ticketing, guest CRM, bottle service, inventory, campaigns and analytics, off one set of records that every surface reads at the same time.
            </p>
            <div className="fx-final mt-6">
              <p className="display display-sm text-paper">Not an automation. A full operating system, in production tonight.</p>
              <p className="mt-3 body-2 max-w-md">Live at {fennecVenues.join(", ")}, with {fennecEventCompanies} event companies publishing on the network. Two-way POS sync with Square, Toast and Lightspeed.</p>
              <Link href="/work/fennec/" className="btn btn-ghost mt-6" data-cursor="view">Read the Fennec study</Link>
            </div>
          </div>

          <div className="relative" aria-hidden data-cursor="inspect">
            <div className="relative w-full max-lg:!aspect-[4/3]" style={{ aspectRatio: "1000 / 560" }}>
              {/* real product */}
              <div className="fx-shot absolute inset-0 glass overflow-hidden">
                <Image src="/work/floorplan-editor.webp" alt="" fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-left-top" />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-bg-0/95 to-transparent">
                  <p className="fig"><b>Live product</b> · operator floor plan editor · each table carries a label, section, capacity, fee and its own QR code</p>
                </div>
              </div>
              {/* diagram */}
              <svg viewBox="0 0 1000 560" className="fx-diagram absolute inset-0 w-full h-full">
                {/* Fennec OS layer */}
                <rect className="fx-os" x={ROOM.x - 40} y={ROOM.y - 40} width={ROOM.w + 80} height={ROOM.h + 80} rx="14" fill="rgba(20,23,32,0.7)" stroke="rgba(127,166,255,0.4)" />
                <text className="fx-os" x={ROOM.x - 24} y={ROOM.y - 18} fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="#7fa6ff">FENNEC OS · ONE RECORD OF THE NIGHT</text>
                {/* room */}
                <rect x={ROOM.x} y={ROOM.y} width={ROOM.w} height={ROOM.h} rx="6" fill="#0d0e14" stroke="rgba(243,241,236,0.16)" />
                <rect x={ROOM.x + 110} y={ROOM.y + 10} width="180" height="34" rx="3" fill="#161925" stroke="rgba(243,241,236,0.12)" />
                <text x={ROOM.x + 200} y={ROOM.y + 32} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8a93a6">STAGE</text>
                <rect x={ROOM.x + ROOM.w - 60} y={ROOM.y + 110} width="44" height="200" rx="3" fill="#161925" stroke="rgba(243,241,236,0.12)" />
                <text x={ROOM.x + ROOM.w - 38} y={ROOM.y + 215} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8a93a6" transform={`rotate(-90 ${ROOM.x + ROOM.w - 38} ${ROOM.y + 215})`}>BAR</text>
                <rect x={ROOM.x + 160} y={ROOM.y + ROOM.h - 8} width="80" height="8" fill="#2f6bff" opacity="0.7" />
                <text x={ROOM.x + 200} y={ROOM.y + ROOM.h + 20} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#8a93a6">DOOR · SCANNER</text>
                {/* links inside: table ↔ bar ↔ guest */}
                {TABLES.map(([x, y], i) => (
                  <line key={i} className="fx-link" x1={x} y1={y} x2={ROOM.x + ROOM.w - 38} y2={ROOM.y + 210} stroke="#2f6bff" strokeOpacity="0.35" strokeWidth="1" />
                ))}
                {TABLES.map(([x, y, t], i) => (
                  <g key={t}>
                    <circle className="fx-table" cx={x} cy={y} r="22" fill="#161925" stroke="rgba(243,241,236,0.2)" />
                    <text x={x} y={y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill={i % 2 ? "#f3f1ec" : "#f3f1ec"}>{t}</text>
                  </g>
                ))}
                {/* the five tools and their friction lines */}
                {TOOLS.map((t, i) => {
                  const target = [ROOM.x + (i < 3 ? 40 : ROOM.w - 40), ROOM.y + 60 + i * 70];
                  return (
                    <g key={t.k}>
                      <line className="fx-fric" x1={t.at[0] + (i < 3 ? 190 : 0)} y1={t.at[1] + 24} x2={target[0]} y2={target[1]} stroke="#d9534f" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="4 6" />
                      <g className="fx-tool">
                        <rect x={t.at[0]} y={t.at[1]} width="190" height="48" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.08)" />
                        <text x={t.at[0] + 12} y={t.at[1] + 19} fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.5" fill="#f3f1ec">{t.k.toUpperCase()}</text>
                        <text x={t.at[0] + 12} y={t.at[1] + 36} fontFamily="var(--font-mono)" fontSize="8.5" fill="#8a93a6">{t.v}</text>
                      </g>
                    </g>
                  );
                })}
                {/* module rail */}
                <g className="fx-rail">
                  <rect x="60" y="500" width="880" height="44" rx="6" fill="rgba(20,23,32,0.7)" stroke="rgba(127,166,255,0.3)" />
                </g>
                {MODULES.map((m, i) => (
                  <g key={m} className="fx-mod">
                    <text x={60 + 20 + i * 124} y="527" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1" fill="#b8bdc9">{m.toUpperCase()}</text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="fig mt-2"><b>Fig. 08</b> · Five tools, five versions of the same night. Then one.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

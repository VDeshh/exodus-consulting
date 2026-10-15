"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE } from "@/lib/gsap";
import { site } from "@/lib/site";

/**
 * SIGNATURE 04 — OPERATIONS AUDIT X-RAY.
 * A business is a black box: inputs in, outputs out. The audit makes the box
 * transparent. Inside: people moving data, duplicate systems, repeat work.
 * Friction points light up. "Now we know what to build."
 */

const INPUTS = ["LEADS", "ORDERS", "CALLS", "PAYMENTS", "CUSTOMERS", "REQUESTS"];
const OUTPUTS = ["SALES", "SERVICE", "REPORTS", "PAYMENTS"];
const BOX = { x: 300, y: 90, w: 400, h: 420 };

const INSIDE = [
  { x: 380, y: 170, kind: "person", label: "Host" },
  { x: 520, y: 150, kind: "sheet", label: "Bookings.xlsx" },
  { x: 640, y: 200, kind: "sys", label: "POS" },
  { x: 370, y: 300, kind: "sys", label: "Inbox" },
  { x: 500, y: 290, kind: "person", label: "Owner" },
  { x: 630, y: 330, kind: "sheet", label: "Report v7" },
  { x: 400, y: 430, kind: "sys", label: "Accounting" },
  { x: 560, y: 440, kind: "sheet", label: "Tips.xlsx" },
];
const LINKS: [number, number][] = [[0, 1], [1, 2], [0, 3], [3, 4], [4, 5], [2, 5], [4, 6], [6, 7], [5, 7], [1, 4]];

const FRICTION = [
  { at: [450, 160], tag: "MANUAL HANDOFF", sub: "duplicate entry" },
  { at: [585, 175], tag: "REPEAT TASK", sub: "automation opportunity" },
  { at: [435, 295], tag: "WAITING", sub: "customer delay" },
  { at: [565, 310], tag: "DATA GAP", sub: "missing visibility" },
  { at: [480, 435], tag: "REVENUE LEAK", sub: "missed follow-up" },
];

export function AuditXray() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const finalState = () => {
        gsap.set(q(".box-fill"), { fillOpacity: 0.18 });
        gsap.set(q(".box-label"), { opacity: 0 });
        gsap.set(q(".inside, .link, .fric"), { opacity: 1 });
        gsap.set(q(".ax-a"), { opacity: 0 });
        gsap.set(q(".ax-final > *"), { opacity: 1, y: 0 });
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        gsap.set(q(".inside, .link, .fric"), { opacity: 0 });
        gsap.set(q(".ax-final > *"), { opacity: 0, y: 16 });
        const flows = q(".flow-in, .flow-out");
        flows.forEach((el) => gsap.set(el, { strokeDasharray: "6 8" }));

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=320%", scrub: 0.6, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });
        // inputs and outputs flow
        tl.to(flows, { strokeDashoffset: -140, duration: 2.0, ease: "none" }, 0);
        // the box goes transparent
        tl.to(q(".box-fill"), { fillOpacity: 0.18, duration: 0.8 }, 1.0);
        tl.to(q(".box-label"), { opacity: 0, duration: 0.4 }, 1.0);
        tl.to(q(".ax-a"), { opacity: 0, duration: 0.4 }, 1.0);
        tl.to(q(".inside"), { opacity: 1, duration: 0.4, stagger: 0.08 }, 1.4);
        tl.to(q(".link"), { opacity: 1, duration: 0.3, stagger: 0.05 }, 1.8);
        // friction lights up
        tl.to(q(".fric"), { opacity: 1, duration: 0.4, stagger: 0.18, ease: "power2.out" }, 2.6);
        tl.to(q(".fric-dot"), { scale: 1.6, transformOrigin: "center", duration: 0.3, yoyo: true, repeat: 1, stagger: 0.18 }, 2.6);
        // now we know what to build
        tl.to(q(".ax-final > *"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 3.8);
        tl.to({}, { duration: 0.8 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => finalState());
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="ax-h2" className="relative border-t hairline">
      <div ref={pin} className="relative lg:min-h-[100dvh] overflow-hidden">
        <div className="wrap pt-[calc(var(--nav-h)+1.5rem)] pb-10 lg:h-[100dvh] grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div className="relative z-10">
            <p className="fig"><b>04</b> · Exodus</p>
            <h2 id="ax-h2" className="display display-lg text-paper mt-4">See how your business actually runs.</h2>
            <p className="lede mt-6">
              The first call is a free operations audit. You walk us through the workflow that hurts most, we put your own hours and hourly rate against it while you watch, and you leave with a map of where the time and the money leak.
            </p>
            <p className="ax-a mt-4 body-2">Most businesses are a black box, even to the people running them. Inputs go in. Outputs come out. Nobody can see the eleven manual steps in between.</p>
            <div className="ax-final mt-6">
              <p className="display display-sm text-paper">Now we know what to build.</p>
              <p className="mt-3 body-2 max-w-md">Thirty minutes. No demo, no slide deck, no requirements questionnaire. One workflow, then the numbers behind it. The map is yours whether or not you hire us.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book the audit call</a>
                <span className="mono text-stone self-center">30 minutes · free · a founder answers</span>
              </div>
            </div>
          </div>

          <div className="lg:hidden grid gap-3" aria-hidden>
            <div className="flex flex-wrap gap-1.5">{INPUTS.map((s) => <span key={s} className="chip">{s}</span>)}<span className="mono text-stone self-center px-1">→ your business →</span>{OUTPUTS.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            <ul className="glass p-4 grid gap-3">
              {FRICTION.map((f) => (
                <li key={f.tag} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-human shrink-0" />
                  <div><p className="mono text-human">{f.tag}</p><p className="text-sm text-silver">{f.sub}</p></div>
                </li>
              ))}
            </ul>
            <p className="fig"><b>Fig. 04</b> · Illustrative operations map. Yours is drawn on the call.</p>
          </div>

          <div className="relative hidden lg:block" aria-hidden data-cursor="explore">
            <svg viewBox="0 0 1000 600" className="w-full h-auto max-h-[78dvh]">
              {/* inputs */}
              {INPUTS.map((s, i) => {
                const y = 130 + i * 68;
                return (
                  <g key={s}>
                    <rect x="40" y={y - 13} width="130" height="26" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.08)" />
                    <text x="105" y={y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.5" fill="#b8bdc9">{s}</text>
                    <path className="flow-in" d={`M170 ${y} C 230 ${y}, 240 ${BOX.y + 60 + i * 55}, ${BOX.x} ${BOX.y + 60 + i * 55}`} stroke="#8a93a6" strokeOpacity="0.6" strokeWidth="1" fill="none" />
                  </g>
                );
              })}
              {/* outputs */}
              {OUTPUTS.map((s, i) => {
                const y = 170 + i * 90;
                return (
                  <g key={s}>
                    <path className="flow-out" d={`M${BOX.x + BOX.w} ${BOX.y + 80 + i * 90} C 760 ${BOX.y + 80 + i * 90}, 770 ${y}, 830 ${y}`} stroke="#8a93a6" strokeOpacity="0.6" strokeWidth="1" fill="none" />
                    <rect x="830" y={y - 13} width="130" height="26" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.08)" />
                    <text x="895" y={y + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.5" fill="#b8bdc9">{s}</text>
                  </g>
                );
              })}
              {/* the box */}
              <rect className="box-fill" x={BOX.x} y={BOX.y} width={BOX.w} height={BOX.h} rx="10" fill="#10121a" fillOpacity="1" stroke="rgba(243,241,236,0.14)" />
              <text className="box-label" x={BOX.x + BOX.w / 2} y={BOX.y + BOX.h / 2} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="3" fill="#8a93a6">YOUR BUSINESS</text>
              {/* inside */}
              {LINKS.map(([a, b], i) => (
                <line key={i} className="link" x1={INSIDE[a].x} y1={INSIDE[a].y} x2={INSIDE[b].x} y2={INSIDE[b].y} stroke="#d9534f" strokeOpacity="0.45" strokeWidth="1" />
              ))}
              {INSIDE.map((n) => (
                <g key={n.label} className="inside">
                  {n.kind === "person" ? (
                    <>
                      <circle cx={n.x} cy={n.y} r="16" fill="#0a0b0f" stroke="#f3f1ec" strokeWidth="1.2" />
                      <circle cx={n.x} cy={n.y - 4} r="4" fill="#f3f1ec" />
                      <path d={`M${n.x - 8} ${n.y + 9} a8 8 0 0 1 16 0z`} fill="#f3f1ec" />
                    </>
                  ) : n.kind === "sheet" ? (
                    <rect x={n.x - 16} y={n.y - 12} width="32" height="24" rx="2" fill="#0a0b0f" stroke="#3dbe8b" strokeOpacity="0.6" strokeWidth="1.2" />
                  ) : (
                    <rect x={n.x - 16} y={n.y - 12} width="32" height="24" rx="6" fill="#0a0b0f" stroke="#7fa6ff" strokeOpacity="0.7" strokeWidth="1.2" />
                  )}
                  <text x={n.x} y={n.y + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1" fill="#8a93a6">{n.label.toUpperCase()}</text>
                </g>
              ))}
              {FRICTION.map((f) => (
                <g key={f.tag} className="fric">
                  <circle className="fric-dot" cx={f.at[0]} cy={f.at[1]} r="5" fill="#e0a458" />
                  <circle cx={f.at[0]} cy={f.at[1]} r="11" fill="none" stroke="#e0a458" strokeOpacity="0.4" />
                  <rect x={f.at[0] + 14} y={f.at[1] - 15} width={f.tag.length * 7.6 + 16} height="30" rx="3" fill="rgba(10,11,15,0.9)" stroke="rgba(224,164,88,0.4)" />
                  <text x={f.at[0] + 22} y={f.at[1] - 3} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.5" fill="#e0a458">{f.tag}</text>
                  <text x={f.at[0] + 22} y={f.at[1] + 9} fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="0.5" fill="#8a93a6">{f.sub}</text>
                </g>
              ))}
            </svg>
            <p className="fig mt-2"><b>Fig. 04</b> · Illustrative operations map. Yours is drawn on the call.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

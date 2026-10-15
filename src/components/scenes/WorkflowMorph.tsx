"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE } from "@/lib/gsap";

/**
 * SIGNATURE 05 — WORKFLOW → SOFTWARE.
 * The Palapa Tours tip-out, as it really went: an end-of-shift note becomes
 * fields, the fields become rules, the rules become the interface.
 * Roles and percentages are placeholders, as on the live case study.
 */

const NOTE = ["cruise 3 · sat", "cash tips 412", "card tips 1,236", "bar — 40%?", "deck 35", "captain 15 · dock 10", "who was on? ask Sam", "recount tomorrow"];
const FIELDS = ["CRUISE", "CASH TIPS", "CARD TIPS", "ROLES", "SPLIT RULES", "STAFF ON SAILING"];
const LOGIC = [
  ["Input", "Cruise closes. Sales and gratuities totalled."],
  ["Pool", "One gratuity pool for the sailing."],
  ["Rules", "Fixed split by role, set once."],
  ["Output", "Tracked payout per staff member."],
];
const ROLES = [["Bar", "40%"], ["Deck and service", "35%"], ["Captain and helm", "15%"], ["Dock and turnaround", "10%"]];

export function WorkflowMorph() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const finalState = () => {
        gsap.set(q(".note, .fields, .logic"), { opacity: 0 });
        gsap.set(q(".app"), { opacity: 1, y: 0 });
        gsap.set(q(".app > *"), { opacity: 1, y: 0 });
        gsap.set(q(".wm-final > *"), { opacity: 1, y: 0 });
        gsap.set(q(".wm-cap"), { textContent: "The interface" });
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        const cap = q(".wm-cap")[0] as HTMLElement;
        gsap.set(q(".fields, .logic, .app"), { opacity: 0 });
        gsap.set(q(".field"), { opacity: 0, x: -40 });
        gsap.set(q(".logic-step"), { opacity: 0, y: 20 });
        gsap.set(q(".app > *"), { opacity: 0, y: 14 });
        gsap.set(q(".wm-final > *"), { opacity: 0, y: 16 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=340%", scrub: 0.6, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });
        // 1 the note
        tl.to(q(".note-line"), { color: "#f3f1ec", duration: 0.2, stagger: 0.1 }, 0);
        // 2 fields extracted
        tl.call(() => { cap.textContent = "Data fields extracted"; }, [], 1.0);
        tl.to(q(".note"), { opacity: 0.25, x: -30, rotate: -6, duration: 0.6 }, 1.0);
        tl.to(q(".fields"), { opacity: 1, duration: 0.2 }, 1.0);
        tl.to(q(".field"), { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, 1.1);
        // 3 workflow logic
        tl.call(() => { cap.textContent = "Workflow logic"; }, [], 2.0);
        tl.to(q(".note"), { opacity: 0, duration: 0.3 }, 2.0);
        tl.to(q(".fields"), { x: -60, opacity: 0.35, duration: 0.6 }, 2.0);
        tl.to(q(".logic"), { opacity: 1, duration: 0.2 }, 2.0);
        tl.to(q(".logic-step"), { opacity: 1, y: 0, duration: 0.4, stagger: 0.15 }, 2.1);
        tl.to(q(".logic-arrow"), { strokeDashoffset: 0, duration: 0.6 }, 2.4);
        // 4 the interface assembles
        tl.call(() => { cap.textContent = "The interface"; }, [], 3.2);
        tl.to(q(".fields, .logic"), { opacity: 0, duration: 0.4 }, 3.2);
        tl.fromTo(q(".app"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6 }, 3.3);
        tl.to(q(".app > *"), { opacity: 1, y: 0, duration: 0.35, stagger: 0.1 }, 3.5);
        tl.to(q(".wm-final > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 4.3);
        tl.to({}, { duration: 0.8 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => finalState());
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="wm-h2" className="relative border-t hairline">
      <div ref={pin} className="relative lg:min-h-[100dvh] overflow-hidden">
        <div className="wrap pt-[calc(var(--nav-h)+1.5rem)] pb-10 lg:h-[100dvh] grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
          <div className="relative z-10">
            <p className="fig"><b>Custom software</b> · Palapa Tours Ottawa · Shipped</p>
            <h2 id="wm-h2" className="display display-lg text-paper mt-4">Software should come from the workflow.</h2>
            <p className="lede mt-6">
              Not the other way around. On a floating tiki-bar cruise the tip-out was worked out by hand after a long shift, and the split moved depending on who did the arithmetic. The fix was not a bigger spreadsheet. It was making the rule the only thing that decides the number.
            </p>
            <div className="wm-final mt-6">
              <p className="display display-sm text-paper">Small problem. Real operational impact.</p>
              <p className="mt-3 body-2 max-w-md">Consistent payouts. Transparent logic. A question about last weekend has an answer instead of an argument. The client owns the code.</p>
              <Link href="/work/palapa-tours/" className="btn btn-ghost mt-6" data-cursor="view">Read the Palapa study</Link>
            </div>
          </div>

          <div className="relative lg:min-h-[60dvh] pt-6 lg:pt-0" aria-hidden data-cursor="explore">
            <p className="fig absolute left-0 -top-6"><b>Fig. 05</b> · <span className="wm-cap">The old way, after the boat came in</span></p>

            {/* 1 the note */}
            <div className="note flat absolute left-[8%] top-[10%] w-[300px] p-5 rotate-[-3deg] hidden lg:block" style={{ background: "#14161f" }}>
              <p className="mono text-friction/80 mb-3">end of shift · handwritten</p>
              {NOTE.map((l) => (
                <p key={l} className="note-line mono-lc text-[0.85rem] text-stone leading-7">{l}</p>
              ))}
            </div>

            {/* 2 fields */}
            <ul className="fields absolute left-[8%] top-[12%] space-y-2 hidden lg:block">
              {FIELDS.map((f) => (
                <li key={f} className="field glass px-3 py-2 mono text-signal-2 w-max">{f}</li>
              ))}
            </ul>

            {/* 3 logic */}
            <div className="logic absolute left-[36%] right-0 top-[18%] hidden lg:block">
              <svg viewBox="0 0 560 60" className="w-full h-12">
                <path className="logic-arrow" d="M20 30 H540" stroke="#2f6bff" strokeWidth="1.5" strokeDasharray="520" strokeDashoffset="520" />
              </svg>
              <div className="grid grid-cols-4 gap-3 -mt-2">
                {LOGIC.map(([h, t]) => (
                  <div key={h} className="logic-step glass p-3">
                    <p className="mono text-signal-2">{h}</p>
                    <p className="text-xs text-silver mt-1 leading-5">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 the interface */}
            <div className="app glass relative lg:absolute lg:inset-x-0 lg:top-[4%] lg:bottom-[6%] p-4 md:p-5 overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="text-paper font-medium">Tip-out · Cruise 3 · Saturday</p>
                <span className="chip chip-live"><span className="dot" /> recorded</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[["Cash tips", "$412.00"], ["Card tips", "$1,236.00"], ["Gratuity pool", "$1,648.00"]].map(([k, v]) => (
                  <div key={k} className="flat p-3">
                    <p className="fig">{k}</p>
                    <p className="tabular text-paper mt-1">{v}</p>
                  </div>
                ))}
              </div>
              <table className="w-full mt-4 text-sm">
                <thead>
                  <tr className="fig text-left">
                    <th className="py-2 font-medium">Role on the sailing</th>
                    <th className="py-2 font-medium">Share</th>
                    <th className="py-2 font-medium text-right">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {ROLES.map(([r, p]) => (
                    <tr key={r} className="border-t hairline">
                      <td className="py-2 text-silver">{r}</td>
                      <td className="py-2 tabular text-stone">{p}</td>
                      <td className="py-2 tabular text-paper text-right">${((1648 * parseInt(p)) / 100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="note mt-4">Rules set once by the operator · logged per cruise · placeholder roles and percentages, not Palapa&apos;s figures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

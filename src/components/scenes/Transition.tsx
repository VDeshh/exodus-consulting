"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE } from "@/lib/gsap";

/**
 * SIGNATURE 11 — THE EXODUS TRANSITION.
 * Split screen. Left, the old way: flat, opaque, a chain of manual steps.
 * Right, the new way: glass, connected. The divider starts at 90% old and
 * travels to 0% as the visitor scrolls. At 50% the worlds overlap.
 */

const OLD = ["Email", "Spreadsheet", "Manual follow-up", "Copy / paste", "Someone remembers", "Another spreadsheet", "Meeting", "Manual report", "Mistake", "Rework"];
const NEW = ["Connected data", "Automation", "Custom software", "AI where it pays", "Real-time visibility", "Human oversight", "Better operations"];

export function Transition() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      const split = { v: 90 };
      const apply = () => {
        const s = split.v;
        gsap.set(q(".old-pane"), { clipPath: `inset(0 ${100 - s}% 0 0)` });
        gsap.set(q(".new-pane"), { clipPath: `inset(0 0 0 ${s}%)` });
        gsap.set(q(".divider"), { left: `${s}%` });
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        apply();
        gsap.set(q(".tr-final > *"), { opacity: 0, y: 16 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=260%", scrub: 0.6, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });
        tl.to(split, { v: 0, duration: 3, onUpdate: apply }, 0);
        tl.to(q(".old-step"), { opacity: 0.25, duration: 2, stagger: 0.1 }, 0.4);
        tl.to(q(".new-step"), { opacity: 1, duration: 0.4, stagger: 0.25, ease: "power2.out" }, 0.3);
        tl.to(q(".new-link"), { strokeDashoffset: 0, duration: 0.4, stagger: 0.25 }, 0.5);
        tl.to(q(".tr-final > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 3.0);
        tl.to({}, { duration: 0.6 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => {
        split.v = 0;
        gsap.set(q(".new-step"), { opacity: 1 });
        gsap.set(q(".new-link"), { strokeDashoffset: 0 });
        gsap.set(q(".tr-final > *"), { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="tr-h2" className="relative border-t hairline">
      <div ref={pin} className="relative lg:min-h-[100dvh] overflow-hidden">
        <div className="wrap pt-[calc(var(--nav-h)+1.5rem)] pb-10 lg:h-[100dvh] flex flex-col">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-2xl">
              <p className="fig"><b>06</b> · The system</p>
              <h2 id="tr-h2" className="display display-md text-paper mt-3">Old way out. New way in.</h2>
            </div>
            <div className="tr-final max-w-md text-right hidden lg:block">
              <p className="text-paper font-medium">Software does sorting, summarising, drafting, reconciling.</p>
              <p className="text-silver">People do the exception, the price, the hire, the send.</p>
            </div>
          </div>

          {/* Desktop split stage */}
          <div className="relative flex-1 mt-8 hidden lg:block" aria-hidden>
            <div className="old-pane absolute inset-0 flat !rounded-xl p-8" style={{ background: "#0d0e14" }}>
              <p className="mono text-friction/80">The old way</p>
              <ol className="mt-5 grid grid-cols-5 gap-x-6 gap-y-3">
                {OLD.map((s, i) => (
                  <li key={s} className="old-step flat px-3 py-2 text-sm text-silver flex items-center gap-2">
                    <span className="mono text-stone">{String(i + 1).padStart(2, "0")}</span> {s}
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-lg text-stone text-sm">Ten steps, four systems, two spreadsheets and one person who remembers. Every hand-off is a place to lose the thread.</p>
              <dl className="absolute left-8 right-8 bottom-8 grid grid-cols-4 gap-6 border-t hairline pt-6">
                {[["10", "steps"], ["4", "systems"], ["2", "spreadsheets"], ["1", "person who remembers"]].map(([v, k]) => (
                  <div key={k}><dt className="fig">{k}</dt><dd className="display display-md tabular text-stone mt-1">{v}</dd></div>
                ))}
                <p className="fig col-span-4 -mt-2">Illustrative workflow, not a client figure.</p>
              </dl>
            </div>
            <div className="new-pane absolute inset-0 glass !rounded-xl p-8 grid-bg">
              <p className="mono text-advance">The new way</p>
              <div className="mt-5 relative">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 60" preserveAspectRatio="none">
                  {NEW.slice(0, -1).map((_, i) => (
                    <line key={i} className="new-link" x1={(i + 0.85) * 100} y1="30" x2={(i + 1.15) * 100} y2="30" stroke="#2f6bff" strokeWidth="1.5" strokeDasharray="30" strokeDashoffset="30" />
                  ))}
                </svg>
                <ol className="grid grid-cols-7 gap-3 relative">
                  {NEW.map((s, i) => (
                    <li key={s} className="new-step glass glass-2 px-3 py-3 text-sm text-paper text-center leading-5" style={{ opacity: 0 }}>
                      <span className="mono text-signal-2 block mb-1">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
              <p className="mt-8 max-w-lg text-silver text-sm">One record of the operation, every surface reading it at the same time. Automation takes the recurring work, AI takes the judgement-support, a person stays on the decisions.</p>
              <dl className="absolute left-8 right-8 bottom-8 grid grid-cols-4 gap-6 border-t hairline pt-6">
                {[["3", "steps"], ["1", "system"], ["1", "approval, by a person"], ["0", "re-typing"]].map(([v, k]) => (
                  <div key={k}><dt className="fig">{k}</dt><dd className="display display-md tabular text-paper mt-1">{v}</dd></div>
                ))}
                <p className="fig col-span-4 -mt-2">Illustrative workflow, not a client figure.</p>
              </dl>
            </div>
            <div className="divider absolute top-0 bottom-0 w-px bg-paper/60" style={{ left: "90%" }}>
              <span className="absolute -left-[5.5rem] top-1/2 -translate-y-1/2 mono text-stone bg-bg-0 px-2 py-1 rounded">old</span>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 mono text-advance bg-bg-0 px-2 py-1 rounded">new</span>
            </div>
          </div>

          {/* Mobile: stacked */}
          <div className="lg:hidden mt-8 grid gap-6">
            <div className="flat p-5">
              <p className="mono text-friction/80">The old way</p>
              <ol className="mt-4 grid grid-cols-2 gap-2">
                {OLD.map((s, i) => (
                  <li key={s} className="flat px-3 py-2 text-sm text-stone"><span className="mono mr-2">{String(i + 1).padStart(2, "0")}</span>{s}</li>
                ))}
              </ol>
            </div>
            <div className="glass p-5">
              <p className="mono text-advance">The new way</p>
              <ol className="mt-4 grid gap-2">
                {NEW.map((s, i) => (
                  <li key={s} className="glass glass-2 px-3 py-2 text-sm text-paper"><span className="mono text-signal-2 mr-2">{String(i + 1).padStart(2, "0")}</span>{s}</li>
                ))}
              </ol>
            </div>
            <div className="tr-final">
              <p className="text-paper font-medium">Software does sorting, summarising, drafting, reconciling.</p>
              <p className="text-silver">People do the exception, the price, the hire, the send.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

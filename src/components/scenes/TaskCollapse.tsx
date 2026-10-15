"use client";

import { useMemo, useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE, seeded } from "@/lib/gsap";
import { stats } from "@/content/facts";

/**
 * SIGNATURE 03 — MANUAL TASK COLLAPSE.
 * A day of tiny tasks accumulates 08:00 → 16:00. The repeatable ones group
 * into five automation flows and collapse. The judgement calls stay with people.
 * "Software does sorting, summarising, drafting, reconciling. People do the
 * exception, the price, the hire, the send." (live site)
 */

const FLOWS = [
  { name: "Reporting", verbs: ["EXPORT", "COMBINE", "REPORT"] },
  { name: "Follow-up", verbs: ["FOLLOW UP", "REMIND", "CHASE"] },
  { name: "Reconciliation", verbs: ["RECONCILE", "CHECK", "MATCH"] },
  { name: "Data entry", verbs: ["COPY", "PASTE", "RE-TYPE"] },
  { name: "Updates", verbs: ["UPDATE", "UPLOAD", "SYNC"] },
];
const JUDGEMENT = ["THE EXCEPTION", "THE PRICE", "THE HIRE", "THE SEND"];
const PER_FLOW = 18; // 90 repeatable tiles
const CLOCK = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

interface Tile { id: number; label: string; flow: number; sx: number; sy: number; gx: number; gy: number; judgement: boolean }

function buildTiles(): Tile[] {
  const rnd = seeded(7);
  const tiles: Tile[] = [];
  const cols = 13, rows = 8;
  let id = 0;
  const cells: number[] = Array.from({ length: cols * rows }, (_, i) => i);
  // Fisher–Yates with seeded rng
  for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
  let c = 0;
  const cell = () => { const k = cells[c++ % cells.length]; return { x: 60 + (k % cols) * 70 + (rnd() - 0.5) * 20, y: 70 + Math.floor(k / cols) * 60 + (rnd() - 0.5) * 24 }; };
  FLOWS.forEach((f, fi) => {
    for (let n = 0; n < PER_FLOW; n++) {
      const s = cell();
      const col = n % 2, row = Math.floor(n / 2);
      tiles.push({ id: id++, label: f.verbs[n % f.verbs.length], flow: fi, sx: s.x, sy: s.y, gx: 100 + fi * 180 + col * 78, gy: 128 + row * 26, judgement: false });
    }
  });
  JUDGEMENT.forEach((j, n) => {
    const s = cell();
    tiles.push({ id: id++, label: j, flow: -1, sx: s.x, sy: s.y, gx: 170 + n * 190, gy: 548, judgement: true });
  });
  // shuffle appearance order
  for (let i = tiles.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [tiles[i], tiles[j]] = [tiles[j], tiles[i]]; }
  return tiles;
}

export function TaskCollapse() {
  const tiles = useMemo(buildTiles, []);
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const finalState = () => {
        gsap.set(q(".tile:not(.judge)"), { opacity: 0 });
        tiles.filter((t) => t.judgement).forEach((t) => gsap.set(q(`.tile-${t.id}`), { left: `${t.gx / 10}%`, top: `${t.gy / 6}%`, opacity: 1, borderColor: "rgba(224,164,88,0.5)", color: "#e0a458" }));
        gsap.set(q(".flow"), { opacity: 1 });
        gsap.set(q(".flow-count"), { textContent: `${PER_FLOW} tasks → 1 flow` });
        gsap.set(q(".people"), { opacity: 1 });
        gsap.set(q(".clock"), { textContent: "16:00" });
        gsap.set(q(".tc-final > *"), { opacity: 1, y: 0 });
        gsap.set(q(".tc-intro"), { opacity: 0 });
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        const clock = q(".clock")[0] as HTMLElement;
        gsap.set(q(".tile"), { opacity: 0, scale: 0.6 });
        gsap.set(q(".flow, .people"), { opacity: 0 });
        gsap.set(q(".tc-final > *"), { opacity: 0, y: 16 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=360%", scrub: 0.6, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });

        // accumulate, clock runs
        const accDur = 3.0;
        tiles.forEach((t, i) => {
          tl.to(q(`.tile-${t.id}`), { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }, (i / tiles.length) * accDur);
        });
        CLOCK.forEach((c, i) => tl.call(() => { clock.textContent = c; }, [], (i / (CLOCK.length - 1)) * accDur));
        // group by flow
        tl.to(q(".tc-intro"), { opacity: 0, duration: 0.3 }, accDur + 0.1);
        tl.to(q(".flow"), { opacity: 1, duration: 0.4, stagger: 0.08 }, accDur + 0.2);
        tiles.forEach((t) => {
          tl.to(q(`.tile-${t.id}`), { left: `${t.gx / 10}%`, top: `${t.gy / 6}%`, duration: 0.9 }, accDur + 0.3 + (t.judgement ? 0.3 : t.flow * 0.06));
        });
        tl.to(q(".people"), { opacity: 1, duration: 0.4 }, accDur + 1.0);
        // collapse: repeatable tiles fold into their flow header
        FLOWS.forEach((_, fi) => {
          const els = tiles.filter((t) => t.flow === fi).map((t) => q(`.tile-${t.id}`)[0]);
          tl.to(els, { top: `${96 / 6}%`, left: `${(100 + fi * 180 + 39) / 10}%`, opacity: 0, scale: 0.4, duration: 0.7, stagger: { each: 0.015, from: "end" } }, accDur + 1.6 + fi * 0.12);
        });
        tl.set(q(".flow-count"), { textContent: `${PER_FLOW} tasks → 1 flow` }, accDur + 2.6);
        tl.to(q(".flow-count"), { color: "#3dbe8b", duration: 0.3 }, accDur + 2.6);
        // judgement stays, warms up
        tl.to(q(".tile.judge"), { borderColor: "rgba(224,164,88,0.5)", color: "#e0a458", duration: 0.5 }, accDur + 2.7);
        tl.to(q(".tc-final > *"), { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, accDur + 3.0);
        tl.to({}, { duration: 0.8 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => finalState());
      return () => mm.revert();
    },
    { scope: root, dependencies: [tiles] },
  );

  return (
    <section ref={root} aria-labelledby="tc-h2" className="relative border-t hairline">
      <div ref={pin} className="relative lg:min-h-[100dvh] overflow-hidden">
        <div className="wrap pt-[calc(var(--nav-h)+1.5rem)] pb-10 lg:h-[100dvh] grid lg:grid-rows-[auto_1fr_auto] gap-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-xl">
              <p className="fig"><b>03</b> · The cost</p>
              <h2 id="tc-h2" className="display display-md text-paper mt-3">One day of work that is not judgement.</h2>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="clock display display-lg tabular text-paper">08:00</span>
              <span className="mono text-stone">a working day, tile by tile</span>
            </div>
          </div>

          {/* Mobile: the same story as a list */}
          <div className="lg:hidden grid gap-3" aria-hidden>
            {FLOWS.map((f, fi) => (
              <div key={f.name} className="glass px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="mono text-signal-2">Flow 0{fi + 1}</p>
                  <p className="text-paper font-medium">{f.name}</p>
                </div>
                <p className="mono text-advance text-right">{PER_FLOW} tasks → 1 flow</p>
              </div>
            ))}
            <div className="rounded-md border border-dashed border-human/40 px-4 py-3">
              <p className="mono text-human">Your people keep</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {JUDGEMENT.map((j) => <span key={j} className="chip chip-in-build">{j}</span>)}
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[46dvh] hidden lg:block" aria-hidden>
            <div className="stage absolute inset-0 grid-bg">
              <p className="tc-intro absolute left-0 top-0 mono text-stone">Most of the work that eats an owner-led business is not judgement. It is repetition with a deadline attached.</p>
              {FLOWS.map((f, fi) => (
                <div key={f.name} className="flow glass absolute" style={{ left: `${(100 + fi * 180 - 20) / 10}%`, top: `${80 / 6}%`, width: `${156 / 10}%`, height: `${420 / 6}%` }}>
                  <div className="absolute left-3 top-2 right-3">
                    <p className="mono text-signal-2">Flow 0{fi + 1}</p>
                    <p className="text-sm text-paper font-medium">{f.name}</p>
                    <p className="flow-count mono text-stone mt-1">{PER_FLOW} tasks</p>
                  </div>
                </div>
              ))}
              <div className="people absolute" style={{ left: `${60 / 10}%`, top: `${518 / 6}%`, width: `${880 / 10}%`, height: `${60 / 6}%` }}>
                <div className="absolute inset-0 rounded-md border border-dashed border-human/40" />
                <span className="absolute left-3 -top-3 mono text-human bg-bg-0 px-1">Your people keep</span>
              </div>
              {tiles.map((t) => (
                <span
                  key={t.id}
                  className={`tile tile-${t.id} ${t.judgement ? "judge" : ""} flat absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 mono !text-[0.68rem] text-silver whitespace-nowrap`}
                  style={{ left: `${t.sx / 10}%`, top: `${t.sy / 6}%` }}
                >
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <div className="tc-final grid gap-6 md:grid-cols-[1.2fr_1fr_1fr] items-end">
            <p className="display display-md text-paper">Automate the repeatable. Keep the judgement.</p>
            {[stats[0], stats[3]].map((s) => (
              <div key={s.source} className="border-l hairline pl-4">
                <p className="display display-sm text-paper tabular">{s.value}</p>
                <p className="text-sm text-silver mt-1">{s.text}</p>
                <p className="fig mt-2">{s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";
import { ferryAgents } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";

/**
 * SIGNATURE 08 — FERRY AGENT NETWORK.
 * Specialised functions inside one operating system, not standalone bots.
 * Above: the operator's decisions. Middle: Ferry coordinating four specialists.
 * Behind: the shared record of the night. Below: the business systems.
 * Pulses run while the section is on screen and stop when it is not.
 */

const SPECIALISTS = ferryAgents.slice(1);
const SPEC_DETAIL: Record<string, { input: string; context: string; tools: string; action: string; boundary: string }> = {
  Events: { input: "Event published, guest request, door scan", context: "Floor plan, reservations, guestlist", tools: "Table map, guest CRM, scanner", action: "Re-balances tables, confirms placements with the host", boundary: "Host confirms final seating" },
  Marketing: { input: "Event drop, quiet night, VIP arrival", context: "Live guest list, past attendance, brand voice", tools: "Campaign composer, SMS", action: "Drafts the campaign and the blast", boundary: "A person approves the send" },
  Inventory: { input: "POS sales, bottle service, 86'd items", context: "Stock counts, supplier history, price", tools: "Live inventory, reorder", action: "Flags the reorder line before it runs dry", boundary: "A person places the order" },
  Staff: { input: "Shifts, promoter lists, payouts", context: "Promoter performance, schedule", tools: "Staffing, payouts", action: "Watches performance, pings the right host when VIPs arrive", boundary: "Owner sets pay and hires" },
};

export function Ferry() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const pulses = q(".pulse");
        const loop = gsap.timeline({ repeat: -1, paused: true, defaults: { ease: "none" } });
        pulses.forEach((p, i) => {
          const path = p.getAttribute("data-path") as string;
          const from = path.split("|")[0].split(",").map(Number);
          const to = path.split("|")[1].split(",").map(Number);
          loop.fromTo(p, { attr: { cx: from[0], cy: from[1] }, opacity: 0 }, { attr: { cx: to[0], cy: to[1] }, opacity: 1, duration: 1.6, yoyo: true, repeat: 1 }, i * 0.35);
        });
        gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 80%", end: "bottom 20%", onEnter: () => loop.play(), onEnterBack: () => loop.play(), onLeave: () => loop.pause(), onLeaveBack: () => loop.pause() } });
        return () => loop.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const C = { x: 500, y: 250 };
  const ring = SPECIALISTS.map((_, i) => {
    const a = (i / SPECIALISTS.length) * Math.PI * 2 - Math.PI / 2 + Math.PI / 4;
    return { x: C.x + Math.cos(a) * 250, y: C.y + Math.sin(a) * 120 };
  });

  return (
    <section ref={root} className="section border-t hairline" aria-labelledby="ferry-h2">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          <p className="fig" data-reveal><b>09</b> · Ferry AI · inside Fennec · <span className="text-advance">Live</span></p>
          <h2 id="ferry-h2" className="display display-lg text-paper mt-4" data-reveal>AI works better when it knows the whole operation.</h2>
          <p className="lede mt-6" data-reveal>
            Ferry is a roster, not a chat. Each agent owns one part of the venue's operation and reads the same record as every other surface, which is the only reason an agent can tell you what is leaking. Architected by Vishal, the same pair of hands on the Uniserve build.
          </p>
        </Reveal>

        <Reveal className="mt-12 scene">
          <div className="glass p-4 md:p-6 plane" data-reveal data-cursor="inspect">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="fig"><b>Fig. 09</b> · Agent network architecture</p>
              <p className="fig">above · the operator decides &nbsp; · &nbsp; behind · one record of the night &nbsp; · &nbsp; below · the systems</p>
            </div>
            <ol className="md:hidden mt-4 grid gap-2" aria-label="Ferry architecture, top to bottom">
              <li className="rounded-md border border-human/40 bg-human/5 px-3 py-2"><p className="mono text-human">Above · operator</p><p className="text-sm text-silver">The price, the send, the hire stay with a person.</p></li>
              <li className="glass glass-2 px-3 py-2"><p className="mono text-signal-2">Orchestrator</p><p className="text-paper font-medium">Ferry</p><p className="text-sm text-silver">Reads every signal, routes work to the right specialist.</p></li>
              <li className="grid grid-cols-2 gap-2">{SPECIALISTS.map((a) => <div key={a.name} className="rounded-md border border-violet/50 bg-bg-1 px-3 py-2"><p className="text-paper font-medium text-sm">{a.name}</p><p className="mono text-stone">{a.role}</p></div>)}</li>
              <li className="rounded-md border border-signal/30 bg-signal/5 px-3 py-2"><p className="mono text-signal-2">Behind · one record</p><p className="text-sm text-silver">Event · table · tab · guest</p></li>
              <li className="flat px-3 py-2"><p className="mono text-stone">Below · systems</p><p className="text-sm text-silver">Square, Toast, Lightspeed · ticketing & scanner · guest CRM · inventory</p></li>
            </ol>
            <svg viewBox="0 0 1000 520" className="w-full mt-4 hidden md:block" role="img" aria-label="Ferry coordinates four specialist agents (Events, Marketing, Inventory, Staff) over one shared record of the night, connected to the venue's systems, with the operator's decisions above.">
              {/* human decision layer */}
              <rect x="300" y="18" width="400" height="44" rx="6" fill="rgba(224,164,88,0.06)" stroke="rgba(224,164,88,0.45)" />
              <text x="500" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="2" fill="#e0a458">OPERATOR · THE PRICE, THE SEND, THE HIRE</text>
              {/* shared data plane (behind, tilted) */}
              <g transform="translate(500 250) scale(1 0.42) translate(-500 -250)">
                <ellipse cx="500" cy="250" rx="420" ry="250" fill="rgba(47,107,255,0.05)" stroke="rgba(127,166,255,0.25)" />
                <ellipse cx="500" cy="250" rx="300" ry="180" fill="none" stroke="rgba(127,166,255,0.15)" />
              </g>
              <text x="500" y="392" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#7fa6ff">ONE RECORD · EVENT · TABLE · TAB · GUEST</text>
              {/* systems below */}
              {["SQUARE · TOAST · LIGHTSPEED", "TICKETING & SCANNER", "GUEST CRM", "INVENTORY"].map((s, i) => (
                <g key={s}>
                  <rect x={110 + i * 205} y="462" width="180" height="36" rx="4" fill="#10121a" stroke="rgba(243,241,236,0.1)" />
                  <text x={200 + i * 205} y="485" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.5" fill="#b8bdc9">{s}</text>
                  <line x1={200 + i * 205} y1="462" x2={200 + i * 205} y2="400" stroke="#2f6bff" strokeOpacity="0.35" strokeWidth="1" />
                </g>
              ))}
              {/* paths orchestrator ↔ specialists */}
              {ring.map((p, i) => (
                <g key={i}>
                  <line x1={C.x} y1={C.y} x2={p.x} y2={p.y} stroke="#2f6bff" strokeOpacity="0.5" strokeWidth="1" />
                  <circle className="pulse" cx={C.x} cy={C.y} r="3.5" fill="#7fa6ff" opacity="0" data-path={`${C.x},${C.y}|${p.x},${p.y}`} />
                </g>
              ))}
              <line x1={C.x} y1={C.y - 40} x2={C.x} y2="62" stroke="#e0a458" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 5" />
              <circle className="pulse" cx={C.x} cy={C.y - 40} r="3.5" fill="#e0a458" opacity="0" data-path={`${C.x},${C.y - 40}|${C.x},62`} />
              {/* orchestrator */}
              <g>
                <circle cx={C.x} cy={C.y} r="40" fill="rgba(20,23,32,0.9)" stroke="#7fa6ff" strokeWidth="1.5" />
                <text x={C.x} y={C.y - 2} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" fontSize="16" fill="#f3f1ec">Ferry</text>
                <text x={C.x} y={C.y + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.5" fill="#8a93a6">ORCHESTRATOR</text>
              </g>
              {/* specialists */}
              {SPECIALISTS.map((a, i) => (
                <g key={a.name}>
                  <rect x={ring[i].x - 70} y={ring[i].y - 26} width="140" height="52" rx="6" fill="rgba(20,23,32,0.9)" stroke="rgba(109,77,224,0.6)" />
                  <text x={ring[i].x} y={ring[i].y - 5} textAnchor="middle" fontFamily="var(--font-sans)" fontWeight="600" fontSize="13" fill="#f3f1ec">{a.name}</text>
                  <text x={ring[i].x} y={ring[i].y + 12} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1" fill="#8a93a6">{a.role.toUpperCase()}</text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>

        <Reveal as="ul" className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4 snap-row snap-bleed" stagger={0.06}>
          {SPECIALISTS.map((a) => {
            const d = SPEC_DETAIL[a.name];
            return (
              <li key={a.name} data-reveal>
                <details className="glass glass-2 group">
                  <summary className="cursor-pointer list-none p-4 flex items-start justify-between gap-3 min-h-[48px]">
                    <div>
                      <p className="text-paper font-medium">{a.name} agent</p>
                      <p className="text-sm text-silver mt-1">{a.does}</p>
                    </div>
                    <span className="mono text-stone group-open:rotate-45 transition-transform mt-1" aria-hidden>+</span>
                  </summary>
                  <dl className="px-4 pb-4 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-sm border-t hairline pt-3">
                    {(["input", "context", "tools", "action", "boundary"] as const).map((k) => (
                      <div key={k} className="contents">
                        <dt className={`mono ${k === "boundary" ? "text-human" : "text-stone"}`}>{k}</dt>
                        <dd className="text-silver">{d[k]}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </li>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="glass overflow-hidden relative aspect-[16/9]" data-reveal>
            <Image src="/work/ferry-assistant.webp" alt="Ferry AI inside Fennec: the agent roster showing Ferry, Marketing, Inventory, Staff and Events agents, and the live workflows they run." fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover object-left-top" />
          </div>
          <div data-reveal>
            <p className="fig"><b>Live product</b> · Ferry inside Fennec</p>
            <p className="mt-3 body-2">The real screen. Five agents, one shift, and the run log of the workflows they own. The operator asks in one place instead of opening five modules.</p>
            <p className="mt-3 text-sm text-stone">Automate work. Not accountability. Anything irreversible waits for a person.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

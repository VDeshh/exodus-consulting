"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED, DESKTOP, MOBILE } from "@/lib/gsap";
import { site } from "@/lib/site";
import { MobileInbox } from "./MobileInbox";

/**
 * SIGNATURE 01 — OLD WAY → NEW WAY.
 * A statement in the centre of the screen. Behind it, the old stack: ten tools,
 * joined by manual verbs, drawing themselves on load. One short scroll: the
 * problem lifts away, the tools converge into a single operating layer, and
 * the solution takes the centre with the call to action.
 * Stage geometry lives in a 1000×600 viewBox so SVG lines and HTML chips share coordinates.
 */

const TOOLS = [
  ["EMAIL", 110, 120],
  ["EXCEL", 320, 80],
  ["CRM", 600, 52],
  ["PDF", 830, 100],
  ["SLACK", 130, 320],
  ["INVOICE", 890, 300],
  ["BOOKING", 230, 500],
  ["PHONE", 470, 545],
  ["REPORT", 720, 515],
  ["DATABASE", 820, 440],
] as const;

const FRICTION: [number, number, string][] = [
  [0, 1, "Export"], [1, 2, "Copy"], [2, 3, "Paste"], [0, 4, "Forward"], [4, 6, "Check"], [6, 7, "Remind"],
  [7, 8, "Re-type"], [8, 5, "Email"], [5, 3, "Reconcile"], [9, 2, "Upload"], [9, 8, "Check"], [1, 4, "Copy"],
];

const PLANE = { x: 100, y: 468, w: 800, h: 126 };
const BUS_Y = 500;
const SLOT_Y = 538;
const slotX = (i: number) => 142 + i * 79.5;
const LAYERS = ["Connected data", "Automation", "AI", "Software"];

const PROBLEM = ["Most businesses still run", "on email, spreadsheets", "and memory."];
const SOLUTION = ["Move your", "business forward."];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      const toolsHome = () => {
        TOOLS.forEach((_, i) => gsap.set(q(`.tool-${i}`), { left: `${slotX(i) / 10}%`, top: `${SLOT_Y / 6}%` }));
        gsap.set(q(".tool"), { backgroundColor: "rgba(20,23,32,0.7)", borderColor: "rgba(127,166,255,0.35)", color: "#f3f1ec" });
      };

      const finalState = () => {
        gsap.set(q(".problem, .hint, .verb, .friction"), { opacity: 0 });
        gsap.set(q(".plane, .layer, .bus, .slot"), { opacity: 1, strokeDashoffset: 0 });
        gsap.set(q(".sol-line, .sol-rest > *, .sol-eyebrow"), { opacity: 1, y: 0 });
        toolsHome();
      };

      mm.add(`${MOTION} and ${DESKTOP}`, () => {
        const friction = q(".friction");
        gsap.set(q(".plane, .layer"), { opacity: 0 });
        gsap.set(q(".sol-line"), { y: 80, opacity: 0 });
        gsap.set(q(".sol-rest > *"), { opacity: 0, y: 24 });
        gsap.set(q(".sol-eyebrow"), { opacity: 0, y: 16 });
        gsap.set(q(".problem-line"), { y: 0, opacity: 1 });

        // Intro, on load: the old stack draws itself. Only strokeDashoffset, which the
        // scroll timeline never touches, so refreshes cannot record a mid-intro value.
        gsap.to(friction, { strokeDashoffset: 0, duration: 1.4, stagger: 0.06, ease: "power2.out", delay: 0.3 });
        // Intro tweens target parents (.problem, .hint-inner); the scroll timeline targets
        // children (.problem-line) or the other parent (.hint), so no property is shared.
        gsap.fromTo(q(".problem"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.15 });
        gsap.to(q(".hint-inner"), { opacity: 1, duration: 0.6, delay: 1.6 });

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut" },
          scrollTrigger: { trigger: pin.current, start: "top top", end: "+=170%", scrub: 1, pin: true, anticipatePin: 1, refreshPriority: 1 },
        });

        // the problem lifts away
        tl.to(q(".problem-line"), { y: -90, opacity: 0, filter: "blur(8px)", duration: 0.7, stagger: 0.07, ease: "power3.in" }, 0);
        tl.to(q(".hint"), { opacity: 0, duration: 0.2 }, 0);
        tl.to(q(".verb"), { opacity: 0, duration: 0.35 }, 0.05);
        tl.to(friction, { opacity: 0, duration: 0.5 }, 0.15);
        // the operating layer arrives, the tools converge into it
        tl.fromTo(q(".plane"), { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3);
        TOOLS.forEach((_, i) => {
          tl.to(q(`.tool-${i}`), { left: `${slotX(i) / 10}%`, top: `${SLOT_Y / 6}%`, duration: 1.0, ease: "power3.inOut" }, 0.35 + i * 0.04);
        });
        tl.to(q(".tool"), { backgroundColor: "rgba(20,23,32,0.7)", borderColor: "rgba(127,166,255,0.35)", color: "#f3f1ec", duration: 0.5 }, 0.9);
        tl.to(q(".bus"), { strokeDashoffset: 0, duration: 0.4 }, 1.2);
        tl.to(q(".slot"), { strokeDashoffset: 0, duration: 0.25, stagger: 0.03 }, 1.3);
        tl.to(q(".layer"), { opacity: 1, duration: 0.3, stagger: 0.1 }, 1.45);
        // the solution takes the centre
        tl.to(q(".sol-eyebrow"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.6);
        tl.to(q(".sol-line"), { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "expo.out" }, 0.85);
        tl.to(q(".sol-rest > *"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 1.35);
        tl.to(q(".stage-wrap"), { opacity: 1, duration: 0.6 }, 1.0);
        tl.to({}, { duration: 0.5 });
      });

      mm.add(`${REDUCED}, ${MOBILE}`, () => finalState());
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-h1" className="relative hero-anim">
      <noscript><style>{`.hero-anim *{opacity:1!important;stroke-dashoffset:0!important}`}</style></noscript>
      <div ref={pin} className="relative lg:h-[100dvh] overflow-hidden">
        <div className="aurora" aria-hidden />
        <div className="absolute inset-0 grid-bg" aria-hidden />

        {/* ---------- Desktop stage: the old stack, behind the words ---------- */}
        <div className="stage-wrap hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none opacity-80" aria-hidden>
          <div className="stage relative w-full" style={{ maxWidth: "min(100%, calc((100dvh - 6rem) * 1000 / 600))", aspectRatio: "1000 / 600" }}>
            <div
              className="plane glass absolute"
              style={{ left: `${PLANE.x / 10}%`, top: `${PLANE.y / 6}%`, width: `${PLANE.w / 10}%`, height: `${PLANE.h / 6}%` }}
            >
              <span className="fig absolute left-4 top-3"><b>Exodus</b> · operating layer</span>
              <div className="absolute inset-x-4 bottom-2.5 flex justify-between">
                {LAYERS.map((l) => (
                  <span key={l} className="layer mono text-signal-2">{l}</span>
                ))}
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" fill="none">
              {FRICTION.map(([a, b, verb], i) => {
                const A = TOOLS[a], B = TOOLS[b];
                return (
                  <g key={i}>
                    <line className="friction" pathLength={1} x1={A[1]} y1={A[2]} x2={B[1]} y2={B[2]} stroke="#d9534f" strokeOpacity="0.5" strokeWidth="1" />
                    <text className="verb" x={(A[1] + B[1]) / 2} y={(A[2] + B[2]) / 2 - 6} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="1.5" fill="#8a93a6" opacity="0.8">
                      {verb.toUpperCase()}
                    </text>
                  </g>
                );
              })}
              <line className="bus" pathLength={1} x1={slotX(0)} y1={BUS_Y} x2={slotX(9)} y2={BUS_Y} stroke="#2f6bff" strokeWidth="1.5" />
              {TOOLS.map((_, i) => (
                <line key={i} className="slot" pathLength={1} x1={slotX(i)} y1={SLOT_Y - 16} x2={slotX(i)} y2={BUS_Y} stroke="#2f6bff" strokeWidth="1" strokeOpacity="0.8" />
              ))}
            </svg>

            {TOOLS.map(([name, x, y], i) => (
              <span
                key={name}
                className={`tool tool-${i} flat absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 mono text-silver`}
                style={{ left: `${x / 10}%`, top: `${y / 6}%` }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Centre: problem, then solution ---------- */}
        <div className="wrap relative lg:h-full flex flex-col lg:items-center lg:justify-center pt-[calc(var(--nav-h)+1.5rem)] pb-12 lg:pb-[21dvh]">
          {/* Mobile: the inbox */}
          <div className="lg:hidden mb-8">
            <p className="fig mb-3">Your business should filter the noise before it reaches you.</p>
            <MobileInbox />
          </div>

          <div className="relative lg:text-center lg:max-w-5xl lg:mx-auto">
            <div className="hidden lg:block absolute -inset-x-24 -inset-y-16 bg-[radial-gradient(ellipse_at_center,rgba(10,11,15,0.97)_38%,rgba(10,11,15,0.6)_60%,rgba(10,11,15,0)_78%)] pointer-events-none" aria-hidden />

            {/* problem (desktop only) */}
            <div className="problem hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2" aria-hidden>
              <p className="problem-line mono text-stone mb-6">This is how most businesses still run</p>
              <p className="display display-hero text-paper">
                {PROBLEM.map((l) => (
                  <span key={l} className="problem-line block will-change-transform">{l}</span>
                ))}
              </p>
            </div>

            {/* solution */}
            <div className="relative z-10">
              <p className="sol-eyebrow mono text-signal-2 mb-6">Old way out. New way in.</p>
              <h1 id="hero-h1" className="display display-hero text-paper">
                {SOLUTION.map((l) => (
                  <span key={l} className="sol-line block will-change-transform">{l}</span>
                ))}
              </h1>
              <div className="sol-rest">
                <p className="lede mt-6 lg:mx-auto lg:text-center lg:!max-w-2xl lg:!text-[1.1rem]">
                  Exodus redesigns outdated operations using AI, custom software and automation built around how your business actually works.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 lg:justify-center">
                  <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">
                    {site.ctaLong}
                  </a>
                  <Link href="/work/" className="btn btn-ghost" data-cursor="view">
                    See our work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hint hidden lg:flex absolute bottom-6 inset-x-0 justify-center pointer-events-none" aria-hidden>
          <div className="hint-inner flex items-center gap-3 opacity-0">
            <span className="mono text-stone">Scroll</span>
            <span className="block w-px h-8 bg-gradient-to-b from-stone/70 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

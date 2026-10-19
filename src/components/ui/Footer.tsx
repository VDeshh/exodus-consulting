"use client";

import Link from "next/link";
import * as React from "react";
import { site } from "@/lib/site";

/**
 * Closing section: a midnight-navy field crossed by a slow diagonal shaft of
 * light, with "exodus" set as a giant serif wordmark cropped by the bottom
 * edge. The beam drifts on its own and leans toward the pointer; every letter
 * paints the same beam aligned to the section's coordinates, so the light reads
 * as one shaft passing behind the columns and through the word.
 *
 * Adapted from the 21st.dev Beam Wordmark Footer (@kedhareswer). Kept: the
 * engine (fit, baseline, drift, approach), which writes CSS variables from a
 * ref so the beam never re-renders React, runs rAF only while the footer is on
 * screen, and holds still under reduced motion. Changed: the template's
 * placeholder socials and credit line are gone (Instagram is the only real
 * channel), internal links use next/link, link rows meet the site's 40px tap
 * floor on touch, and the wordmark is set in the display serif.
 */

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);
const fitSize = (measured: number, target: number, cap: number) => {
  if (!(measured > 0) || !(target > 0)) return 0;
  return Math.min((100 * target) / measured, cap > 0 ? cap : Infinity);
};
const beamTarget = (u: number) => 30 + 52 * clamp(Number.isFinite(u) ? u : 0.5, 0, 1);
const drift = (t: number) => 58 + 9 * (0.7 * Math.sin(t * 0.21) + 0.3 * Math.sin(t * 0.077 + 1.3));
const approach = (from: number, to: number, k: number, dt: number) =>
  to + (from - to) * Math.pow(1 - clamp(k, 0, 1), clamp(dt, 0, 0.1) * 60);
const baselineAt = (ascent: number, descent: number) =>
  !(ascent > 0) || !(descent >= 0) ? 0.8 : clamp(((100 - ascent - descent) / 2 + ascent) / 100, 0.5, 1.2);
const wordHeight = (size: number, base: number, cut: number) => Math.max(0, size * (base + cut));

const measureBaseline = (family: string, weight: number, text: string) => {
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return 0.8;
    ctx.font = `${weight} 100px ${family}`;
    const m = ctx.measureText(text);
    return baselineAt(m.fontBoundingBoxAscent, m.fontBoundingBoxDescent);
  } catch {
    return 0.8;
  }
};

type Col = { title: string; links: [string, string][] };
const COLUMNS: Col[] = [
  { title: "Work", links: [["/work/fennec/", "Fennec"], ["/work/uniserve/", "Uniserve"], ["/work/palapa-tours/", "Palapa Tours"], ["/work/current/", "Current engagements"], ["/work/", "All work"]] },
  { title: "Firm", links: [["/what-we-do/", "What we do"], ["/how-we-work/", "How we work and charge"], ["/about/", "About the founders"], ["/industries/", "Industries"], ["/contact/", "Contact"]] },
  { title: "Start", links: [[site.calendly, "Book a free audit"], [`mailto:${site.email}`, site.email], [site.instagram, "Instagram"]] },
];

const WORD = "exodus";
const CUT = 0.12;
const WEIGHT = 420;

const CSS = `
.bwf{position:relative;isolation:isolate;overflow:hidden;container-type:inline-size;background:#05070f;color:#eef1f8;-webkit-font-smoothing:antialiased;touch-action:pan-y;--acc:47,107,255;--ink:238,241,248}
.bwf-rule{position:absolute;left:0;right:0;top:0;height:1px;z-index:3;background:linear-gradient(90deg,rgba(var(--acc),.12),rgba(var(--acc),.55) var(--b),rgba(var(--acc),.12))}
.bwf-sky{position:absolute;inset:0;z-index:0;pointer-events:none}
.bwf-wash{position:absolute;inset:0;background:radial-gradient(120% 90% at 8% 0%,rgba(var(--acc),.18),transparent 55%),radial-gradient(90% 70% at 92% 8%,rgba(109,77,224,.12),transparent 60%)}
.bwf-beam{position:absolute;inset:0;filter:blur(calc(1px + 1.6cqw));background:linear-gradient(118deg,transparent calc(var(--b) - 11%),rgba(var(--acc),.10) calc(var(--b) - 5%),rgba(var(--acc),.32) var(--b),rgba(var(--acc),.08) calc(var(--b) + 4%),transparent calc(var(--b) + 9%)),linear-gradient(118deg,transparent calc(var(--b) - 34%),rgba(var(--acc),.09) calc(var(--b) - 27%),transparent calc(var(--b) - 20%))}
.bwf-glow{position:absolute;inset:0;opacity:var(--g);background:radial-gradient(circle 26cqw at var(--px) var(--py),rgba(var(--acc),.14),transparent 70%)}
.bwf-grain{position:absolute;inset:0;opacity:.12;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.bwf-inner{position:relative;z-index:2}
.bwf-label{font-size:12px;line-height:1;letter-spacing:.02em;color:rgb(var(--acc));padding-bottom:13px;position:relative;display:block}
.bwf-label::after{content:'';position:absolute;left:0;right:0;bottom:0;height:1px;background:linear-gradient(90deg,rgba(var(--acc),.5),rgba(var(--acc),.2));transform-origin:0 50%;transform:scaleX(var(--line,1));transition:transform 1.1s cubic-bezier(.2,.7,.1,1) var(--d,0ms)}
.bwf[data-in='false'] .bwf-label::after{--line:0}
.bwf-fade{transition:opacity .9s ease var(--d,0ms),translate .9s cubic-bezier(.2,.7,.1,1) var(--d,0ms)}
.bwf[data-in='false'] .bwf-fade{opacity:0;translate:0 14px}
.bwf-link{position:relative;display:inline-flex;align-items:center;gap:8px;padding:9px 0;font-size:15px;line-height:22px;color:rgba(var(--ink),.74);transition:color .25s}
@media (pointer:coarse){.bwf-link{padding:11px 0}}
.bwf-link-t{display:inline-block;transition:translate .35s cubic-bezier(.2,.8,.2,1)}
.bwf-link::before{content:'';position:absolute;left:0;top:50%;width:6px;height:1px;background:rgb(var(--acc));transform:scaleX(0);transform-origin:0 50%;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.bwf-link svg{width:12px;height:12px;opacity:0;translate:-6px 0;color:rgb(var(--acc));transition:opacity .25s,translate .35s cubic-bezier(.2,.8,.2,1)}
.bwf-link:hover,.bwf-link:focus-visible{color:#fff;outline:none}
.bwf-link:hover::before,.bwf-link:focus-visible::before{transform:scaleX(1)}
.bwf-link:hover .bwf-link-t,.bwf-link:focus-visible .bwf-link-t{translate:12px 0}
.bwf-link:hover svg,.bwf-link:focus-visible svg{opacity:1;translate:10px 0}
.bwf-link:focus-visible .bwf-link-t{text-decoration:underline;text-underline-offset:4px}
.bwf-word{position:relative;z-index:1;overflow:hidden;margin-top:clamp(36px,7cqw,104px)}
.bwf-word-in{display:inline-flex;white-space:nowrap;font-family:var(--font-display);font-weight:${WEIGHT};font-optical-sizing:auto;line-height:1;letter-spacing:-.035em;user-select:none;-webkit-user-select:none}
.bwf-lw{display:inline-block;translate:0 0;transition:translate 1.25s cubic-bezier(.16,.84,.2,1) var(--d,0ms)}
.bwf[data-in='false'] .bwf-lw{translate:0 85%}
.bwf-l{display:inline-block;color:transparent;-webkit-background-clip:text;background-clip:text;background-repeat:no-repeat;background-size:var(--rw) var(--rh);background-position:calc(var(--x) * -1) calc(var(--y) * -1);
background-image:radial-gradient(circle 22cqw at var(--px) var(--py),rgba(var(--acc),calc(var(--g) * .8)),transparent 70%),linear-gradient(118deg,transparent calc(var(--b) - 9%),rgba(var(--acc),.5) calc(var(--b) - 1.5%),rgba(150,178,255,.7) var(--b),rgba(var(--acc),.2) calc(var(--b) + 3.5%),transparent calc(var(--b) + 8%)),linear-gradient(180deg,#22397e var(--top),#070b1d var(--bot));
transition:transform .5s cubic-bezier(.2,.9,.25,1.2),filter .4s;transform-origin:50% 100%}
@media (hover:hover){.bwf-l:hover{transform:translateY(-.04em);filter:brightness(1.35)}}
.bwf-foot{position:absolute;left:0;right:0;bottom:0;height:34%;z-index:2;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(5,7,15,.55) 55%,#05070f)}
@media (prefers-reduced-motion:reduce){.bwf .bwf-lw,.bwf .bwf-fade,.bwf .bwf-label::after,.bwf .bwf-l,.bwf .bwf-link-t,.bwf .bwf-link svg{transition:none!important}.bwf[data-in='false'] .bwf-lw,.bwf[data-in='false'] .bwf-fade{translate:none;opacity:1}.bwf[data-in='false'] .bwf-label::after{--line:1}}
`;

const Arrow = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2.5 9.5l7-7M4 2.5h5.5V8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function FooterLink({ href, label }: { href: string; label: string }) {
  const inner = (
    <>
      <span className="bwf-link-t">{label}</span>
      <Arrow />
    </>
  );
  if (href.startsWith("/")) return <Link className="bwf-link" href={href}>{inner}</Link>;
  const external = href.startsWith("http");
  return (
    <a className="bwf-link" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  );
}

export function Footer() {
  const letters = React.useMemo(() => Array.from(WORD), []);
  const rootRef = React.useRef<HTMLElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const ptr = React.useRef({ u: 0.5, x: 0, y: 0, inside: false });
  const [size, setSize] = React.useState(0);
  const [base, setBase] = React.useState(0.8);
  const [seen, setSeen] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);

  // Fit the word to the column, then tell each letter where it sits in the
  // section so its slice of the beam lines up with the backdrop.
  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    const inner = innerRef.current;
    if (!root || !box || !inner) return;
    let frame = 0;
    const place = () => {
      const r = root.getBoundingClientRect();
      root.style.setProperty("--rw", `${r.width}px`);
      root.style.setProperty("--rh", `${r.height}px`);
      let top = 0;
      inner.querySelectorAll<HTMLElement>(".bwf-l").forEach((s, i) => {
        let x = 0;
        let y = 0;
        let el: HTMLElement | null = s;
        while (el && el !== root) {
          x += el.offsetLeft;
          y += el.offsetTop;
          el = el.offsetParent as HTMLElement | null;
        }
        s.style.setProperty("--x", `${x}px`);
        s.style.setProperty("--y", `${y}px`);
        if (i === 0) top = y;
      });
      root.style.setProperty("--top", `${top}px`);
      root.style.setProperty("--bot", `${top + (parseFloat(inner.style.fontSize) || 0) * 0.92}px`);
    };
    const fit = () => {
      // .wrap carries the page gutter as padding; fit to the content box.
      const cs = getComputedStyle(box);
      const target = box.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0);
      inner.style.fontSize = "100px";
      const measured = inner.offsetWidth;
      setBase(measureBaseline(getComputedStyle(inner).fontFamily, WEIGHT, WORD));
      const next = fitSize(measured, target, target * 0.42);
      inner.style.fontSize = `${next}px`;
      setSize(next);
      place();
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fit);
    };
    fit();
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    let alive = true;
    document.fonts?.ready.then(() => alive && schedule());
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.12 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // The beam runs only while the footer is on screen, and not at all under
  // reduced motion; the pointer glow still answers, because it only moves
  // when you do.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const set = (b: number, px: number, py: number, g: number) => {
      root.style.setProperty("--b", `${b.toFixed(2)}%`);
      root.style.setProperty("--px", `${px.toFixed(1)}px`);
      root.style.setProperty("--py", `${py.toFixed(1)}px`);
      root.style.setProperty("--g", g.toFixed(3));
    };
    if (reduced || !visible) {
      const p = ptr.current;
      set(58, p.x, p.y, p.inside ? 1 : 0);
      if (!reduced) return;
      const onMove = () => set(58, ptr.current.x, ptr.current.y, ptr.current.inside ? 1 : 0);
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onMove);
      return () => {
        root.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onMove);
      };
    }
    let raf = 0;
    let last = performance.now();
    let t = last / 1000;
    let b = 58;
    let px = ptr.current.x;
    let py = ptr.current.y;
    let g = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      t += dt;
      const p = ptr.current;
      const idle = drift(t);
      b = approach(b, p.inside ? beamTarget(p.u) * 0.75 + idle * 0.25 : idle, 0.035, dt);
      px = approach(px, p.x, 0.16, dt);
      py = approach(py, p.y, 0.16, dt);
      g = approach(g, p.inside ? 1 : 0, 0.06, dt);
      set(b, px, py, g);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, visible]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const p = ptr.current;
    p.x = e.clientX - r.left;
    p.y = e.clientY - r.top;
    p.u = r.width ? p.x / r.width : 0.5;
    p.inside = e.type !== "pointerleave";
  };

  let d = 0;
  const delay = () => ({ "--d": `${(d += 60)}ms` }) as React.CSSProperties;
  const vars = { "--b": "58%", "--px": "50%", "--py": "50%", "--g": "0", "--top": "0px", "--bot": "100%" } as React.CSSProperties;

  return (
    <footer
      ref={rootRef}
      className="bwf mt-24"
      style={vars}
      data-in={seen || reduced ? "true" : "false"}
      onPointerMove={onPointer}
      onPointerEnter={onPointer}
      onPointerLeave={onPointer}
    >
      <style>{CSS}</style>
      <div className="bwf-rule" aria-hidden="true" />
      <div className="bwf-sky" aria-hidden="true">
        <div className="bwf-wash" />
        <div className="bwf-beam" />
        <div className="bwf-glow" />
        <div className="bwf-grain" />
      </div>

      <div className="bwf-inner wrap pt-20 md:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10">
          <div className="max-w-sm">
            <p className="bwf-label" style={delay()}>© {new Date().getFullYear()} Exodus Consulting</p>
            <p className="bwf-fade display display-sm text-paper mt-6" style={delay()}>
              The moment a business decides to stop running the old way.
            </p>
            <p className="bwf-fade note mt-4" style={delay()}>
              <b>exodus</b>, noun. A departure; a movement from one place toward another. Two founders, Vancouver. Builds that run on their own, optional monthly support for bigger projects, and you own the code.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="bwf-label" style={delay()}>{col.title}</p>
              <ul className="mt-3">
                {col.links.map(([href, label]) => (
                  <li key={href} className="bwf-fade" style={delay()}>
                    <FooterLink href={href} label={label} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="bwf-word" style={{ height: size ? wordHeight(size, base, CUT) : `${(0.8 + CUT) * 26}cqw` }}>
        <p className="sr-only">Exodus</p>
        <div ref={boxRef} className="wrap">
          <div ref={innerRef} className="bwf-word-in" aria-hidden="true">
            {letters.map((ch, i) => (
              <span key={i} className="bwf-lw" style={{ "--d": `${260 + i * 75}ms` } as React.CSSProperties}>
                <span className="bwf-l">{ch}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="bwf-foot" aria-hidden="true" />
      </div>
      {/* Clears the fixed mobile CTA bar so the wordmark is not hidden under it. */}
      <div className="relative z-[2] h-24 bg-[#05070f] lg:hidden" aria-hidden />
    </footer>
  );
}

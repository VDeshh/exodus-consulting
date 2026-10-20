"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Logo";

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const sheet = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    // Keep keyboard focus inside the sheet while it is open.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab" || !sheet.current) return;
      const f = [...sheet.current.querySelectorAll<HTMLElement>("a[href],button")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    const t = window.setTimeout(() => sheet.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true }), 320);
    document.addEventListener("keydown", onKey);
    // Lock the page behind the sheet.
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { window.clearTimeout(t); document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = prev; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/work/fennec/" ? path === href : path?.startsWith(href) && !(href === "/work/" && path?.startsWith("/work/fennec/"));

  return (
    <header className="fixed inset-x-0 top-0 z-[100] pointer-events-none">
      {/* Phone scrim: content must not show through the gaps beside the pill. */}
      <div
        className={`lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-0 via-bg-0/85 to-transparent transition-opacity duration-300 ${condensed && !open ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
      <div className={`wrap relative transition-[padding] duration-300 ${condensed || open ? "pt-2" : "pt-4"}`}>
        <div
          className={`pointer-events-auto relative z-[2] flex items-center justify-between gap-4 transition-all duration-300 ease-[var(--ease-out-expo)] ${
            condensed || open ? "glass px-3 py-1.5 !rounded-full" : "px-1 py-2"
          }`}
        >
          <Link href="/" className="flex items-center shrink-0 min-h-[44px]" aria-label="Exodus Consulting home">
            <Wordmark condensed={condensed || open} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5">
            {nav.map((n) => {
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link group relative px-2.5 py-2 text-[0.85rem] rounded-md whitespace-nowrap transition-colors ${active ? "text-paper" : "text-silver hover:text-paper"}`}
                >
                  {/* Text roll: the label lifts out and its twin rolls in from below. */}
                  <span className="roll">
                    <span className="roll-a">{n.label}</span>
                    <span className="roll-b" aria-hidden>{n.label}</span>
                  </span>
                  <span className={`nav-line absolute left-3 right-3 -bottom-px h-px bg-signal-2 ${active ? "is-active" : ""}`} aria-hidden />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.calendly}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="start"
              className="btn btn-primary inline-flex !min-h-[40px] !py-2 !px-3 md:!px-4 !text-[0.8rem] md:!text-[0.85rem] whitespace-nowrap max-[380px]:hidden"
            >
              <span className="sm:hidden">Free audit</span>
              <span className="hidden sm:inline">{site.cta}</span>
            </a>
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border hairline text-paper active:bg-white/10"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen sheet on phones and tablets. It opens as a circle growing
          out of the menu button (clip-path, compositor-only), and each label
          rises out of its own mask. Adapted from the 21st.dev immersive
          full-screen nav, without its image column or character splitting. */}
      <div
        id="mobile-nav"
        className={`nav-sheet lg:hidden fixed inset-0 z-[1] ${open ? "is-open pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button type="button" aria-label="Close menu" tabIndex={open ? 0 : -1} className="absolute inset-0 nav-sheet-bg" onClick={() => setOpen(false)} />
        <nav
          ref={sheet}
          aria-label="Mobile"
          className="absolute inset-x-0 top-0 bottom-0 flex flex-col pt-[calc(var(--nav-h)+1.5rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))] px-4"
        >
          <ol className="flex-1 flex flex-col justify-center wrap !px-0">
            {[{ href: "/", label: "Home" }, ...nav].map((n, i) => {
              const active = n.href === "/" ? path === "/" : isActive(n.href);
              return (
                <li key={n.href} className="border-b hairline">
                  <Link
                    href={n.href}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-center justify-between gap-4 min-h-[64px] py-2"
                  >
                    <span className="overflow-hidden block py-1">
                      <span
                        className={`nav-rise display block text-[2.4rem] leading-none ${active ? "text-paper" : "text-silver"}`}
                        style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                      >
                        {n.label}
                      </span>
                    </span>
                    <span
                      className={`nav-rise-fade text-xl ${active ? "text-signal-2" : "text-stone"}`}
                      style={{ transitionDelay: open ? `${260 + i * 55}ms` : "0ms" }}
                      aria-hidden
                    >
                      {active ? "●" : "→"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="nav-rise-fade wrap !px-0 grid gap-2" style={{ transitionDelay: open ? "520ms" : "0ms" }}>
            <a href={site.calendly} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="btn btn-primary w-full !min-h-[54px]">
              {site.ctaLong}
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1} className="btn btn-ghost w-full">Email us</a>
              <Link href="/contact/" tabIndex={open ? 0 : -1} className="btn btn-ghost w-full">Contact</Link>
            </div>
            <p className="note text-center mt-2">Two founders, direct access, and you own the code.</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

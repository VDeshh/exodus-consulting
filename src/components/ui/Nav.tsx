"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Wordmark } from "./Logo";

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    // Lock the page behind the sheet.
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = prev; };
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
                  className={`relative px-2.5 py-2 text-[0.85rem] rounded-md whitespace-nowrap transition-colors ${active ? "text-paper" : "text-silver hover:text-paper"}`}
                >
                  {n.label}
                  {active && <span className="absolute left-3 right-3 -bottom-px h-px bg-signal-2" />}
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

      {/* Full-screen sheet on phones and tablets */}
      <div
        id="mobile-nav"
        className={`lg:hidden fixed inset-0 z-[1] pointer-events-auto transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button type="button" aria-label="Close menu" className="absolute inset-0 bg-bg-0" onClick={() => setOpen(false)} />
        <nav
          aria-label="Mobile"
          className={`absolute inset-x-0 top-0 bottom-0 flex flex-col pt-[calc(var(--nav-h)+1.25rem)] pb-[max(1.25rem,env(safe-area-inset-bottom))] px-4 transition-transform duration-300 ease-[var(--ease-out-expo)] ${open ? "translate-y-0" : "-translate-y-3"}`}
        >
          <ol className="flex-1 flex flex-col justify-center gap-1.5 wrap !px-0">
            {[{ href: "/", label: "Home" }, ...nav].map((n, i) => {
              const active = n.href === "/" ? path === "/" : isActive(n.href);
              return (
                <li key={n.href} style={{ transitionDelay: `${open ? 40 + i * 35 : 0}ms` }} className={`transition-all duration-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                  <Link
                    href={n.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 min-h-[56px] display text-[1.7rem] tracking-tight ${active ? "bg-paper text-bg-0" : "text-paper active:bg-white/10"}`}
                  >
                    <span>{n.label}</span>
                    <span className={`mono ${active ? "text-bg-0/60" : "text-stone"}`}>{String(i).padStart(2, "0")}</span>
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="wrap !px-0 grid gap-2">
            <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full !min-h-[54px]">
              {site.ctaLong}
            </a>
            <div className="grid grid-cols-2 gap-2">
              <a href={`mailto:${site.email}`} className="btn btn-ghost w-full">Email us</a>
              <Link href="/contact/" className="btn btn-ghost w-full">Contact</Link>
            </div>
            <p className="fig text-center mt-1">Two founders · direct access · you own the code</p>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { track } from "@/lib/track";

/**
 * Phone-only floating action pill. Appears once the visitor has scrolled past
 * the hero, hides while the mobile menu is open, and sits above the home
 * indicator. One tap to the free audit call, one tap to email.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 1024) { setShow(false); return; }
      const past = window.scrollY > window.innerHeight * 0.9;
      // Stand down near the foot of the page, where the real CTA and footer live.
      const nearEnd = window.scrollY + window.innerHeight > document.documentElement.scrollHeight - 620;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-[90] px-4 pt-10 transition-all duration-300 ease-[var(--ease-out-expo)] bg-gradient-to-t from-bg-0 via-bg-0/92 to-transparent ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"}`}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.9rem)" }}
      aria-hidden={!show}
    >
      <div className="glass glass-flat !rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)]">
        <a
          href={site.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary flex-1 !min-h-[48px] !py-2.5"
          onClick={() => track("audit_cta", { from: "mobile-bar" })}
        >
          Book a free audit
        </a>
        <a
          href={`mailto:${site.email}`}
          aria-label="Email Exodus"
          className="w-12 h-12 shrink-0 rounded-full grid place-items-center text-paper border hairline active:bg-white/10"
          onClick={() => track("email_clicked", { from: "mobile-bar" })}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M3 8l9 6 9-6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

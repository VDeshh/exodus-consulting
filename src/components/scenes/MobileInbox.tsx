"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION, REDUCED } from "@/lib/gsap";

/**
 * MOBILE HERO. Founders and operators open this from LinkedIn or email, on a
 * phone. What they see first is an inbox: notifications stack up, then the
 * Exodus layer takes the recurring ones and leaves three decisions.
 * Autoplays once on mount (about 7 s). Final frame only for reduced motion.
 */

const NOTES: [string, string, boolean][] = [
  ["Accounting", "Invoice #4471 overdue, 14 days", false],
  ["Bookings", "Table T3 needs an update for Saturday", false],
  ["Support", "Customer waiting on a reply since 9:12", false],
  ["Inventory", "Weekly stock report ready to compile", false],
  ["CRM", "Web lead unanswered, 3 hours", false],
  ["Spreadsheet", "Payout sheet does not match the till", false],
  ["Pricing", "Approve the new bottle service price", true],
  ["Hiring", "Two host applications to review", true],
  ["Campaign", "Release Friday's SMS to 1,240 guests", true],
];

export function MobileInbox() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        gsap.set(q(".note"), { opacity: 0, y: 24 });
        gsap.set(q(".layer"), { opacity: 0, yPercent: 100 });
        gsap.set(q(".count"), { textContent: "0" });
        const tl = gsap.timeline({ delay: 0.4 });
        NOTES.forEach((_, i) => {
          tl.to(q(`.note-${i}`), { opacity: 1, y: 0, duration: 0.35, ease: "expo.out" }, i * 0.38);
          tl.set(q(".count"), { textContent: String(i + 1) }, i * 0.38);
        });
        tl.to(q(".layer"), { opacity: 1, yPercent: 0, duration: 0.7, ease: "expo.out" }, "+=0.5");
        tl.to(q(".note.noise"), { opacity: 0, x: -40, duration: 0.4, stagger: 0.08, ease: "power2.in" }, "-=0.2");
        tl.to(q(".note.noise"), { height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, borderWidth: 0, duration: 0.35, stagger: 0.05, ease: "power2.inOut" }, "-=0.3");
        tl.set(q(".count"), { textContent: "3" });
        tl.to(q(".note.decision"), { borderColor: "rgba(224,164,88,0.5)", duration: 0.5 });
        tl.to(q(".verdict"), { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
      });
      mm.add(REDUCED, () => {
        gsap.set(q(".note.noise"), { opacity: 0, position: "absolute" });
        gsap.set(q(".count"), { textContent: "3" });
        gsap.set(q(".verdict"), { opacity: 1, y: 0 });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative glass p-4 overflow-hidden" aria-hidden>
      <div className="flex items-center justify-between">
        <p className="fig">Inbox · <span className="count text-paper">0</span> need you</p>
        <p className="fig">09:41</p>
      </div>
      <ul className="mt-3 space-y-2 relative h-[20rem] overflow-hidden">
        {NOTES.map(([app, text, decision], i) => (
          <li key={text} className={`note note-${i} ${decision ? "decision" : "noise"} flat px-3 py-2 flex items-start gap-3`}>
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${decision ? "bg-human" : "bg-friction/70"}`} />
            <div className="min-w-0">
              <p className="mono text-stone">{app}</p>
              <p className="text-sm text-silver truncate">{text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="layer absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-bg-0 via-bg-0/95 to-transparent">
        <p className="fig"><b>Exodus</b> · operating layer</p>
        <p className="verdict text-paper font-medium mt-1 opacity-0 translate-y-2">Six handled by the system. Three decisions need you.</p>
      </div>
    </div>
  );
}

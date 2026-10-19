"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import GlyphPortal from "@/components/ui/glyph-portal";
import { site } from "@/lib/site";

/**
 * THE WORD, AS A DOOR. "EXODUS" set in the site's own face. Pick a letter,
 * scroll, and the camera passes through the ink into Exodus blue, where the
 * brand statement sits. The portal fetches nothing: it waits for the fonts
 * the page already loads, then mounts once with the resolved family so the
 * ink cannot shift under the camera.
 */
const FEATURES = [
  ["01", "Understand the operation", "We sit with the team that does the work and map where time and money leak. Nothing is built before that."],
  ["02", "Build what it actually needs", "Sometimes software, sometimes an assistant, sometimes an integration. The technology follows the problem."],
  ["03", "Stay until it pays", "The bar is signed before the build. The clock starts at deployment. If it misses, we keep working at no extra cost."],
] as const;

export function ExodusPortal() {
  const [face, setFace] = useState<string | null>(null);
  const [phone, setPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setPhone(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      // The body grotesk, not the serif display: the door is a letter you step
      // through, and it needs a heavy face with open counters to have room.
      setFace(getComputedStyle(document.body).fontFamily || "Arial, sans-serif");
    };
    const t = window.setTimeout(finish, 1500);
    document.fonts?.ready.then(finish).catch(finish);
    return () => { settled = true; clearTimeout(t); };
  }, []);

  return (
    <div data-exodus-portal className="relative border-t hairline">
      <style>{`
        [data-exodus-portal] [data-gp-hint]{display:none;}
        [data-exodus-portal] [data-gp-caption]{inset:calc(var(--gp-word-bottom,50%) + 84px) 24px auto;justify-content:center;}
        [data-exodus-portal] [data-gp-enter]{min-height:48px;padding:0 22px;gap:22px;border-radius:999px;background:#f3f1ec;color:#0a0b0f;font-size:.95rem;font-weight:500;transition:background .18s,box-shadow .18s;}
        [data-exodus-portal] [data-gp-enter]:hover{background:#fff;box-shadow:0 0 0 4px rgba(47,107,255,.22);}
        [data-exodus-portal] [data-gp-enter]:focus-visible{outline:2px solid #7fa6ff;outline-offset:4px;background:#f3f1ec;color:#0a0b0f;padding:0 22px;margin:0;}
        [data-exodus-portal] [data-gp-touch-picker]{top:auto;bottom:18px;left:50%;font-family:inherit;}
        [data-exodus-portal] [data-gp-select]{border-color:rgba(243,241,236,.18);border-radius:999px;background:#10121a;color:#b8bdc9;font-size:12px;}
        [data-exodus-portal] [data-gp-letter]:focus-visible{outline-color:#7fa6ff;}
        [data-exodus-portal] [data-xp-eyebrow]{position:absolute;inset:auto 24px calc(100% - var(--gp-word-top,35%) + 28px);margin:0;text-align:center;}
        [data-exodus-portal] [data-xp-support]{position:absolute;inset:calc(var(--gp-word-bottom,50%) + 28px) 24px auto;margin:0;text-align:center;font-size:clamp(1rem,1.3vw,1.2rem);color:#b8bdc9;}
        [data-exodus-portal] [data-xp-scroll]{position:absolute;inset:auto 24px 6%;text-align:center;}
        @media(any-pointer:coarse){[data-exodus-portal] [data-xp-scroll]{display:none;}}
        [data-exodus-portal] [data-gp-content]{padding:5.5rem clamp(1.25rem,5vw,5rem) 6.5rem;font-family:inherit;}
        [data-exodus-portal] [data-gp-default-field]{display:none;}
        @media(max-height:560px){[data-exodus-portal] [data-xp-support]{display:none;}[data-exodus-portal] [data-gp-caption]{top:calc(var(--gp-word-bottom,50%) + 40px);}}
      `}</style>
      {face ? (
        <GlyphPortal
          word="EXODUS"
          focusChar="O"
          fontFamily={face}
          fontWeight={800}
          scrollLength={phone ? 1.6 : 2.2}
          enterLabel="Step through"
          style={{ fontFamily: face, "--gp-paper": "#0a0b0f", "--gp-ink": "#f3f1ec", "--gp-field": "#1e5eff", "--gp-foreground": "#f3f1ec" }}
          background={
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                transform: "scale(var(--gp-field-scale,1))",
                background:
                  "radial-gradient(circle at 24% 10%, rgba(150,178,255,.34), transparent 42%), radial-gradient(circle at 82% 26%, rgba(109,77,224,.26), transparent 38%), radial-gradient(circle at 50% 88%, rgba(8,9,13,.68), transparent 52%), linear-gradient(135deg,#21356e 0%,#27408a 46%,#141f44 100%)",
              }}
            >
            </div>
          }
          front={
            <>
              <p data-xp-eyebrow className="fig"><b>exodus</b> · noun · a departure; a movement from one place toward another</p>
              <p data-xp-support>Pick a letter. Scroll to leave the old way.</p>
              <span data-xp-scroll className="mono text-stone">Scroll ↓</span>
            </>
          }
        >
          <div className="mx-auto w-full max-w-6xl">
            <p className="mono text-paper/70">For us, it means leaving the old way of working.</p>
            <h2 className="display display-lg lg:display-xl text-paper mt-4 max-w-4xl">We build what your business runs on next.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {FEATURES.map(([n, h, t]) => (
                <div key={n} className="border-t border-paper/25 pt-4">
                  <p className="text-paper font-medium text-lg"><span className="mono text-paper/70 mr-3">{n}</span>{h}</p>
                  <p className="text-paper/85 text-[0.95rem] mt-2 leading-6">{t}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book a free audit</a>
              <Link href="/work/" className="btn !border-paper/40 !text-paper hover:!bg-paper/10" data-cursor="view">See the work</Link>
            </div>
          </div>
        </GlyphPortal>
      ) : (
        <div className="min-h-[70svh] grid place-items-center">
          <p className="display display-xl text-paper/20" aria-hidden>EXODUS</p>
        </div>
      )}
    </div>
  );
}

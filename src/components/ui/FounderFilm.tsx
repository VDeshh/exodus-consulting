"use client";

import { track } from "@/lib/track";

/**
 * SIGNATURE 12 — FOUNDER FILM. Full-width, muted poster, never autoplay with
 * sound. No film exists yet, so the frame is built and the treatment is
 * printed on it rather than faking a play state.
 */
export function FounderFilm() {
  return (
    <figure className="glass overflow-hidden relative md:aspect-[21/9]" data-cursor="start">
      <div className="absolute inset-0 grid-bg" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(47,107,255,0.14),transparent_55%)]" aria-hidden />
      <div className="relative md:absolute md:inset-0 p-6 md:p-10 flex flex-col justify-between gap-8 md:gap-0">
        <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <p className="fig"><b>Film</b> · documentary · muted until you press play</p>
          <span className="chip chip-in-build self-start">In production</span>
        </div>
        <div className="max-w-2xl">
          <p className="display display-lg text-paper">Why Exodus exists.</p>
          <p className="mt-4 text-silver max-w-xl">Building Fennec exposed how much companies lose doing things manually. That led to work across telecom, hospitality and municipal politics. Now Exodus enters a business, understands the operation, and builds the system that moves it forward.</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="btn btn-ghost !min-h-[56px] !px-5"
            aria-disabled="true"
            onClick={() => track("founder_video_play", { available: false })}
            title="The founder film is being shot. This frame will play it, muted, when it lands."
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M3 2l9 5-9 5z" fill="currentColor" /></svg>
            Play · coming with the shoot
          </button>
          <span className="mono text-stone hidden md:inline">founders in the room · whiteboard architecture · real venues · real software</span>
        </div>
      </div>
      <figcaption className="sr-only">Placeholder frame for the founder film, which has not been shot yet.</figcaption>
    </figure>
  );
}

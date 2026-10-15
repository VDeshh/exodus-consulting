"use client";

import { useRef, useState } from "react";
import type { ToolMedia } from "@/content/tools";
import { track } from "@/lib/track";

/**
 * Tool demo player. Poster first, nothing downloads until play is pressed.
 * Muted and inline so a phone plays it in place; never autoplays with sound.
 * A 4:5 vertical short is capped so it does not tower over the page.
 */
export function ToolVideo({ media, slug }: { media: ToolMedia; slug: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    setStarted(true);
    track("founder_video_play", { tool: slug, video: media.src });
    requestAnimationFrame(() => { ref.current?.play().catch(() => {}); });
  };

  const vertical = media.aspect === "4/5";

  return (
    <figure className={`glass overflow-hidden relative ${vertical ? "mx-auto w-full max-w-[22rem]" : ""}`} data-cursor="view">
      <div className="relative bg-bg-1" style={{ aspectRatio: media.aspect === "16/9" ? "16 / 9" : "4 / 5" }}>
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          poster={media.poster}
          preload="none"
          muted
          playsInline
          controls={started}
          loop
          aria-label={media.label}
        >
          <source src={media.src} type="video/mp4" />
        </video>

        {!started && (
          <button type="button" onClick={play} className="absolute inset-0 grid place-items-center group" aria-label={`Play: ${media.label}`}>
            <span className="absolute inset-0 bg-bg-0/45 group-hover:bg-bg-0/30 transition-colors" />
            <span className="relative btn btn-primary !min-h-[54px] !px-6">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M3 2l9 5-9 5z" fill="currentColor" /></svg>
              Play the demo
              <span className="mono text-bg-0/60">{media.seconds}s</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="fig p-4">{media.label}</figcaption>
    </figure>
  );
}

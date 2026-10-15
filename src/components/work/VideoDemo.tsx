"use client";

import { useRef, useState } from "react";
import { PROBLEM_TAGS } from "@/content/facts";
import { DEMO_KIND_LABEL, type Demo } from "@/content/demos";
import { track } from "@/lib/track";

/**
 * A product demo: poster frame first, nothing downloads until the visitor
 * presses play. Never autoplays with sound. Starts muted with controls, so a
 * phone can play it inline. `preload="none"` keeps the page weight honest.
 */
export function VideoDemo({ demo }: { demo: Demo }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const { video } = demo;

  const play = () => {
    setStarted(true);
    track("founder_video_play", { demo: demo.slug });
    requestAnimationFrame(() => { ref.current?.play().catch(() => {}); });
  };

  return (
    <figure className="glass overflow-hidden" data-cursor="view">
      <div className="p-5 md:p-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="fig"><b>{DEMO_KIND_LABEL[demo.kind]}</b> · {demo.capability} {demo.capabilityName}</p>
          <h3 className="display display-sm text-paper mt-2">{demo.name}</h3>
          <p className="text-silver mt-2 max-w-xl">{demo.short}</p>
        </div>
        {video.seconds > 0 && <span className="chip shrink-0 self-start">{Math.round(video.seconds)} sec</span>}
      </div>

      <div className="relative bg-bg-1" style={{ aspectRatio: `${video.width} / ${video.height}` }}>
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-contain bg-bg-1"
          poster={video.poster}
          preload="none"
          muted
          playsInline
          controls={started}
          loop
          aria-label={`${demo.name}. ${demo.short}`}
        >
          <source src={video.mp4} type="video/mp4" />
        </video>

        {!started && (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 grid place-items-center group"
            aria-label={`Play the ${demo.name} demo`}
          >
            <span className="absolute inset-0 bg-bg-0/45 group-hover:bg-bg-0/30 transition-colors" />
            <span className="relative btn btn-primary !min-h-[56px] !px-6">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M3 2l9 5-9 5z" fill="currentColor" /></svg>
              Play the demo
              {video.seconds > 0 && <span className="mono text-bg-0/60">{Math.round(video.seconds)}s</span>}
            </span>
          </button>
        )}
      </div>

      <figcaption className="p-5 md:p-6 grid gap-4">
        <div>
          <p className="fig">What the film shows</p>
          <ul className="mt-2 grid gap-1.5">
            {demo.shows.map((s) => (
              <li key={s} className="text-sm text-silver flex gap-2.5">
                <span className="text-signal-2 mt-1.5 h-1 w-1 rounded-full bg-current shrink-0" aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t hairline pt-4">
          <span className="fig mr-1">Built for · {demo.builtFor}</span>
          {demo.fixes.map((f) => <span key={f} className="chip">{PROBLEM_TAGS[f]}</span>)}
        </div>
        {demo.note && <p className="fig !normal-case !tracking-normal">{demo.note}</p>}
      </figcaption>
    </figure>
  );
}

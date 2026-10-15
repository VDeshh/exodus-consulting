"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { proof } from "@/content/facts";
import { site } from "@/lib/site";

/**
 * THE PROOF CORRIDOR. Real Fennec screens ride out of the vanishing point
 * toward the viewer: the operating layer that already exists, leaving the
 * old way behind. Every card is a capture of the live product, nothing
 * generated or stock. The corridor is decorative (aria-hidden inside the
 * component); the words carry the meaning.
 *
 * Cards are landscape 16:10 to match real UI captures, corners follow the
 * site's rounded system, and the rails open a little wider than the default
 * so the text column in the middle stays clear.
 */
const SCREENS = [
  { src: "/work/floorplan-editor.webp", alt: "Fennec operator floor plan editor" },
  { src: "/work/table-select.webp", alt: "Fennec guest table selection over a photo of the room" },
  { src: "/work/ferry-assistant.webp", alt: "Ferry AI agent roster inside Fennec" },
  { src: "/work/event-page.webp", alt: "A live Fennec public event page" },
  { src: "/work/campaign-composer.webp", alt: "Fennec campaign composer" },
  { src: "/work/discover-feed.webp", alt: "Fennec discover feed of events across the network" },
  { src: "/work/guest-pass.webp", alt: "Fennec guest pass" },
  { src: "/work/event-builder.webp", alt: "Fennec event builder" },
  { src: "/work/email-designer.webp", alt: "Fennec email designer" },
  { src: "/work/variance-weighing.webp", alt: "Fennec inventory variance" },
  { src: "/work/shot-flow-2.webp", alt: "Fennec workflow view" },
];

const PATH = {
  perspective: 26,
  cardWidth: 22,
  cardHeight: 14,
  cardRadius: 1.1,
  birthHeight: 1.4,
  exitHeight: 40,
  railBirth: -9,
  railExit: 42,
  fan: 3,
  turnBirth: 4,
  turnExit: 26,
};

const PATH_PHONE = { ...PATH, cardWidth: 40, cardHeight: 26, cardRadius: 2.4, exitHeight: 70, railExit: 48, perspective: 34 };

function usePhone() {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setPhone(mq.matches);
    on(); mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return phone;
}

export function ProofStream({
  eyebrow,
  title,
  lede,
  variant = "band",
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** `band` sits inside a page; `hero` is a full page header under the fixed nav. */
  variant?: "band" | "hero";
}) {
  const phone = usePhone();
  return (
    <ImageStreamHero
      images={SCREENS}
      cards={phone ? 7 : 9}
      speed={phone ? 20 : 24}
      axis={phone ? 58 : 52}
      path={phone ? PATH_PHONE : PATH}
      className={variant === "hero" ? "min-h-[78svh] lg:min-h-[92svh]" : "min-h-[64svh] lg:min-h-[86svh] border-t hairline"}
      data-cursor="view"
    >
      {/* dark vignette so the words stay legible over the corridor */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,11,15,0.92)_0%,rgba(10,11,15,0.7)_22%,rgba(10,11,15,0.12)_48%,rgba(10,11,15,0)_66%)]" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-0 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-0 to-transparent" aria-hidden />

      <div className={`relative z-10 wrap flex min-h-[inherit] flex-col items-center justify-center text-center ${variant === "hero" ? "pt-[calc(var(--nav-h)+2rem)] pb-12 lg:pt-[calc(var(--nav-h)+3rem)] lg:pb-16" : "py-16 lg:py-24"}`}>
        <p className="fig">{eyebrow}</p>
        <h1 className="display display-lg lg:display-xl text-paper mt-5 max-w-5xl">{title}</h1>
        {lede && <p className="lede mt-7 !max-w-2xl text-center">{lede}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3 w-full max-w-md">
          <Link href="/work/fennec/" className="btn btn-primary" data-cursor="view">See Fennec, the live product</Link>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor="start">Book a free audit</a>
        </div>
        <p className="fig mt-6 lg:mt-8 max-w-xs lg:max-w-none">Real screens from the live product · {proof.venues} named venues · {proof.eventCompanies} event companies</p>
      </div>
    </ImageStreamHero>
  );
}

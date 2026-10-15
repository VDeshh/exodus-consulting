import Image from "next/image";

/** The brand mark is the existing PNG (transparent, blue → violet). The only gradient on the site. */
export function Mark({ height = 22, className = "" }: { height?: number; className?: string }) {
  return (
    <Image
      src="/brand/exodus-logo.webp"
      alt=""
      aria-hidden
      width={Math.round(height * (1022 / 525))}
      height={height}
      priority
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}

export function Wordmark({ condensed = false }: { condensed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark height={condensed ? 16 : 20} />
      <span className={`font-semibold tracking-[0.1em] sm:tracking-[0.16em] text-paper whitespace-nowrap transition-all duration-300 ${condensed ? "text-[0.7rem] sm:text-[0.78rem]" : "text-[0.74rem] sm:text-[0.86rem]"}`}>
        EXODUS<span className="max-[400px]:hidden"> CONSULTING</span>
      </span>
    </span>
  );
}

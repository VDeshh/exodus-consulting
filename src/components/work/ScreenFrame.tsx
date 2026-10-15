import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Browser chrome around a product capture.
 *
 * The 21st.dev browser mockups carry a whole fake browser — tabs, bookmarks,
 * history, settings — and pull in shadcn primitives this project does not use.
 * All a screenshot needs is enough chrome to read as a real screen: the window
 * dots and a URL pill. `label` is what sits in that pill, so it says where the
 * capture came from rather than inventing a domain.
 */
export function ScreenFrame({
  src,
  alt,
  label,
  caption,
  aspect = "16/10",
  priority = false,
  children,
}: {
  src?: string;
  alt?: string;
  label: string;
  caption?: string;
  aspect?: string;
  priority?: boolean;
  children?: ReactNode;
}) {
  return (
    <figure className="screen-frame" data-cursor="inspect">
      <div className="flex items-center gap-3 border-b hairline px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </span>
        <span className="mono flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-[11px] uppercase tracking-wider text-stone">
          {label}
        </span>
      </div>
      <div className="relative bg-bg-1" style={{ aspectRatio: aspect.replace("/", " / ") }}>
        {src ? (
          <Image
            src={src}
            alt={alt ?? label}
            fill
            sizes="(min-width:1024px) 80vw, 100vw"
            className="object-cover object-top"
            priority={priority}
          />
        ) : (
          children
        )}
      </div>
      {caption && <figcaption className="fig p-4">{caption}</figcaption>}
    </figure>
  );
}

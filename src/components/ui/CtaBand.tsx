import Link from "next/link";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

export function CtaBand({ title = "Ready to depart the old way?", text = "Thirty minutes, and you leave with the arithmetic either way. Two founders on the call. You keep the map." }: { title?: string; text?: string }) {
  return (
    <section className="section border-t hairline" aria-label="Book a free operations audit">
      <Reveal className="wrap grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-end">
        <div>
          <p className="fig" data-reveal><b>Free</b> · 30 minutes · a founder answers</p>
          <p className="display display-lg text-paper mt-4" data-reveal>{title}</p>
          <p className="lede mt-5" data-reveal>{text}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end" data-reveal>
          <a href={site.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor="start">Book a free operations audit</a>
          <Link href="/#depart" className="btn btn-ghost">Tell us what&apos;s manual</Link>
        </div>
      </Reveal>
    </section>
  );
}

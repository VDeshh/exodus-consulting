import Image from "next/image";
import { founders, rules } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";
import { FounderFilm } from "@/components/ui/FounderFilm";
import { Expandable } from "@/components/ui/Expandable";

/**
 * 11 — FOUNDERS. You work with the builders. The story runs Fennec → Exodus,
 * because that is where the method came from. Bios are the approved text
 * from the live About page. Portraits are marked as still to be shot.
 */
export function Founders() {
  return (
    <section className="section border-t hairline" aria-labelledby="fnd-h2">
      <div className="wrap">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_1fr] items-end">
          <div>
            <p className="fig" data-reveal><b>11</b> · Founders</p>
            <h2 id="fnd-h2" className="display display-lg text-paper mt-4" data-reveal>You work with the builders.</h2>
          </div>
          <div className="body-2 space-y-4" data-reveal>
            <p>Not an account manager, then a salesperson, then a project manager, then an outsourced team. One of us designs it, one of us builds it, and both of us are in the room.</p>
            <p>We built Fennec first. Sitting with venue operators on live nights showed us how much a business loses to manual work, fragmented systems and bad visibility. The lesson did not stop at nightlife, so Exodus takes the same approach into other industries: understand the operation, build what it actually needs.</p>
          </div>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {founders.map((f) => (
            <article key={f.name} className="glass p-5 md:p-8 grid gap-5 md:gap-6 grid-cols-[6.5rem_1fr] md:grid-cols-[11rem_1fr] items-start" data-reveal>
              <div className="flat aspect-[4/5] relative overflow-hidden">
                <Image src={f.photo} alt={`${f.name}, ${f.role} of Exodus Consulting`} fill sizes="(min-width:768px) 11rem, 60vw" className="object-cover grayscale-[0.25] contrast-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-0/60 via-transparent to-transparent" aria-hidden />
              </div>
              <div>
                <p className="fig"><b>{f.role}</b> · {f.half}</p>
                <h3 className="display display-md text-paper mt-1">{f.name}</h3>
                <Expandable className="text-sm text-silver mt-4 leading-6" lines={4}>{f.bio}</Expandable>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {f.facts.map((x) => (
                    <li key={x} className="chip">{x}</li>
                  ))}
                </ul>
                <a href={`mailto:${f.email}`} className="link text-sm mt-3 inline-flex items-center min-h-[44px] [overflow-wrap:anywhere]">{f.email}</a>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div data-reveal>
            <p className="fig"><b>Different backgrounds.</b> Same question.</p>
            <p className="display display-md text-paper mt-3">Why are businesses still running modern operations through manual systems?</p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2 snap-row snap-bleed">
            {rules.map(([h, t], i) => (
              <li key={h} className="flat p-4" data-reveal>
                <p className="mono text-signal-2">0{i + 1}</p>
                <p className="text-paper font-medium mt-1">{h}</p>
                <p className="text-sm text-stone mt-1">{t}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-16">
          <FounderFilm />
        </div>
      </div>
    </section>
  );
}

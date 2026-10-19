import Link from "next/link";
import { engagements, fennecVenues, industries, proof, STATUS_LABEL } from "@/content/facts";
import { Reveal } from "@/components/ui/Reveal";

/**
 * 07 — THE PROOF. An impact ledger, not four counters. Every line has a
 * source and links to the study that supports it. No count-up animation.
 */
export function Ledger({ compact = false }: { compact?: boolean }) {
  const uniserve = engagements.find((e) => e.slug === "uniserve")!;
  const rows: { k: string; v: string; d: string; href: string; tag?: string }[] = [
    { k: "Engagements", v: String(proof.engagements), d: `${proof.live} live · ${proof.shipped} shipped · ${proof.inBuild} in build. Nothing here is a proposal.`, href: "/work/" },
    { k: "Named venues on Fennec", v: String(proof.venues), d: fennecVenues.join(" · "), href: "/work/fennec/", tag: "live" },
    { k: "Event companies on the network", v: proof.eventCompanies, d: "Publishing events on Fennec, the operating system we co-founded and still build.", href: "/work/fennec/", tag: "live" },
    { k: "Technician time, Uniserve", v: "~1 hr / day", d: uniserve.outcomes[0].detail, href: "/work/uniserve/", tag: "projection" },
    { k: "Founders on every engagement", v: String(proof.founders), d: "The people who scope the work ship it. An account manager is optional, through monthly support on a retainer for bigger projects.", href: "/about/" },
    { k: "Industries", v: String(industries.total), d: `${industries.built.length} where our own engagements sit. The method does not change when the sector does.`, href: "/industries/" },
  ];

  return (
    <section className={`${compact ? "section-tight" : "section"} border-t hairline`} aria-labelledby="ledger-h2">
      <div className="wrap">
        <Reveal className="max-w-3xl">
          {!compact && <p className="fig" data-reveal><b>The proof</b></p>}
          <h2 id="ledger-h2" className={`display ${compact ? "display-md" : "display-lg"} text-paper ${compact ? "" : "mt-4"}`} data-reveal>Everything we have built, at its real status.</h2>
          <p className="lede mt-6" data-reveal>A premium number without a meaning is a decoration. Every line below says what it counts and links to the work behind it.</p>
        </Reveal>

        <Reveal as="ul" className="mt-12 border-t hairline" stagger={0.06}>
          {rows.map((r) => (
            <li key={r.k} data-reveal>
              <Link href={r.href} className="group grid gap-2 md:grid-cols-[1.1fr_0.7fr_1.6fr_auto] items-baseline py-5 border-b hairline hover:bg-white/[0.02] transition-colors -mx-3 px-3 rounded" data-cursor="view">
                <span className="fig">{r.k}</span>
                <span className="display display-md tabular text-paper">{r.v}</span>
                <span className="text-sm text-silver">{r.d}</span>
                <span className="flex items-center gap-3 justify-self-end">
                  {r.tag && <span className={`chip chip-${r.tag === "projection" ? "projection" : r.tag}`}>{r.tag === "projection" ? "Projection" : STATUS_LABEL.live}</span>}
                  <span className="mono text-stone group-hover:text-paper transition-colors">→</span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

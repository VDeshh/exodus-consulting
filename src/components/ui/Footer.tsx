import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="wrap pb-28 lg:pb-10 pt-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-5 text-sm text-stone max-w-xs">
              <span className="text-silver">exodus</span>, noun. A mass departure. A movement of people leaving one place to begin something new.
            </p>
            <p className="mt-3 text-sm text-stone max-w-xs">We named the company after the moment a business decides to stop running the old way.</p>
          </div>
          <Col title="work" links={[["/work/fennec/", "Fennec"], ["/work/uniserve/", "Uniserve"], ["/work/palapa-tours/", "Palapa Tours"], ["/work/current/", "Current engagements"], ["/work/", "All work"]]} />
          <Col title="firm" links={[["/what-we-do/", "What we do"], ["/how-we-work/", "How we work and charge"], ["/about/", "About the founders"], ["/industries/", "Industries"], ["/contact/", "Contact"]]} />
          <Col title="start" links={[[site.calendly, "Book a free audit, 30 min"], [`mailto:${site.email}`, site.email], [site.instagram, "Instagram"]]} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 text-xs text-stone">
          <span className="mono">© {new Date().getFullYear()} exodus consulting · {site.base}</span>
          <span className="mono">two founders · no account managers · you own the code</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="fig mb-3">{title}</p>
      <ul className="space-y-0.5">
        {links.map(([href, label]) => (
          <li key={href}>
            {href.startsWith("http") || href.startsWith("mailto:") ? (
              <a href={href} className="text-sm text-silver hover:text-paper transition-colors flex items-center min-h-[44px] lg:min-h-0 lg:inline-block lg:py-2" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {label}
              </a>
            ) : (
              <Link href={href} className="text-sm text-silver hover:text-paper transition-colors flex items-center min-h-[44px] lg:min-h-0 lg:inline-block lg:py-2">
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

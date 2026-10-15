# Exodus Consulting — live site audit

Crawled 2026-09-16 from https://www.exdsconsulting.com (16 pages saved as text in `docs/reference/crawl/`, brand assets in `docs/reference/assets/`). This is the source of truth for every fact the redesign may use. Anything not on this page is unverified.

## 1. Stack, integrations, analytics

| Item | Live value |
|---|---|
| Framework | Static HTML pages, one CSS bundle (`exodus.css`, 52 KB), one JS file (`exodus.js`, 19 KB) |
| Fonts | Geist 300–700, Geist Mono 400/500 via Google Fonts |
| Analytics | None detected (no gtag, Plausible, PostHog, Fathom) |
| Lead flow | Calendly `calendly.com/shiv-exdsconsulting/30min` + `mailto:shiv@exdsconsulting.com`. No contact form, by stated design ("a form that posts into a queue nobody reads is worse than an address") |
| Social | Instagram `@exodus_consulting_` |
| Sitemap | Empty (79 bytes) |
| Pages | index, services, work, work-fennec, work-uniserve, work-palapa-tours, work-scoped, fennec-{events-floor, ticketing-guests, pos-payments, inventory-staff, media-intelligence}, industries + 22 industry pages, guarantee, about, contact |

## 2. Current brand system

| Token | Value |
|---|---|
| Background | `#FAF9F7` paper, `#F3F1ED`, `#EAE7E1` (light-first) |
| Ink | `#0F172A`, `#46506A`, `#8A93A6` |
| Lines | `#E4E1DA`, `#CFCBC2` |
| Accent | violet `#7C3AED` / `#6D28D9`, blue `#2563EB`, blue-soft `#E8EFFD` |
| Success | `#167C5B` |
| Radii | 8 / 10 / 12 px |
| Motion | 220 ms / 420 ms, `cubic-bezier(0.2,0.6,0.2,1)` |
| Type scale | h1 `clamp(2.75rem, 4.4vw+1.4rem, 4.25rem)`, body `clamp(1.0625rem,…,1.1875rem)`, mono 0.75–0.8125 rem |
| Logo | Blue→violet gradient "EX" mark: a three-bar chevron/train shape + X. PNG only, white background (`exodus-logo.png`) |
| Document brand (exodus-doc-formatter skill) | Navy `#0D1B3E`, blue `#3B6FE8`, charcoal `#1C1C2E`, Calibri. Different from the web palette. |

Editorial conventions worth keeping: "FIG. 01" captions, "INTERFACE DIAGRAM, not a screenshot" disclaimers, statuses always labelled (Live / Shipped / In build), "Projection, not a booked result" on every forecast, sources printed on every third-party stat.

## 3. Positioning as currently written

- H1: "We AI enable your business with custom technology."
- Sub: "We learn how your operation actually runs, then build the technology that fits it. We do it fast, and we keep it cost friendly."
- Meta title: "AI enablement and custom software for owner-led businesses"
- Operating principle: "Judgment stays human. Volume goes to software." / "Software does sorting, summarising, drafting, reconciling. People do the exception, the price, the send."
- Proof strap: "TWO FOUNDERS. DIRECT ACCESS. NO ACCOUNT MANAGERS, NO SLIDE DECKS." / "YOU OWN THE CODE. THE NUMBER IS AGREED BEFORE WE START."
- Brand definition (about + footer): "exodus — A mass departure. A movement of people leaving one place to begin something new." / "We named the company after the moment a business decides to stop running the old way. Then we build the thing it runs on next."
- Base: Vancouver, BC. Where: Canada, UK. Founders 2, account managers 0.

## 4. Services as currently structured

**Three kinds of work** (homepage): 01 AI opportunity audit → 02 Custom software → 03 Agent networks and copilots ("the third one waits for the first two").

**Six capabilities** (services page), each tagged with real status:

| # | Capability | Status | Running for |
|---|---|---|---|
| 01 | Customer-facing assistants (chatbot + voice agent) | In build | Uniserve |
| 02 | Ticket triage and support automation (classify, route, summarise, draft, approval gate) | In build | Uniserve |
| 03 | Knowledge and retrieval (Q&A over own docs, citations) | In build | Uniserve |
| 04 | Custom software and operating systems | Live / Shipped / In build | Fennec, Palapa, B-Side |
| 05 | POS, payments and integrations (two-way Square, Toast, Lightspeed) | Live | Fennec |
| 06 | Operational intelligence (Ferry AI, Revenue Copilot) | Live | Fennec |

Stated phases: Audit (free) → Phase 1 map → Phase 2 build + live pilot. Uniserve programme = 3 months. Custom software: Stage 1 audit + architecture → Stage 2 first working surface → Stage 3 production + iteration.

## 5. Engagements (the only clients that may be shown)

| # | Client | Sector | Status | What was built | Numbers allowed |
|---|---|---|---|---|---|
| 01 | Uniserve Communications Corporation | ISP/telecom, Canada | **In build** | Customer-facing chatbot + voice agent for residential support, all data and models hosted in Canada, 3-month AI enablement | **Projection only**: ~1 hr/technician/day, ~$10,000/technician/yr at ~$40/hr × ~250 days. "Not a booked result." Team size not published. |
| 02 | Fennec (co-founded, fennecapp.com) | Premium nightlife & events | **Live** | Full venue OS: floor plans, live ops, ticketing, guest CRM, bottle service, inventory, campaigns, analytics, Ferry AI network. POS sync Square/Toast/Lightspeed. Core + Ferry architected by Vishal. | 4 named venues (Harbour Event Centre, TradeX, The Pit UBC, The Show Ottawa), 20+ event companies. No hours/revenue metrics. |
| 03 | ABC | Municipal political party, Vancouver | **Live** | Record parsing + reconciliation with confidence scoring; targeted marketing campaign support | None. "No electoral or polling outcome claimed." Named with consent; no endorsement implied. |
| 04 | Palapa Tours Ottawa | Floating tiki-bar cruises | **Shipped, closed** | Custom tip-out software: totals pool per cruise, applies role split rules, records payout per staff member. Client owns code. | Qualitative only: consistent payouts, disputes stop. No screenshot exists; site uses a drawn diagram with placeholder percentages. |
| 05 | B-Side Group | Hospitality group, 3 restaurant venues | **In build** | Inventory software: per-site counts, one catalogue, bought-vs-sold variance, reorder points | None yet. No screenshots. |

**Not on the live site:** Matchbox Global (named in the brief), "20+ clients", "3+ enterprise", "40+ hours saved per week", "5+ years working with owners", "$75/hour". None of these can be used without confirmation.

## 6. Fennec detail (for the flagship case study)

Seven module families: 01 Events & floor ops (6 modules) · 02 Ticketing & guests (8 modules, one profile per guest across the network, scanner check-in) · 03 POS & payments (two modules, three connectors; Live Menu, Bar Management, Live Ordering) · 04 Inventory · 05 Staff (tip split) · 06 Media/marketing (campaigns from the live guest list) · 07 Intelligence (Ferry AI + Revenue Copilot reading voids, pricing, promoters, inventory).

Ferry AI: "a roster, not a chat." Screenshot shows five agents: Ferry (general), Marketing, Inventory, Staff, Events. Services page lists agents for sales analytics, event management, table and bottle, guestlist and reservations, promos and insights. Note: the real product UI uses cartoon fox avatars, which the brief asks the website not to lean on.

Real screenshots available on the live site: floor plan editor, campaign composer, Ferry assistant, guest table selection (photo-based map, T1–T7), public event page, discover feed. Venue photography also exists.

Product copy quotes usable verbatim (from fennecapp.com): "Design, version, and activate floor layouts in seconds." / "Floor plans, reservations, packages and live ops - synced with Square." / "Sell tickets, import guestlists, and check guests in with a scanner." / "A guest-facing feed of every event across the Fennec network."

## 7. Commercial model (the guarantee)

Six written terms: signed baseline before any build · clock starts at deployment · if it misses the bar, keep working at no additional cost · cancel any time · free operations audit up front · you own the code. Bar and timeframe set per engagement; no dollar amount guaranteed. Fee is fixed and quoted before the build.

Sequence: 1 Free operations audit (week 0) → 2 Baseline signed → 3 Narrow build (two or three things) → 4 Deployment, clock starts → 5 Measure against the signed page.

ROI calculator: people (1–50) × hours/week (1–40) × hourly cost ($15–200) × 48 weeks. Default 3 × 6 × $40 = 864 hrs, $34,560/yr. Labelled "an estimate from numbers you enter, not a promise."

**The 30-minute call is the free operations audit.** Brief's "Book a Free Operations Audit" wording is accurate. "Free first conversation, no commitment" is accurate.

## 8. Third-party statistics used (sources printed)

- McKinsey, State of AI 2025: 88% use AI, ~6% attribute >5% of profit to it
- MIT NANDA, The GenAI Divide 2025: 95% of enterprise AI pilots show no measurable P&L return
- RAND 2024: 80%+ of AI projects fail
- Deloitte 2025: ~93% of AI budgets on technology, ~7% on people
- HBR, The Short Life of Online Sales Leads 2011: 7× more likely to qualify a web lead inside an hour

## 9. Founders (approved biography text exists on /about)

**Shiv Lohia, Co-Founder.** BA Psychology + Master of Management, UBC. Apply Digital (Harvard Business School site). Co-founded Fennec. On engagements works the front half: sits with the owner, watches the process, writes the numbers down before code. shiv@exdsconsulting.com.

**Vishal Desh, Co-Founder.** Computer Science + Master of Management, UBC. Python, AWS, Azure. Co-founded Fennec, architected its core and the Ferry AI agent network. Owns the build: data layer, models, hosting constraints. vish@exdsconsulting.com.

Six working rules: two founders on every engagement · direct access · no account managers · no juniors on your budget · no deck-only strategy · we learn the business first.

No founder photography or video found on the live site.

## 10. Industries

22 listed. Six "where we have built": nightlife & hospitality, restaurants & bars, event venues & ticketing, telecom & ISPs, political parties & campaigns, tour & experience operators. Sixteen "where the same build applies." The site itself says the real footprint is three sectors: hospitality, telecom, municipal politics.

## 11. Brief vs live site: conflicts that change the build

1. **Brand mode.** Brief wants dark-first. Live site is light paper. Document brand is navy. Needs a decision.
2. **Colour.** Brief bans "purple AI gradients." The logo is a blue→violet gradient and the live accent is violet `#7C3AED`. Either the logo is evolved or violet stays as a controlled secondary.
3. **Proof metrics.** Brief's 20+ clients / 3+ enterprise / 40+ hours / 5+ years / $75/hr are not on the live site. Live proof is five named engagements with honest statuses plus Fennec's venue and event-company counts.
4. **Matchbox Global** is not on the live site. ABC and B-Side Group are.
5. **Service taxonomy.** Brief: AI Enablement / Custom Software / Operational Intelligence. Live: three kinds of work + six capabilities. Close, but the live version carries status tags per capability.
6. **The guarantee and ROI calculator** are the live site's central commercial idea and are absent from the brief. Recommend they stay central.
7. **Uniserve is in build** with projections only. The brief treats it as enterprise proof; it can be shown, but only as a build in progress with the projection labelled.
8. **Ferry agents** in the real product are cartoon foxes. The site can render Ferry as a network diagram, but real screenshots will show the avatars.

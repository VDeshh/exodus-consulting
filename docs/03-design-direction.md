# Design direction

Derived from the brief (`00-brief.md`) and the audit (`01-site-audit.md`). The ui-ux-pro-max design-system query returned a generic "AI purple + pink" palette; rejected on the brief's own rules. This document replaces it.

## Category

Business operating modernization. Not AI consulting, not automation, not app development. The live site already has the right operating principle: **judgment stays human, volume goes to software.** The redesign makes it visible.

Brand statement: **WE BUILD WHAT YOUR BUSINESS RUNS ON NEXT.**
Brand memory: **EXODUS. STOP RUNNING THE OLD WAY.**

## Colour (dark-first proposal, pending Q2/Q3)

| Role | Token | Hex | Meaning |
|---|---|---|---|
| Background 0 | `--bg-0` | `#0A0B0F` | The room |
| Background 1 | `--bg-1` | `#10121A` | Old-way surfaces (flat, opaque) |
| Glass | `--glass` | `rgba(20,23,32,0.55)` + 1px `rgba(255,255,255,0.08)` border, blur 12px | The new operating layer only |
| Light | `--paper` | `#F3F1EC` | Display type, reused from live `--paper-2` |
| Silver | `--silver` | `#B8BDC9` | Body |
| Stone | `--stone` | `#8A93A6` | Mono labels, reused from live `--ink-3` |
| Signal | `--signal` | `#2F6BFF` | Movement, connection, CTA. Sits between logo blue and live `#2563EB` |
| Signal soft | `--signal-soft` | `rgba(47,107,255,0.14)` | Line glows |
| Violet | `--violet` | `#6D4DE0` | Logo gradient end only, plus Ferry/AI nodes. Never as a wash |
| Advance | `--advance` | `#3DBE8B` | Completion, live status |
| Human | `--human` | `#E0A458` | Decision points, approval gates |
| Friction | `--friction` | `#D9534F` at 60% | Broken manual flows, leaks |

Old way: `--bg-1` flat cards, `--friction` hairlines, no blur, no border light.
New way: glass, `--signal` paths, `--advance` pulses, `--human` gates.

Light-mode alternative if Q2 keeps paper: invert bg to `#FAF9F7`, keep signal/advance/human/friction, glass becomes `rgba(255,255,255,0.6)` with `#E4E1DA` borders. Fennec screenshots then need a dark frame.

## Typography

- Display: **Geist 700/800**, `clamp(3rem, 7.5vw, 8.5rem)`, tracking -0.03em, line-height 0.92. Already the brand font; large and confident.
- Body: **Geist 400/500**, 17–19px, line-height 1.6, measure 68ch (live value).
- Technical: **Geist Mono 400/500**, 12–13px, uppercase, tracking 0.08em. Workflow labels, statuses, FIG captions, metrics.
- Statuses as mono chips: LIVE (advance), SHIPPED (paper), IN BUILD (human), PROJECTION (stone).

## Information architecture

```
/                     Home (the argument, 12 movements)
/what-we-do           Three stages → six capabilities with live status
/work                 Problem-led index + five engagement tiles
/work/fennec          Flagship OS case study, module families, Ferry
/work/uniserve        In-build case study, projection labelled
/work/palapa-tours    Shipped case study, calculation engine
/work/current         ABC (live) + B-Side Group (in build)
/how-we-work          Talk → Map → Build → Measure, the guarantee, ROI calculator
/about                Exodus definition, founder narrative, six rules, film
/industries           22 industries, six with engagements
/contact              Audit call (Calendly), mailto, what to bring
/insights             Build Notes (empty-state-ready, no fabricated posts)
```

Nav: EXODUS · What We Do · Work · Fennec · How We Work · About · [Book a free audit]

## Homepage narrative (12 movements)

| # | Movement | Signature experience | Real content |
|---|---|---|---|
| 01 | The old way | Hero: EMAIL, EXCEL, CRM, PDF, SLACK, INVOICE, BOOKING, PHONE, REPORT, DATABASE floating, friction lines. "THIS IS HOW MOST BUSINESSES STILL RUN." → fragments converge → "MOVE YOUR BUSINESS FORWARD." | CTA "Book a free operations audit" (accurate). Secondary "See our work" |
| 02 | You became the integration | Human node at centre, every system routes through them. "YOUR TEAM SHOULD NOT BE THE API." | The live site's three sentences: retyped into three systems; web lead sits until morning (HBR 7×); support answers the same questions weekly (Uniserve) |
| 03 | The cost | Manual task collapse: COPY PASTE CHECK FOLLOW UP EXPORT tiles accumulate 8:00→16:00, then group into flows. "AUTOMATE THE REPEATABLE. KEEP THE JUDGEMENT." | Sourced stats: 88%/6% McKinsey, 95% MIT NANDA, 93/7 Deloitte |
| 04 | Exodus | Operations audit X-ray: black box → transparent → bottlenecks lit. "SEE HOW YOUR BUSINESS ACTUALLY RUNS." | The free 30-minute audit as it really runs: workflow out loud, arithmetic in front of you, what is worth building, the map goes with you |
| 05 | The build | Three stages of one transformation: SEE (audit) → BUILD (software, automation, assistants) → ADVANCE (intelligence). Workflow → software morph | Six capabilities with status tags |
| 06 | The system | Exodus transition: split screen, old way 90% → 0% on scroll | "Software does sorting, summarising, drafting, reconciling. People do the exception, the price, the send." |
| 07 | The proof | Impact ledger, no fake counters | 5 engagements · 2 live · 1 shipped · 2 in build · 4 named venues · 20+ event companies. Each links to its study |
| 08 | Fennec | Venue floor plan: tables, tickets, guests, bar, inventory, promoters disconnected → one OS | The five-tool Saturday from the live case study; real screenshots |
| 09 | Ferry | Agent network diagram: orchestrator, Events, Marketing, Inventory, Staff; shared data behind, POS below, human above. "AI WORKS BETTER WHEN IT KNOWS THE WHOLE OPERATION." | Real agent roster; screenshot below as the live product |
| 10 | How we work + the guarantee | One line travels: TALK (30 min, free) → MAP → BASELINE SIGNED → BUILD → CLOCK STARTS AT DEPLOYMENT → MEASURE. ROI calculator inline | Live guarantee terms verbatim |
| 11 | Founders | "YOU WORK WITH THE BUILDERS." Fennec origin story → Exodus. Film section with poster placeholder | Approved bios from /about |
| 12 | CTA | "READY TO DEPART THE OLD WAY?" Old workflow fades, new one arrives. Bottleneck textarea → mailto draft | "Book a 30-minute call" · "Tell us what's manual" · "Free first conversation. No commitment." (accurate) |

## Mobile

Hero becomes the inbox: notifications stack (invoice overdue, booking needs update, customer waiting, inventory report, lead unanswered) → Exodus layer filters → "3 decisions need you." Old workflow is a vertical stream; architecture diagrams tap-to-expand; blur ≤ 8px; no horizontal overflow; CTA sticky after first scroll.

## Motion system

GSAP 3 + ScrollTrigger, Lenis smooth scroll (house pattern from fennec-site). Every animation expresses old → new: fragmentation, convergence, routing, collapse, assembly. Durations 220/420 ms for UI (live values), scroll-scrubbed for scenes. `prefers-reduced-motion`: scenes render their final frame, transitions become 200 ms fades. Off-screen scenes pause. Page transition: blocks travel to a thin central path, next page assembles from it; reduced motion = fade.

House pitfalls to respect (from memory): unlayered CSS vs Tailwind `fixed`, never transform a wrapper that contains a pinned element, sort/refresh late pins.

## Cursor (desktop only)

VIEW over case tiles · EXPLORE over workflow scenes · START over CTAs · INSPECT over architecture. Default cursor elsewhere. No trails.

## Source of truth

`src/content/facts.ts`: engagements[], statuses, venue list, event-company count, industries[], founders, guarantee terms, third-party stats with sources. Every number on the site reads from here. Outcomes carry `{ source, date, client, metric, approved }`.

## Quality test (from the brief)

Could another AI consultancy swap its logo into this site? The answer is no only if every scene is built from Fennec, Uniserve, Palapa, ABC and B-Side reality, the guarantee stays central, and the founders are named on the page. Keep checking against this.

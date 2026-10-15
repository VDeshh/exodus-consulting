# Build notes

Status as of 2026-09-16. Next 16.3 · React 19 · Tailwind 4 · GSAP 3.15 + ScrollTrigger · Lenis. Static export (`npm run build` → `out/`). Dev on port 3510 (`npm run dev`).

## What is built

| Route | Content |
|---|---|
| `/` | Twelve-movement argument: hero (old way → new way, pinned scrub), human integration toggle, manual task collapse, audit X-ray, three stages + six capabilities, workflow → software (Palapa), Exodus split-screen transition, impact ledger, Fennec OS (diagram becomes the real floor-plan editor), Ferry agent network, process + guarantee + ROI calculator, founders + film frame, depart CTA + bottleneck input |
| `/what-we-do` | Stages, "Where AI actually belongs" table, human-control ticket path |
| `/work` | Problem-led filter, five tiles with bespoke SVG covers |
| `/work/fennec` | Full case study + FennecOS and Ferry scenes + six real screenshots + seven module families |
| `/work/uniserve` | Case study with projection table, labelled as projection throughout |
| `/work/palapa-tours` | Case study + WorkflowMorph scene |
| `/work/current` | ABC and B-Side Group at their real status |
| `/how-we-work` | Stats, process line, guarantee, ROI calculator, the call, FAQ |
| `/about` | Definition, brand statement, founders, sectors |
| `/industries` | 22 industries; six with engagements link to the work |
| `/contact` | Two doors (Calendly, mailto), what to bring, response time |

Also: sitemap.xml, robots.txt, JSON-LD ProfessionalService, desktop cursor labels, reduced-motion final states for every scene, mobile inbox hero, analytics seam (`src/lib/track.ts` → `window.dataLayer`, no vendor yet).

## Source of truth

`src/content/facts.ts` holds every number, status, client and quote. `src/content/cases.ts` holds case-study copy with the live page it came from. Nothing on the site is outside those two files plus the crawl in `docs/reference/`.

## Signature experiences (brief) → implementation

1 Hero `scenes/Hero.tsx` · 2 Integration `scenes/Integration.tsx` · 3 Task collapse `scenes/TaskCollapse.tsx` · 4 Audit X-ray `scenes/AuditXray.tsx` · 5 Workflow → software `scenes/WorkflowMorph.tsx` · 6 Operational intelligence: folded into Ferry + Stages (no standalone dashboard scene, to avoid a fake dashboard) · 7 Fennec `scenes/FennecOS.tsx` · 8 Ferry `scenes/Ferry.tsx` · 9 Case environments `work/WorkGrid.tsx` covers + per-page scenes · 10 Bottleneck input `scenes/Depart.tsx` · 11 Exodus transition `scenes/Transition.tsx` · 12 Founder film `ui/FounderFilm.tsx` (frame only, film not shot).

## Deliberate omissions

- **No page transitions** (blocks → path). Static export + app router makes shared-element transitions fragile; a fade is the reduced-motion answer anyway. Revisit if wanted.
- **No 3D library.** Depth is done with layered glass, an isometric data plane in Ferry, and perspective on the Ferry container. Keeps the bundle small.
- **No Insights / Build Notes section yet.** Zero fabricated posts. Add when the founders write the first three (suggested titles in `02-open-questions.md` Q15).
- **No per-industry pages.** Index only; the live site's 22 sector pages are not recreated (Q11).
- **Founder film**: frame built, marked "In production".
- **Analytics**: events fire into `window.dataLayer`; pick a vendor (Q9).
- **Matchbox Global** and legacy metrics (20+ clients, 40+ hrs) omitted per decision on 2026-09-16.

## Headshots

`public/founders/shiv.jpg` is the live site’s photo. `vishal.jpg` is the grey-background headshot Vishal pasted in chat, recovered from the session transcript (`~/.claude/projects/.../<session>.jsonl` stores pasted images as base64). The old live-site photo is archived at `docs/reference/assets/vishal-livesite.jpg`.

## QA tooling

Scratchpad `qa/seq.mjs` (playwright-core driving the installed Chrome) wheel-scrolls through the page and screenshots each scene state. Dev-only `/?qa=<px>` scrolls to a position after paint. Chrome `--headless --screenshot` returns black frames when scrolled; use Playwright.

## Known GSAP lesson from this build

Never run an intro tween on a property the scrubbed ScrollTrigger timeline also tweens (`.tool` opacity). ScrollTrigger refreshes record the current value as the start state and lock in a mid-fade value. Intro only on properties the timeline never touches.

## Mobile pass (2026-09-16, later)

Audited all 11 routes at 390×844 with `qa/mobile.mjs`: horizontal overflow, elements wider than the screen, tap targets under 40px, text under 11px, hidden headings, console errors. Fixes: global `* { min-width: 0 }` (a no-wrap chip was forcing the page to 425px), chips wrap, phone layouts for the task-collapse list, audit friction list, Ferry architecture stack, Palapa interface (static), Fennec frame 4:3, smaller founder portrait, nav CTA visible on phones, 40px+ tap targets in footer, breadcrumb, founder emails, ROI sliders. Zero overflow and zero console errors on every route afterwards.

## Bubbly + speed pass (2026-09-17)

Pill buttons and chips, 22px glass and 14px flat radii, rounded nav, phone-only floating "Book a free audit" bar (appears after the hero, sits above the home indicator). All raster images converted to WebP with cwebp (work shots 1.6 MB → 0.6 MB, founders 476 KB → 104 KB); founder files renamed to `vishal-desh.webp` / `shiv-lohia.webp` to bust the one-year immutable cache. Backdrop blur is off on phones (glass falls back to a 90% solid). Film frame no longer masks its own text (grid mask moved to a child layer).

**Domain:** exdsconsulting.com and www.exdsconsulting.com are attached to the Vercel project (apex 308 → www). The vercel.app URLs are behind Vercel Authentication (Standard Protection), so the public URL is the custom domain. The old `-vert` alias was re-created but redirects to SSO.

## Third-party components (2026-09-18)

- `src/components/ui/image-stream-hero.tsx` (21st.dev, perspective corridor) wrapped by `scenes/ProofStream.tsx`: real Fennec screens streaming toward the viewer. Used as the home "07 · The proof" band before the ledger and as the Work page hero. Cards are 22×14 (landscape UI captures), 9 per rail, 24 s loop.
- `src/components/ui/glyph-portal.tsx` (Christian Katzmann, MIT, notice kept) wrapped by `scenes/ExodusPortal.tsx`: the word EXODUS as a scroll-through door into Exodus blue, replacing the About page's static brand-statement section. Font resolved from the page body (Geist) after `document.fonts.ready`, so no extra font request; portal colours via `--gp-*` variables (paper #0a0b0f, field #1e5eff).
- `src/lib/utils.ts` adds the `cn` helper the components import. No clsx/tailwind-merge dependency.

## Mobile rebuild (2026-09-21)

- **Navigation**: full-screen sheet on phones and tablets, opaque background, 56px-tall numbered rows, staggered entrance, scroll locked behind it, Escape and backdrop close, a free-audit CTA plus email/contact at the foot. Top scrim under the condensed pill so page content no longer shows through the gaps beside it. Wordmark drops "CONSULTING" below 400px so a 320px phone fits.
- **Buttons**: full-width and 52px tall below 640px; every button row stacks instead of wrapping into stubs.
- **Long lists become swipeable**: `.snap-row` turns a grid into a scroll-snap carousel below 1024px (capabilities, process steps, founder rules, Ferry agents, sector cards, call steps). `.snap-bleed` is the opt-in edge-to-edge variant, applied only where the row is a direct child of a page gutter; a nested row with the bleed pushed the page 7px wide at 320px.
- **Pinned scenes** no longer force `min-h-100dvh` on phones, and section padding starts at 3.25rem. The home page dropped from 26 400px to about 22 700px, About from 10 400 to 8 200.
- **Floating CTA**: gradient scrim behind it so text does not run underneath, and it stands down within 620px of the page foot where the real CTA lives.
- **Founder bios** clamp to four lines on phones with a Read more toggle (`ui/Expandable.tsx`); portraits shrink to a 6.5rem column beside the text.
- **Corridor on phones**: 7 cards, 20s loop, wider geometry, shorter frame. Glyph portal scroll travel drops to 1.6 viewports.
- Fixed a React shorthand/longhand warning: the corridor card mixed the `animation` shorthand with `animationDelay`.
- Verified at 320, 360, 390, 430, 768 and landscape 844×390: no horizontal scroll anywhere (`window.scrollX` stays 0), zero console errors on all 11 routes, no tap target under 40px.

## Product demos (2026-10-08)

`src/content/demos.ts` is the registry; `components/work/VideoDemo.tsx` is the player (poster first, `preload="none"`, muted, inline, controls only after press, no autoplay). Each demo is categorised against a capability number from facts.ts plus the work-filter problem tags, and carries a `kind` that is deliberately **not** an engagement status, so a film is never mistaken for a shipped client result. A demo only renders when `ready: true`, so a case study can never ship a broken player.

- **pm-scan** (`/work/uniserve`, published): reads the channels, threads, emails and tickets a project already runs on and prints what is urgent, red/amber, read-only. Categorised 06 Operational intelligence · operations, reporting, internal-tooling. 45s, 19 MB source → 2.1 MB mp4.
- **Dealership outbound call triage** (`ready: false`, held): dialer with ten lines in flight, routes answered calls to a free rep and pushes a customer brief on connect. Categorised 02 Ticket triage and support automation · ai-enablement, customer-experience, revenue-leakage. **Held because the film is branded Volkswagen Vancouver and that brand use is not cleared.**

Encoding: `ffmpeg -vf "scale='min(1600,iw)':-2" -c:v libx264 -crf 25 -preset slow -pix_fmt yuv420p -movflags +faststart -an`, poster is a representative still. mp4 only, no webm.

**Numbers inside films stay inside films.** The pm-scan film shows a before/after time figure; site prose does not restate it, and the demo note says the figures shown are illustrative rather than a measured client result.

## Tool pages (README pass, 13 Oct 2026)

Driven by Shiv's "READ ME FIRST - Website Content.docx" (Drive, 12 Oct 2026).

- `src/content/tools.ts` holds all 13 tools, copy verbatim from the doc. Fennec carries `href: "/work/fennec/"` so it links to the existing case study instead of generating a page; `toolPages` excludes it, giving 12 generated routes.
- `src/app/what-we-do/[slug]/page.tsx` renders each one: status chip, who it's for, what it does, how it works, works with, screenshots, `#demo`, next tool, CTA. Every page carries the same single button, "Book a free audit".
- Pages with no clip print "Demo coming soon." in place of the player, per the doc.
- `public/tools/` — 12 WebP screenshots (5.6MB → 860KB) and 7 mp4s (176MB → 17.5MB). Poster frames generated with ffmpeg at 25% of duration and wired into every video, so nothing downloads until play is pressed and no player opens on a black box.
- Fennec's dashboard capture joins the real-screens grid as Fig. 07 and its short clip sits in a new `#demo` section above the source note. Caption and lede both state the figures in it belong to a demo venue.
- Party name removed site-wide; the engagement reads "a municipal political campaign" (`facts.ts` slug `political-campaign`). No testimonials or client quotes anywhere.
- Internal-only files from the doc (recall demo, client-branded Dealership OS demo, process PDF with party logos) are not on the site.
- Build: 27 static pages. Live on www.exdsconsulting.com.

### Second pass, 15 Oct 2026

Vishal: "so many of the changes in the doc not done. fennec still there. No dental work is there at all."

- **Industries was the dental gap.** `built` listed six sectors carried over from the old-site crawl and named none of the three the tool pages are actually about. It now lists nine: Dental clinics, Car dealerships and MSPs and IT service providers added, each linking to its tool rather than to Work. `Healthcare clinics` and `Automotive dealers and service` left `applies`, since they are now named specifically in `built`. `total` is a getter over the two arrays, and both headings and the numbering offset derive from their lengths, so the counts cannot drift again.
- **`/work/current/#abc` was a dead anchor** in `BUILT_LINK` — the last trace of the party name in the code, left behind when the slug became `political-campaign`. Fixed, and the sector label is now "Political campaigns" per the naming rule.
- **Fennec**, on Vishal's instruction, is out of the top nav (reached through Work like every other project), out of the tools grid (12 cards, with a sentence under it linking to the case study, which is what the doc asked for), and its case page is trimmed: the Ferry scene, the seven module families and four of the seven screens are gone, and the pinned FennecOS scene scrubs over 240% instead of 340%. Page height 1440×900: 17k → 11.2k, against Uniserve 7.9k and Palapa 8.5k. Roughly 2.9k of what remains is pin scroll distance for the one scene.
- **Two demo notes overstated the assets.** Tools 01 and 06 said "Full demo"; the doc says a short video is available now and the full demo is coming. Corrected, and the video labels with them.

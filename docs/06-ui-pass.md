# UI pass with 21st.dev

Agreed with Vishal, 15 Oct 2026. Scope: **all four areas, rebuilding sections**
rather than decorating what is there.

## Targets, in order

1. **Home hero** — the problem→solution scroll transition. Most-revised piece
   on the site and the first thing anyone sees.
2. **The 12 tool pages** — `/what-we-do/<slug>/`. Built fast to get the Drive
   doc shipped: hero, two columns, screenshots, demo. The plainest pages and
   the most headroom.
3. **Work / case studies** — Fennec, Uniserve, Palapa, Current. Text-heavy,
   one scene each. Fennec was trimmed on 15 Oct; keep it at sibling length.
4. **Shared layer** — buttons, cards, chips, hover states, transitions, in
   `globals.css` and `components/ui/`.

## Constraints that do not move

- Copy is load-bearing. Tool-page text is verbatim from the Drive doc, and
  `facts.ts` / `cases.ts` remain the only source of clients, numbers and
  statuses. A visual rebuild may re-arrange text, never reword a claim.
- The naming rules hold: no party names, no dental or dealership clients, no
  testimonials, nothing from the doc's internal-only folder.
- Every tool page keeps exactly one button: "Book a free audit".
- Pages without a clip keep "Demo coming soon."
- Static export, so anything added must build under `output: "export"`.
- Current QA bar: no horizontal scroll at 320–430 and 768, no console errors,
  no tap target under 40px. Re-check after each section.

## Baseline to beat (1440×900 page heights, 15 Oct)

| Page | Height |
|---|---|
| /work/fennec/ | 11,222 (≈2,900 of it pin scroll) |
| /work/palapa-tours/ | 8,511 |
| /work/uniserve/ | 7,929 |
| /what-we-do/ | 7,585 |
| /what-we-do/<tool>/ | 3,900–5,200 |
| /industries/ | 3,921 |

## Status

Blocked on the `21st` MCP server. `.mcp.json` is written and `API_KEY_21ST` is
set in `~/.zshrc`; the server loads on the next Claude Code start.

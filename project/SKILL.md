# Shadow Threads — Design System Skill

Use this skill when designing anything for **Shadow Threads**, a conspiracy-themed apparel brand. The brand identity fuses **neumorphic light surfaces** with a **classified-dossier / blueprint** aesthetic.

## Starting any work

1. `@colors_and_type.css` — all tokens live here. Read first.
2. `@README.md` — voice, content fundamentals, visual vocabulary, hover/press rules.
3. `@ui_kits/website/` — reference implementation of the marketing site. Clone its patterns.
4. `@UFO Schematic Tee - Details.html` — reference product detail page.
5. `@preview/*.html` — atomic component examples.

## Non-negotiables

- **Typography is a two-family system.** Rajdhani = headings / labels / CTAs (tracked 0.1–0.25em, UPPERCASE). Share Tech Mono = body, prices, data. Never mix roles.
- **One accent.** `#e85d26` orange is for a single pulse/underline/crosshair/CTA glow per surface. If it's everywhere, it's broken.
- **Neumorphism is the chrome.** Every interactive element is `var(--neu-raised)` (resting) or `var(--neu-inset)` (active/pressed). No flat buttons, no drop shadows.
- **Blueprint overlays live on top.** Dashed dividers (25% opacity), L-corner marks, scan sweeps, 1px SVG schematic line art. These are the seasoning; neumorphism is the base.
- **Voice is redacted dossier.** `FILE REQUISITION` not "Buy Now". `IN SUPPLY` not "In stock". Sprinkle ref codes, coordinates, timestamps.
- **No emoji.** The single allowed pictogram is `●` (U+25CF), usually accent-colored.
- **Icons are 1px/1.5px stroke SVG.** Lucide is the approved substitution library.

## Motion

`scan-sweep` (4–5s linear), `pulse-dot` (2s), `arc-spin` on HUD rings (6s), `flicker` on status text (3s). Ease is `cubic-bezier(0.4, 0, 0.2, 1)`. Durations: 0.25s hover, 0.35s state, 0.45s overlay. No bounces, no springs.

## Assets

- `assets/products/tshirt-{1..6}.png` — product photography.
- `assets/favicon.svg`, `assets/hero.png` — brand marks.
- Never invent a seventh t-shirt from scratch — ask or use a placeholder with the correct treatment.

## When a brief asks for something new

- **A new page?** Reuse `Header` + `Footer` from the website kit. Hero pattern: full-width section, scan sweep on top, HUD rings in corners, centered title plate on a beige glass backdrop.
- **A new component?** Start from the closest `preview/*.html` card and port its tokens.
- **A divergent visual direction?** Add it as a Tweak on the existing design. Avoid forking into multiple files.

## Caveats

- Product detail page uses CSS filters to fake multi-angle imagery — real multi-angle photos would replace the placeholder views.
- The hero in the source project uses a Three.js wireframe UFO; the website kit swaps in a 2D SVG schematic for weight. Either is on-brand.

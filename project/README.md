# Shadow Threads — Design System

A design system for **Shadow Threads**, a conspiracy-themed apparel brand selling declassified t-shirts. Visually the product is a **neumorphic light surface** crossed with a **classified-dossier / blueprint** aesthetic: soft beige-gray panels, Rajdhani + Share Tech Mono lockups, warning-orange accents, redaction bars, schematic line art, scan-sweep animations.

## Source

- Local codebase: `shadowthreads-main/` (Vite + Three.js marketing site) — neumorphic CSS, three.js UFO hero, six t-shirt products
- Derived product details page: `UFO Schematic Tee — Details.html`

## Index

| File | Purpose |
|---|---|
| `colors_and_type.css` | All tokens: color, type, neumorphic shadows, radii, spacing, motion |
| `assets/products/*.png` | Six t-shirt product photos |
| `assets/favicon.svg`, `assets/hero.png` | Brand marks |
| `preview/*.html` | Cards shown in the Design System tab |
| `ui_kits/website/` | UI kit recreating the marketing website + product detail screen |
| `UFO Schematic Tee — Details.html` | Fully interactive product detail prototype |
| `SKILL.md` | Skill manifest for portability |

## Content fundamentals

The brand writes like a **redacted intelligence dossier**. Everything is clearance-gated, signal-decoded, classified.

- **Voice:** impersonal, archival, faintly paranoid. No "we/you" — the reader is an operator approaching a file. Copy refers to products as *subjects*, *schematics*, *dossiers*, *records*, *files*.
- **Casing:** UPPERCASE for all headings, nav, CTAs, tags, chips. Sentence case for paragraph prose. Mixed case is rare.
- **Tone:** terse, declarative, dated. `ENTRY LOGGED 03.04.2045 · SOURCE TS-2045`. Use dates, coordinates, ref codes (`REF:7F3A9`), encryption tags (`ENCR:AES`), protocol tags (`PROTO:OMEGA`).
- **CTAs are commands cloaked as protocol:** `FILE REQUISITION`, `ACCESS TERMINAL`, `DISMISS`, `SECURE LINK`. Never "Buy Now" or "Add to Cart". 
- **Status labels:** `IN SUPPLY` (not "in stock"), `WATCHED` (not "saved"), `ACTIVE`, `RESTRICTED`, `CLASSIFIED`, `REDACTED`, `DECLASSIFIED`.
- **Numbers over words:** 6/6 AVAIL, LVL 5, 240 GSM, 47.123°N · 122.456°W, F/2.8 · 1/250, 24–31 dBA, 11.2 m ± 0.3.
- **Decorative data:** sprinkle coordinates, frame counts, and reference IDs even when they don't mean anything — they sell the dossier vibe.
- **No emoji.** A single `●` character (U+25CF, usually accent-colored) acts as the brand's one pictogram — pulsing status dot, bullet marker, "active" indicator.
- **Punctuation:** `·` (middle dot) separates metadata fields. `→` and `—` for transitions. Slashes in paths. Ellipses are banned.

## Visual foundations

### Palette
- Canvas is a **warm-neutral beige-gray** (`#e8e8ec`), never pure white. Two recessed stops (`#dfe0e6`, `#d8d8df`) create neumorphic depth.
- Foreground is a **cool near-black** (`#1a1a2e`) — slightly blue-tinted, never true black.
- **One accent:** warning orange `#e85d26`. Used sparingly — a pulsing dot, a single underline, a crosshair, a CTA glow. If everything is accented, nothing is.
- **Redacted black** (`#111118`) is a different surface from fg-primary. Only appears on bars, overlays, and the toast.

### Typography
- Two families, strictly divided:
  - **Rajdhani** — all headings, nav, labels, CTAs, section tags. Condensed, squared, always tracked wide (0.1em–0.25em) and uppercased.
  - **Share Tech Mono** — body, data readouts, prices, tables, coordinates. Never tracked heavily.
- Never use Rajdhani for paragraphs or Share Tech Mono for titles — the contrast is the system.
- Tracking is *part of the typography* — a Rajdhani label without 0.18em letter-spacing reads wrong.

### Neumorphism (core motif)
Everything interactive is either **raised** (button, card, chip in resting state) or **inset** (selected chip, active size, image canvas, qty box). Paired shadows:
```
raised:  6px 6px 14px #c2c2c8,  -6px -6px 14px #ffffff
inset:   inset 3px 3px 8px #c2c2c8, inset -3px -3px 8px #ffffff
```
Pressing a button swaps raised → inset (+ optional scale 0.98). Selecting a chip swaps raised → inset + adds a 1px orange outline.

### Blueprint overlays (second motif)
Over and around neumorphic surfaces:
- **Dashed lines** at 25% opacity, often as dividers or `stroke-dasharray="3 3"`.
- **Corner marks** (four L-brackets) framing image panels.
- **Crosshair on hover** — two orange lines tracking the cursor with an `X / Y` coordinate label.
- **Scan sweep** — a thin gradient line animating top-to-bottom across images and the hero over 4–5s.
- **Schematic SVG** — simple line drawings of the product with dimension lines, leader callouts, and one or two orange dot highlights.
- **Background grid** — inside recessed panels, 16×16 grid at ~8% opacity.

### Cards & surfaces
- Product cards: raised neumorphic with a top metadata strip (code + pulsing dot), inset image well, hover lifts -5px with deeper shadow, redaction bar slides up to reveal product name/price.
- Spec sheets: inset recess + subtle grid background.
- Toast: redacted-black pill with a 1px orange border and a pulsing dot.

### Motion
- **Ease:** `cubic-bezier(0.4, 0, 0.2, 1)` on everything.
- **Speeds:** 0.25s for hovers, 0.35s for state changes, 0.45s for overlay transitions.
- **Signature animations:** scan sweep (4–5s linear infinite), status dot pulse (2s), arc-spin on HUD rings (6s), flicker (3s, opacity 1→0.5→0.9→1).
- No bounces, no springs, no rotation for flair. Motion is *instrument-like* — slow, measured, predictable.

### Hover / press
- **Links:** underline expands left→right (1.5px accent bar, 0.3s).
- **Buttons (primary):** acquire `var(--glow-accent)` + orange border + orange text; stay neumorphic-raised.
- **Buttons (press):** swap to inset + scale(0.98).
- **Chips/thumbs:** raised → inset + 1px orange outline when active.
- **Cards:** translateY(-4 to -5px) + deeper shadow.

### Borders & dividers
- No hard black lines. Dividers are either `1px solid rgba(138,138,154,0.25)` (blueprint-faint) or dashed. The one exception: inside the redacted overlay, a thin white/accent border is allowed.

### Imagery
- Product photography is **cool-neutral, softly lit, white backdrop** — matches canvas. No grain, no filters in the default treatment.
- The Tweaks panel on the product page offers `duotone` (grayscale multiply) and `blueprint` (invert + hue-rotate) alt treatments — these are optional exhibits, not the default.
- Never use stock photography of people.

### Layout
- 1400px max content width.
- 2rem horizontal padding.
- Sticky header with neumorphic bottom shadow.
- Product grid: 6 columns desktop → 3 → 2.
- Product detail: 80px thumb rail / fluid image / 460px info panel.

## Iconography

The codebase ships almost no icons — intentional. What exists:
- A tiny utility set (search/cart/bookmark) drawn as **1px stroke SVG**, 16–18px, no fill. Matches the blueprint line weight.
- The `●` character stands in for status indicators.
- Brand decorative SVGs (HUD rings, waveforms, saucer schematics) are **hand-drawn line art**, same 1px stroke, `stroke: var(--blueprint-line)`, accented sparingly with `stroke: var(--accent)`.
- No icon font, no FontAwesome, no Material icons.

**Substitution rule:** if you need a new utility icon, use **Lucide** (1.5–2px stroke, `currentColor`) — it's the nearest visual match. Flag the substitution. Never use filled-glyph icons, duotone icons, or emoji.

## Caveats / substitutions

- **Fonts:** Rajdhani + Share Tech Mono loaded from Google Fonts. No local font files in the source project.
- **Icons** are hand-drawn inline SVGs in the source; for new icons, Lucide is the recommended stand-in.
- **Product photography** is a single studio shot per SKU in the source — the detail page reuses one image across four "views" via CSS filters as a placeholder; real multi-angle photography would replace this.

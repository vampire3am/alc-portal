# Design — AECS Learning Center

A locked design system for this app. Every surface reads this file before visual changes.

## Genre

Modern-minimal: calm, academic, practical, and trustworthy.

## Macrostructure family

- Entry/auth surfaces: compact Marquee, left-biased statement with an adjacent access panel.
- App surfaces: Workbench, with a persistent navigation rail and one primary workspace.
- Content surfaces: Long Document, using readable measures and restrained section breaks.

## Theme

- `--color-paper`: `oklch(98.5% 0.006 248)`
- `--color-paper-2`: `oklch(95.8% 0.012 248)`
- `--color-ink`: `oklch(22% 0.035 255)`
- `--color-ink-2`: `oklch(43% 0.035 252)`
- `--color-rule`: `oklch(87% 0.018 248)`
- `--color-accent`: `oklch(62% 0.19 43)`
- `--color-focus`: `oklch(56% 0.18 250)`

## Typography

- Display: General Sans, weight 600–700, roman.
- Body: IBM Plex Sans, weight 400–600.
- Mono: IBM Plex Mono, weight 500.
- Display tracking: `-0.035em`.
- Body floor: 14px; primary reading copy: 16px.

## Spacing

Four-point named scale in `tokens.css`. Layout code uses semantic tokens for bespoke CSS.

## Motion

- Ease out: `cubic-bezier(0.16, 1, 0.3, 1)`.
- No page reveals or scroll effects.
- Interaction motion is limited to opacity and transform.
- Reduced motion uses instant state changes or opacity-only transitions under 150ms.

## Microinteractions stance

- Silent success for visible state changes.
- No celebratory toasts.
- Focus indicators appear instantly.
- Destructive or irreversible actions require explicit confirmation.

## CTA voice

- Primary: ink-filled, 8px radius, compact verb-first label.
- Secondary: paper surface with a visible rule.
- Disabled: visibly muted with a concise explanation.

## Per-page allowances

- Entry pages may use typography as the only enrichment.
- App pages use no decorative enrichment; function carries the page.
- Learning content uses reading typography and data-led controls.

## What pages MUST share

- AECS wordmark and ALC monogram.
- Navy/orange placement, with orange under 5% of each viewport.
- General Sans + IBM Plex Sans pairing.
- Eight-state interaction discipline and visible focus.
- Minimum 44px touch targets below 640px.

## What pages MAY differ on

- Workspace density and local toolbars.
- Content module layout.
- Whether a page uses the full side rail or compact mobile header.

## Exports

### tokens.css

The canonical implementation is `tokens.css` at the project root.

### Tailwind v4

`src/style.css` maps the canonical tokens into `@theme` aliases.

### DTCG

```json
{
  "color": {
    "paper": { "$value": "oklch(98.5% 0.006 248)", "$type": "color" },
    "ink": { "$value": "oklch(22% 0.035 255)", "$type": "color" },
    "accent": { "$value": "oklch(62% 0.19 43)", "$type": "color" }
  },
  "font": {
    "display": { "$value": "General Sans", "$type": "fontFamily" },
    "body": { "$value": "IBM Plex Sans", "$type": "fontFamily" }
  },
  "space": { "md": { "$value": "1.5rem", "$type": "dimension" } }
}
```

### shadcn/ui

```css
:root {
  --background: 98.5% 0.006 248;
  --foreground: 22% 0.035 255;
  --primary: 62% 0.19 43;
  --primary-foreground: 99% 0.004 250;
  --muted: 95.8% 0.012 248;
  --muted-foreground: 43% 0.035 252;
  --border: 87% 0.018 248;
  --input: 87% 0.018 248;
  --ring: 56% 0.18 250;
  --radius: 0.5rem;
}
```

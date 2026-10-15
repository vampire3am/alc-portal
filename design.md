# Design — AECS Learning Center

The locked visual system for the public site and enrolled learner workspace.

## Genre

Lumen Foundry: a precise academic instrument made from paper, darkness, light, type, and measured rules.

## Macrostructure family

- Public entry: Instrument Panel with a blueprint hero, functional learning-system apparatus, and live-style workflow readout.
- App surfaces: Workbench with persistent navigation and one primary task area.
- Learning content: Long Document with restrained dividers and readable measures.

## Theme

- Paper: `oklch(97% 0.008 265)`
- Surface: `oklch(99% 0.006 265)`
- Ink: `oklch(18% 0.014 265)`
- Muted ink: `oklch(45% 0.018 265)`
- Rule: `oklch(82% 0.02 265)`
- Indigo light: `oklch(46% 0.24 268)`
- Coral action accent: `oklch(58% 0.19 18)`

Night Foundry is a first-class alternate theme rather than a recolor. It uses near-black violet paper, luminous ivory ink, electric indigo, and warm brass. The theme control appears in both public and signed-in headers, follows the system preference initially, and persists the learner’s explicit choice.

The indigo anchor carries navigation, focus, diagrams, and primary action. Coral appears only on the hero verb and spectral detail. The public hero contains the sole decorative apparatus.

### Night tokens

- Paper: `oklch(10% 0.014 265)`
- Surface: `oklch(16% 0.018 265)`
- Ink: `oklch(96% 0.008 265)`
- Muted ink: `oklch(69% 0.016 265)`
- Rule: `oklch(29% 0.024 265)`
- Electric indigo: `oklch(72% 0.18 268)`
- Brass verb accent: `oklch(73% 0.17 42)`

## Typography

- Display: Instrument Serif, 400, roman only.
- Body: Geist, 400–600.
- Mono labels: JetBrains Mono, 400–500, uppercase.
- Hero statement: tightly tracked Instrument Serif at `0.94` line-height.
- Hero narrative copy: Instrument Serif for the editorial contrast seen in the Lumen reference; functional and long-form UI copy remains Geist.
- Prose is lowercase by default; email and password inputs preserve entered case.
- Italics are prohibited.

## Spacing and shape

Four-point named scale in `tokens.css`. Use hairline rules, 8px inputs, and 12px panels. Avoid pill-shaped containers except for true status tags.

## Motion

- Hero apparatus and accent underline reveal once in 320ms.
- Interaction motion is limited to opacity, transform, and border/color state.
- Reduced motion removes the reveal and shortens state changes.

## CTA voice

- Compact, verb-first labels.
- Primary: indigo field with light text.
- Secondary: paper field with visible rule.
- Disabled: visibly muted, with the form requirements still readable.

## Shared rules

- AECS wordmark and ALC monogram.
- Visible focus, 44px minimum touch targets, and semantic status colors.
- Day/night themes share the same hierarchy and preserve contrast across controls, panels, and the enrolled workspace.
- One real-data apparatus per public page; no fabricated outcomes or vanity metrics.
- No glass effects, generic icon cards, floating blobs, or excessive rounding.

## Exports

### tokens.css

The canonical implementation is `tokens.css` at the project root.

### Tailwind v4

`src/style.css` maps the canonical tokens into `@theme` aliases.

### DTCG

```json
{
  "color": {
    "paper": { "$value": "oklch(97% 0.008 265)", "$type": "color" },
    "ink": { "$value": "oklch(18% 0.014 265)", "$type": "color" },
    "accent": { "$value": "oklch(46% 0.24 268)", "$type": "color" },
    "accentSecondary": { "$value": "oklch(58% 0.19 18)", "$type": "color" }
  },
  "theme": {
    "night": {
      "paper": { "$value": "oklch(10% 0.014 265)", "$type": "color" },
      "ink": { "$value": "oklch(96% 0.008 265)", "$type": "color" },
      "accent": { "$value": "oklch(72% 0.18 268)", "$type": "color" }
    }
  },
  "font": {
    "display": { "$value": "Instrument Serif", "$type": "fontFamily" },
    "body": { "$value": "Geist", "$type": "fontFamily" },
    "mono": { "$value": "JetBrains Mono", "$type": "fontFamily" }
  },
  "space": { "md": { "$value": "1.5rem", "$type": "dimension" } }
}
```

### shadcn/ui

```css
:root {
  --background: 97% 0.008 265;
  --foreground: 18% 0.014 265;
  --primary: 46% 0.24 268;
  --primary-foreground: 99% 0.006 265;
  --muted: 94% 0.012 265;
  --muted-foreground: 45% 0.018 265;
  --border: 82% 0.02 265;
  --input: 82% 0.02 265;
  --ring: 52% 0.22 268;
  --radius: 0.5rem;
}

[data-theme="night"] {
  --background: 10% 0.014 265;
  --foreground: 96% 0.008 265;
  --primary: 72% 0.18 268;
  --primary-foreground: 10% 0.014 265;
  --muted: 13% 0.016 265;
  --muted-foreground: 69% 0.016 265;
  --border: 29% 0.024 265;
  --input: 29% 0.024 265;
  --ring: 78% 0.16 268;
}
```

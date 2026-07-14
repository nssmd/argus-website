# Opening Pixel Typography Design

**Date:** 2026-07-14

## Goal

Add a clearly visible but restrained pixel-font presence to the public
homepage opening animation without changing typography anywhere else on the
site.

## Scope

Only the animated `ARGUS`, `Argus`, and `argus` words inside
`BrandUniverse.astro` change:

- the 38 floating background words;
- the central animated ARGUS word as it cycles through type styles.

The initial central ARGUS remains Fraunces. Body copy, section headings,
navigation, logo assets, buttons, Chinese typography, and every non-homepage
page remain unchanged.

## Type Palette

Add two SIL Open Font License families from Google Fonts:

- **Silkscreen 400/700** for a hard, compact bitmap-grid voice;
- **Pixelify Sans 400–700** for a wider, more expressive pixel display voice.

Expose them as:

```css
--pixel-hard: "Silkscreen", "JetBrains Mono", ui-monospace, monospace;
--pixel-soft: "Pixelify Sans", "Plus Jakarta Sans", system-ui, sans-serif;
```

Font failure must preserve readable geometry through those fallbacks.

## Distribution

Extend the existing eight opening-animation font classes with:

- `.font-8`: Pixelify Sans, weight 600;
- `.font-9`: Silkscreen, weight 700, with slightly relaxed tracking.

The floating-word generator cycles over ten font classes. This gives the two
pixel families 20% of the 38 words. Use a deterministic permutation rather
than adjacent `.font-8` / `.font-9` placement so pixel words are distributed
across the field instead of clustering.

Add both classes to the central word's existing font-change sequence. Across
one complete sequence, pixel styles should occupy approximately 20–30% of
states. The sequence must not place the two pixel states consecutively.

## Motion and Responsive Behavior

- Keep all existing transforms, timing, scroll contraction, opacity, and
  palette animation unchanged.
- Do not add a new animation loop.
- Keep the existing font-size clamps for desktop and mobile.
- Tune only per-font tracking or line-height if a pixel face clips inside the
  existing glyph box.
- Under `prefers-reduced-motion: reduce`, the central word stays in its initial
  Fraunces state; floating background words remain static and may include the
  pixel classes.

## Loading and Performance

Extend the existing Google Fonts request in `SiteLayout.astro`; do not add a
second stylesheet request. Request only Silkscreen 400/700 and the Pixelify
Sans variable weight range used by the opening.

No JavaScript dependency, canvas rendering, image font, or additional runtime
animation is allowed.

## Accessibility and Validation

- The central semantic heading remains text and keeps its current accessible
  name.
- Floating words remain `aria-hidden`.
- Font loading must not change page order or interaction.
- Verify no clipping or horizontal overflow at 320, 390, 768, and 1440 pixels.
- Verify light, dark, and reduced-motion modes.
- Confirm computed styles show each new family in both floating words and the
  central animation sequence.

## Acceptance Criteria

1. Only the homepage opening animation gains pixel typography.
2. Exactly two pixel families are added.
3. Approximately 20% of floating words and 20–30% of central cycle states use
   pixel fonts without adjacent pixel states.
4. The central initial state remains Fraunces.
5. Existing motion, colors, copy, layout, and non-opening typography are
   unchanged.
6. All target widths remain free of clipping and horizontal overflow.

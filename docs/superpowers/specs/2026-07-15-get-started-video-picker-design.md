# Get Started External Video Picker Design

**Date:** 2026-07-15
**Status:** Approved

## Goal

Move the four-run video selector outside the CLI window and turn it into an
obvious, desirable film-selection surface. The CLI window becomes the selected
run's player rather than the container for navigation.

## Placement

The selector sits in the Terminal cockpit section:

1. section title, explanation, and `argus` launch command;
2. external film picker;
3. CLI video frame;
4. caption and capability chips.

The Get Started hero's primary "watch real runs" link targets the film picker,
not the top of the CLI frame.

## Film Picker

The picker is a horizontal rail with one card for each real run:

- Research direction → paper;
- Method → benchmark;
- Literary brief → final draft;
- Computational math → audit.

Each 16:9 card contains:

- the run's real poster image;
- a category badge;
- a prominent circular play control;
- a bottom readability gradient;
- task title;
- condensed or complete duration;
- pacing label such as variable speed or complete replay.

The section has a persistent heading:

- Chinese: `选择一条真实运行` / `四个任务，四种能力边界`;
- English: `Choose a real Argus run` / `Four tasks. Four capability boundaries.`

## States

### Default

All cards are visibly clickable. The first run is selected.

### Hover

- card rises 3–4 px;
- blue-gold ambient shadow strengthens;
- play control scales slightly;
- poster gains a subtle contrast increase.

### Selected

- continuous left-to-right blue-to-gold border;
- `NOW PLAYING` / `正在播放` badge;
- play control changes to a selected state;
- `aria-selected="true"`.

Focus-visible uses a high-contrast blue outline independent of hover.

## Interaction

- Clicking or activating a card changes the lower video source, poster,
  accessible label, download URL, and `aria-labelledby` relationship.
- On desktop, selecting a different run scrolls the CLI player into view with
  smooth behavior.
- On mobile, selection does not force a scroll jump.
- Auto-play occurs only while the section is visible and reduced motion is not
  requested.
- ArrowLeft/ArrowRight/ArrowUp/ArrowDown, Home, and End move selection.
- The selector remains a valid tablist and the CLI video remains one tabpanel.

## Responsive Behavior

Desktop displays all four cards in one horizontal row when space permits.

At narrower widths:

- the rail scrolls horizontally;
- `scroll-snap-type: x mandatory`;
- each mobile card is approximately 82% of the viewport width;
- the next card remains partially visible;
- left/right edge fades and a `Swipe to explore` / `滑动查看更多` hint communicate
  that more runs are available.

The rail must not cause page-level horizontal overflow.

## Visual System

Match the public Argus site:

- blue and gold ambient light;
- white/near-white glass picker background;
- deep navy poster overlays;
- Rounded 02 identity remains elsewhere unchanged;
- Plus Jakarta Sans / Noto Sans SC labels;
- JetBrains Mono metadata;
- 16 px card radius and restrained motion.

The dark CLI window remains unchanged except that its internal text tabs are
removed.

## Component Boundary

`ResearchVideoDemo.astro` owns:

- picker heading;
- poster rail;
- CLI frame bar;
- video panel;
- switching behavior.

`start.astro` no longer wraps the component in a `demo-frame terminal-demo`;
this avoids visually nesting the external rail inside the CLI window.

## Accessibility

- Cards are buttons with `role="tab"`.
- The selected card is the only tab in the sequential tab order.
- The player uses `role="tabpanel"`.
- Poster images remain decorative because each button has complete text and
  the video has an explicit accessible label.
- Motion and auto-play obey `prefers-reduced-motion`.
- Text remains readable without poster image loading.

## Acceptance Criteria

1. No video selector appears inside `.demo-frame`.
2. Four poster cards appear before the CLI frame.
3. Each card exposes category, title, duration, and pacing.
4. Selected state is visually obvious without relying on color alone.
5. Keyboard switching and tabpanel labeling remain correct.
6. Mobile shows a scrollable snap rail without page overflow.
7. English and Chinese Get Started pages render equivalent structures.
8. Existing four video sources, posters, and playback behavior remain intact.


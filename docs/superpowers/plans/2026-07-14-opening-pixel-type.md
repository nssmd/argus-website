# Opening Pixel Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Silkscreen and Pixelify Sans to only the public homepage opening ARGUS animation at a restrained 20–30% frequency.

**Architecture:** Extend the existing shared Google Fonts request and the opening's numbered font classes. Keep deterministic font assignment in `BrandUniverse.astro` and central cycle order in `SiteMotion.astro`; add a dependency-free static contract check to prevent typography leaking into the rest of the site.

**Tech Stack:** Astro 5, CSS custom properties, GSAP 3, Node.js static contract test.

## Global Constraints

- Only the homepage `BrandUniverse` opening animation changes.
- Add exactly Silkscreen 400/700 and Pixelify Sans 400–700.
- The central initial ARGUS remains Fraunces.
- Floating pixel words occupy 20%; central cycle pixel states occupy 20–30%.
- The two central pixel states are not consecutive.
- Body copy, section headings, navigation, logo assets, buttons, Chinese typography, colors, motion timing, and non-homepage pages remain unchanged.
- Extend the existing Google Fonts request; do not add a second request or runtime dependency.
- Preserve reduced-motion behavior and existing responsive font-size clamps.
- Work around, never overwrite, the current uncommitted `index.astro` and `global.css` changes.

---

### Task 1: Opening-only pixel font contract

**Files:**
- Create: `scripts/check-opening-pixel-type.mjs`
- Modify: `package.json`
- Modify: `src/layouts/SiteLayout.astro`
- Modify: `src/components/BrandUniverse.astro`
- Modify: `src/components/SiteMotion.astro`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: existing `.font-0` through `.font-7` classes and the `forms` sequence.
- Produces: `--pixel-hard`, `--pixel-soft`, `.font-8`, `.font-9`, deterministic ten-class floating distribution, and two non-adjacent pixel central states.

- [ ] **Step 1: Write the failing static contract check**

Create `scripts/check-opening-pixel-type.mjs`:

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [layout, brand, motion, css] = await Promise.all([
  read("src/layouts/SiteLayout.astro"),
  read("src/components/BrandUniverse.astro"),
  read("src/components/SiteMotion.astro"),
  read("src/styles/global.css"),
]);

assert.match(layout, /family=Pixelify\+Sans:wght@400\.\.700/);
assert.match(layout, /family=Silkscreen:wght@400;700/);
assert.equal((layout.match(/fonts\.googleapis\.com/g) ?? []).length, 1);
assert.match(css, /--pixel-hard:/);
assert.match(css, /--pixel-soft:/);
assert.match(css, /\.font-8\s*\{[^}]*var\(--pixel-soft\)/s);
assert.match(css, /\.font-9\s*\{[^}]*var\(--pixel-hard\)/s);
assert.match(brand, /font:\s*FONT_SEQUENCE\[index % FONT_SEQUENCE\.length\]/);
assert.match(brand, /const FONT_SEQUENCE = \[[^\]]*8[^\]]*9[^\]]*\]/s);
assert.match(motion, /\["ARGUS", 0\]/);
assert.match(motion, /\[[^\]]*, 8\]/);
assert.match(motion, /\[[^\]]*, 9\]/);

const formsMatch = motion.match(/const forms = \[([\s\S]*?)\]\s+as const/);
assert.ok(formsMatch, "central forms sequence missing");
const fonts = [...formsMatch[1].matchAll(/,\s*(\d+)\]/g)].map((match) => Number(match[1]));
const pixelIndexes = fonts.flatMap((font, index) => font >= 8 ? [index] : []);
assert.ok(pixelIndexes.length / fonts.length >= 0.2 && pixelIndexes.length / fonts.length <= 0.3);
assert.ok(pixelIndexes.every((index, offset) => offset === 0 || index - pixelIndexes[offset - 1] > 1));

for (const selector of [".section-head h2", ".page-hero h1", "body"]) {
  const rule = css.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\\\s*\\\\{([^}]*)\\\\}`, "s"));
  assert.ok(!rule || !/pixel-(?:hard|soft)/.test(rule[1]), `${selector} must not use pixel fonts`);
}

console.log("opening pixel typography contract passed");
```

Add to `package.json`:

```json
"check:opening-type": "node scripts/check-opening-pixel-type.mjs"
```

- [ ] **Step 2: Run the contract check and verify it fails**

```bash
npm run check:opening-type
```

Expected: FAIL on the missing Pixelify Sans Google Fonts family.

- [ ] **Step 3: Extend the existing font request and CSS palette**

Add the two families to the single Google Fonts URL in `SiteLayout.astro`.
In `:root`, add:

```css
--pixel-hard: "Silkscreen", "JetBrains Mono", ui-monospace, monospace;
--pixel-soft: "Pixelify Sans", "Plus Jakarta Sans", system-ui, sans-serif;
```

After `.font-7`, add:

```css
.font-8 { font-family: var(--pixel-soft); font-weight: 600; letter-spacing: -0.035em; }
.font-9 { font-family: var(--pixel-hard); font-weight: 700; letter-spacing: 0.015em; }
```

Do not change any existing selector outside the opening font-class block.

- [ ] **Step 4: Distribute floating and central pixel states**

In `BrandUniverse.astro`, define a non-clustered ten-entry permutation:

```ts
const FONT_SEQUENCE = [0, 8, 3, 1, 6, 2, 9, 5, 4, 7] as const;
```

Replace `font: index % 8` with:

```ts
font: FONT_SEQUENCE[index % FONT_SEQUENCE.length],
```

In `SiteMotion.astro`, use ten central states with pixel entries separated:

```ts
const forms = [
  ["ARGUS", 0], ["Argus", 3], ["argus", 8], ["ARGUS", 2], ["Argus", 5],
  ["argus", 7], ["ARGUS", 1], ["Argus", 9], ["argus", 4], ["ARGUS", 6],
] as const;
```

This keeps the initial `.font-0`, gives floating words 20% pixel states, and
gives the central cycle 20% pixel states without adjacency.

- [ ] **Step 5: Run focused checks and the full build**

```bash
npm run check:opening-type
npm run build
```

Expected: the opening contract prints PASS; Astro check/build and bilingual
check exit 0.

- [ ] **Step 6: Commit only the opening change**

```bash
git add package.json scripts/check-opening-pixel-type.mjs \
  src/layouts/SiteLayout.astro src/components/BrandUniverse.astro \
  src/components/SiteMotion.astro
git add -p src/styles/global.css
git commit -m "feat: add pixel typography to opening universe"
```

The interactive CSS staging must include only `--pixel-hard`, `--pixel-soft`,
`.font-8`, and `.font-9`; leave the operator's architecture-thesis CSS
unstaged.

### Task 2: Responsive visual verification and publication

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: built Astro site from Task 1.
- Produces: verified opening typography and pushed rebased commit.

- [ ] **Step 1: Start the existing preview server**

```bash
npm run preview -- --host 127.0.0.1 --port 4321
```

Expected: Astro serves the built site at `http://127.0.0.1:4321/`.

- [ ] **Step 2: Verify computed typography and overflow**

Using the existing browser automation available in the operator environment,
open `/` and `/zh.html` at widths 320, 390, 768, and 1440. For each width,
assert:

```js
document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

Confirm at least one `.font-8` and one `.font-9` floating word has the expected
computed family, and temporarily advance the central class to each font to
check the heading remains inside its bounding box.

- [ ] **Step 3: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`, reload, wait longer than one central
cycle interval, and confirm `[data-brand-core]` remains `font-0`. Floating
`.font-8` and `.font-9` words remain visible and static.

- [ ] **Step 4: Rebase without losing operator changes**

```bash
git fetch origin --prune
git rebase origin/master
```

Before rebasing, stash only the operator's pre-existing `index.astro` and
architecture-thesis `global.css` hunks with a named stash if Git requires a
clean tree. Restore them after rebase and confirm their diff is unchanged.

- [ ] **Step 5: Re-run build after rebase**

```bash
npm run check:opening-type
npm run build
```

Expected: both commands exit 0.

- [ ] **Step 6: Push and verify**

```bash
git push origin master
git fetch origin --prune
test "$(git rev-parse HEAD)" = "$(git rev-parse origin/master)"
```

Expected: push succeeds and local HEAD equals `origin/master`.

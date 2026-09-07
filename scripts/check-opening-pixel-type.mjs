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
assert.match(layout, /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>/);
assert.equal((layout.match(/fonts\.googleapis\.com\/css/g) ?? []).length, 1);
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

const getRule = (selector) => {
  const rule = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .find((match) => match[1].split(",").some((item) => item.trim() === selector));
  assert.ok(rule, `${selector} rule missing`);
  return rule[2];
};

for (const selector of [".section-head h2", ".page-hero h1", "body"]) {
  const rule = getRule(selector);
  assert.ok(!/pixel-(?:hard|soft)/.test(rule), `${selector} must not use pixel fonts`);
}

console.log("opening pixel typography contract passed");

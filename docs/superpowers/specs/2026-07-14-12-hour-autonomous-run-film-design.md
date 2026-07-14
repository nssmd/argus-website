# 12-Hour Autonomous Run Film Design

## Goal

Turn the existing 18:43 silent screen recording into a 100–110 second bilingual proof that Argus sustained a 12-hour autonomous research run, while keeping decisive review and recovery moments readable.

## Source Facts

- Source: `c5b9959bef6a9b928e3bc1b8f1a60996_raw.mp4`
- Duration: 18:43.2
- Resolution: 960×624
- Frame rate: 10 fps
- Codec: H.264
- Audio: none
- File size: 18,027,351 bytes
- Content: one continuous Argus terminal workbench whose stage, round, budget, request counters, role handoffs, failures, and review status change over time.

The website must not describe this 18:43 file as an uncut 12-hour recording. It is the source recording that represents the 12-hour run.

## Editorial Strategy

Use variable speed rather than uniform time compression.

| Output | Source | Approximate speed | Purpose |
| --- | --- | ---: | --- |
| 0–7s | 00:00–00:35 | 5× | Establish the mission and the no-human-intervention claim |
| 7–19s | 00:35–03:45 | 16× | Grounding and planning |
| 19–31s | 03:45–04:25 | 3× | First readable Reviewer rejection |
| 31–43s | 04:25–07:00 | 14× | Engineer evidence gathering and artifact work |
| 43–55s | 07:00–07:35 | 3× | Review-driven redirection without operator input |
| 55–66s | 07:35–09:15 | 10× | A new round and continued execution |
| 66–78s | 09:15–10:00 | 3–4× | Strong failure/rejection interval |
| 78–88s | 10:00–13:10 | 19× with a brief hold | Recovery and green status evidence |
| 88–96s | 13:10–17:40 | 34× | Long-horizon continuity montage |
| 96–105s | 17:40–18:43 | 7× | Submission/final state and evidence handoff |

Final timings may move by up to three seconds per segment after visual review, but total duration must remain between 100 and 110 seconds.

## Visual Language

The terminal recording remains the primary evidence. Decoration must never obscure its status, timeline, or role rows.

Persistent overlays:

- Top left: `REAL RUN · 12H CONTINUOUS`
- Top right: a 12-hour elapsed timeline mapped across the edited run
- Bottom: six-stage chapter rail:
  `Grounding → Planning → Execution → Rejection → Recovery → Submission`

Key moments:

- Slow to 1.5–4×.
- Push the relevant terminal region to 110–125%.
- Hold long enough to read the role, verdict, and next action.
- Show an English primary caption and a shorter Chinese secondary caption.

Fast intervals:

- Show only a compact speed marker such as `16×` or `34×`.
- Do not add explanatory subtitles over every status update.
- Use hard continuity cuts or short dissolves; avoid decorative transitions.

## Caption Copy

Use these milestone captions, adjusted only for line length:

1. `The mission enters Argus Life.`  
   `任务进入 Argus Life`
2. `Planner turns the objective into executable work.`  
   `Planner 将目标拆成可执行工作`
3. `Engineer gathers evidence and builds artifacts.`  
   `Engineer 收集证据并构建产物`
4. `Reviewer rejects insufficient evidence.`  
   `Reviewer 打回不足的证据`
5. `No human prompt. The system revises and continues.`  
   `无人接管，系统自行修正并继续`
6. `The run reaches submission review.`  
   `运行进入最终提交审查`

Opening card:

```text
12 HOURS. NO HUMAN INPUT.
12 小时，无人工接管
```

Closing card:

```text
ONE CONTINUOUS AUTONOMOUS RUN
Watch the full 18:43 source recording
```

## Deliverables

Create:

- `public/assets/demos/argus-12h-in-105s.webm`
- `public/assets/demos/argus-12h-in-105s.mp4`
- `public/assets/demos/argus-12h-in-105s-poster.webp`
- `public/assets/demos/argus-12h-source-18m43s.mp4`

Encoding:

- Preserve the 960×624 aspect ratio.
- WebM: VP9, two-pass when available, target 1.5–2.5 Mbps.
- MP4: H.264 High profile, fast-start MP4, CRF 21–24.
- Poster: WebP, quality 82–88.
- No synthetic audio is required.
- Strip metadata that exposes local paths or workstation details.

## Website Component

Create `src/components/AutonomousRunFilm.astro`.

Props:

```ts
type Props = {
  locale: "en" | "zh";
  showFullRun?: boolean;
};
```

Responsibilities:

- Render title, proof statement, video, chapter controls, and evidence note.
- Render WebM first and MP4 second.
- Use `preload="metadata"`, `muted`, `playsinline`, and standard controls.
- Pause when outside the viewport.
- Autoplay only when visible and reduced motion is not requested.
- Stop automatic playback behavior once the user manually controls the video.
- Seek to chapter times when a chapter is selected.
- Update the active chapter from `timeupdate`.
- Preserve keyboard operation and visible focus.

The component must not own page-specific positioning.

## Page Placement

Get Started:

- Reuse the component after the existing WebUI walkthrough.
- Place it before the final cockpit/CTA section.
- Show the 105-second film.
- Heading:
  `12 hours of autonomous research, compressed—not interrupted.`
- Show a link to the full 18:43 source recording.
- Explain that the source recording represents the 12-hour continuous run.

The English and Chinese Get Started routes use the same media assets and localized surrounding copy. The homepage does not render this component and must not request any of its media.

## Responsive and Accessible Behavior

- At 390 px, chapters become horizontally scrollable pills below the video.
- Controls and captions must not overlay the terminal on small screens.
- The video must never create horizontal page overflow.
- With `prefers-reduced-motion: reduce`, do not autoplay, auto-seek, or animate the active chapter.
- All chapter controls are native buttons with descriptive labels.
- Text contrast must meet WCAG AA.
- The full source link must include its duration.

## Loading and Delivery

- Do not preload the complete short film before it approaches the viewport.
- The full 18:43 source is never auto-loaded.
- Cloudflare and the origin must support byte-range requests.
- Existing 26-second WebUI demo behavior remains unchanged.
- The homepage must not load or link-preload these media assets.
- The film must not increase the initial JavaScript bundle through another animation library.

## Validation

Verify:

- Short-film duration is 100–110 seconds.
- Both encodings decode and seek correctly.
- Poster dimensions match the video aspect ratio.
- Six chapters seek to the intended milestone.
- Important captions remain on screen long enough to read at normal playback.
- No local paths, secrets, or unrelated session data are visible.
- English and Chinese pages contain correct localized copy.
- The homepage makes no request for the short film, source film, or poster.
- 390, 768, and 1440 px layouts do not overflow.
- Light, dark, and reduced-motion modes behave correctly.
- The full source is not requested until the user selects it.
- Public and origin asset hashes match after deployment.

## Scope Exclusions

- No voice-over.
- No licensed music dependency.
- No reconstruction of missing raw 12-hour footage.
- No changes to Argus runtime behavior.
- No replacement of the existing CLI or 26-second WebUI demonstrations.

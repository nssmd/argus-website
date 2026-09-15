import { desktopRelease } from "./desktopRelease";

const revision = "ba1dd5f924";

export const sourcePreview = {
  reviewedOn: "2026-09-15",
  windowsBaseline: desktopRelease.windows.version,
  macLinuxBaseline: desktopRelease.macLinux.version,
  revision,
  changesUrl: `https://github.com/lbx154/Argus/compare/v${desktopRelease.windows.version}...${revision}`,
  hostedGuideUrl: `https://github.com/lbx154/Argus/blob/${revision}/docs/hosted-research-trial.md`,
  verticalStoreGuideUrl: `https://github.com/lbx154/Argus/blob/${revision}/docs/vertical-store.md`,
} as const;

export const mathematicsSnapshot = {
  capturedAt: "2026-09-11T09:38:06Z",
  sourceGeneratedAt: "2026-09-11T09:37:37Z",
  sourceUrl: "https://open.argusbot.cn/",
  records: 757,
  processed: 617,
  independentlyReviewed: 593,
  provisional: 24,
  activeTargets: 41,
  confirmedOriginal: 0,
  pendingNovelty: 4,
} as const;

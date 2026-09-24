function releaseMetadata(version: string) {
  const assetsUrl = `https://github.com/lbx154/Argus/releases/download/v${version}`;
  return {
    version,
    assetsUrl,
    releaseUrl: `https://github.com/lbx154/Argus/releases/tag/v${version}`,
    checksumsUrl: `${assetsUrl}/SHA256SUMS`,
    trialGuideUrl: `https://github.com/lbx154/Argus/blob/v${version}/docs/desktop-trial.md`,
    workbenchGuideUrl: `https://github.com/lbx154/Argus/blob/v${version}/docs/workbench-plugins.md`,
  };
}

const windows = releaseMetadata("0.1.8");
const mac = releaseMetadata("0.1.9");
const linux = releaseMetadata("0.1.6");
const { version, assetsUrl: assets } = linux;

export const desktopRelease = {
  windows,
  mac,
  linux,
  platforms: "Windows / Mac / Linux",
  platformVersionLabel: `Windows v${windows.version} · Mac v${mac.version} · Linux v${linux.version}`,
  python: {
    version,
    wheelUrl: `${assets}/argus_skill-${version}-py3-none-any.whl`,
    sourceArchiveUrl: `${assets}/argus_skill-${version}.tar.gz`,
  },
  installers: [
    {
      ...windows,
      id: "windows",
      os: "windows",
      platform: "Windows 10/11",
      architecture: "x64",
      format: "EXE",
      size: "49.3 MiB",
      downloadUrl: `${windows.assetsUrl}/Argus-${windows.version}-setup.exe`,
      signatureUrl: `${windows.assetsUrl}/Argus-${windows.version}-setup.exe.sig`,
      sha256: "5ceeddb2a919db5bead9702e1535cc749e90a822c693746e25e9629c0e97d2ec",
    },
    {
      ...mac,
      id: "macos-aarch64",
      os: "macos",
      platform: "macOS 13+",
      architecture: "Apple Silicon",
      format: "DMG",
      size: "101.7 MiB",
      downloadUrl: `${mac.assetsUrl}/Argus-${mac.version}-macos-aarch64.dmg`,
      sha256: "92facd784de1bb2381bfa7f3fb4f611b60c52f8646c90694bc9b181e085baded",
    },
    {
      ...mac,
      id: "macos-x86_64",
      os: "macos",
      platform: "macOS 13+",
      architecture: "Intel",
      format: "DMG",
      size: "101.6 MiB",
      downloadUrl: `${mac.assetsUrl}/Argus-${mac.version}-macos-x86_64.dmg`,
      sha256: "cdac0fb2c21e7341dc61d9741cebdb33398a72c8c2b5686f8fbbf234acaab618",
    },
    {
      ...linux,
      id: "linux-appimage",
      os: "linux",
      platform: "Linux desktop",
      architecture: "x86_64",
      format: "AppImage",
      size: "132.4 MiB",
      downloadUrl: `${assets}/Argus-${version}-linux-x86_64.AppImage`,
      signatureUrl: `${assets}/Argus-${version}-linux-x86_64.AppImage.sig`,
      sha256: "021fbc0f559b70b613e793e3c193f9a6766a57ab8f9115cca55e6e1375147286",
    },
    {
      ...linux,
      id: "linux-deb",
      os: "linux",
      platform: "Ubuntu / Debian",
      architecture: "x86_64",
      format: "DEB",
      size: "64.6 MiB",
      downloadUrl: `${assets}/Argus-${version}-linux-x86_64.deb`,
      sha256: "a1d366050b38a7c218a99d9c6343386bc858147340d3dc7bf0d7bf52d1e76db0",
    },
  ],
} as const;

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

const windows = releaseMetadata("0.1.7");
const macLinux = releaseMetadata("0.1.6");
const { version, assetsUrl: assets } = macLinux;

export const desktopRelease = {
  windows,
  macLinux,
  platforms: "Windows / Mac / Linux",
  platformVersionLabel: `Windows v${windows.version} · Mac / Linux v${macLinux.version}`,
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
      size: "33.6 MiB",
      downloadUrl: `${windows.assetsUrl}/Argus-${windows.version}-setup.exe`,
      signatureUrl: `${windows.assetsUrl}/Argus-${windows.version}-setup.exe.sig`,
      sha256: "c9a4ab74a3ca2f2c14643e2b228c16be011efc3c77f4c2147a8b77749fb8707c",
    },
    {
      ...macLinux,
      id: "macos-aarch64",
      os: "macos",
      platform: "macOS 13+",
      architecture: "Apple Silicon",
      format: "DMG",
      size: "47.0 MiB",
      downloadUrl: `${assets}/Argus-${version}-macos-aarch64.dmg`,
      sha256: "33328f610cb1432179777e5496c189046de5f49c5f48ae8ac01164bf0561b6f0",
    },
    {
      ...macLinux,
      id: "macos-x86_64",
      os: "macos",
      platform: "macOS 13+",
      architecture: "Intel",
      format: "DMG",
      size: "46.9 MiB",
      downloadUrl: `${assets}/Argus-${version}-macos-x86_64.dmg`,
      sha256: "2f4fb1d05e743bc7e14cd8436b574d0ea407daac9abc975efd8296c6762a741e",
    },
    {
      ...macLinux,
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
      ...macLinux,
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

const version = "0.1.3";
const assets = `https://github.com/lbx154/Argus/releases/download/v${version}`;

export const desktopRelease = {
  version,
  releaseUrl: `https://github.com/lbx154/Argus/releases/tag/v${version}`,
  checksumsUrl: `${assets}/SHA256SUMS`,
  trialGuideUrl: `https://github.com/lbx154/Argus/blob/v${version}/docs/desktop-trial.md`,
  pythonWheelUrl: `${assets}/argus_skill-${version}-py3-none-any.whl`,
  sourceArchiveUrl: `${assets}/argus_skill-${version}.tar.gz`,
  installers: [
    {
      id: "windows",
      platform: "Windows 10/11",
      architecture: "x64",
      format: "EXE",
      size: "32.2 MiB",
      downloadUrl: `${assets}/Argus-${version}-setup.exe`,
      signatureUrl: `${assets}/Argus-${version}-setup.exe.sig`,
      sha256: "9f50fa4cafba88207786bfc3c68ef5559d741ca0467c285f724c45ec1f0ffbfd",
    },
    {
      id: "macos-aarch64",
      platform: "macOS 13+",
      architecture: "Apple Silicon",
      format: "DMG",
      size: "52.6 MiB",
      downloadUrl: `${assets}/Argus-${version}-macos-aarch64.dmg`,
      sha256: "44ceebdd5d72da01b735f63ee2ca988f6dd917719c647f45ac83c583c719ef47",
    },
    {
      id: "macos-x86_64",
      platform: "macOS 13+",
      architecture: "Intel",
      format: "DMG",
      size: "52.5 MiB",
      downloadUrl: `${assets}/Argus-${version}-macos-x86_64.dmg`,
      sha256: "2fda9c99b0731606a60d5cfeaceb80693aa7829b8dbcb75e031715a81e3c3bf2",
    },
  ],
} as const;

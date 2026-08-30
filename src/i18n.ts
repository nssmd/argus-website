export type Locale = "en" | "zh";

export function localeFromPath(pathname: string): Locale {
  return pathname === "/zh.html" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function pathForLocale(pathname: string, locale: Locale): string {
  const withoutLocale = pathname === "/zh.html"
    ? "/"
    : pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const withoutFileSuffix = withoutLocale.replace(/(?:\/index)?\.html$/, "");
  const base = withoutFileSuffix === "" || withoutFileSuffix === "/" ? "/" : `${withoutFileSuffix.replace(/\/$/, "")}/`;
  return locale === "zh" ? (base === "/" ? "/zh/" : `/zh${base}`) : base;
}

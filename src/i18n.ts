export type Locale = "en" | "zh";

export function localeFromPath(pathname: string): Locale {
  return pathname === "/zh.html" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function pathForLocale(pathname: string, locale: Locale): string {
  const base = pathname === "/zh.html"
    ? "/"
    : pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return locale === "zh" ? (base === "/" ? "/zh.html" : `/zh${base}`) : base;
}

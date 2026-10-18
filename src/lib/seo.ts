import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { ILocalization, Locale } from "@/types/api/api.types";

// The site's public address: canonical, hreflang and the sitemap use it, so they do not
// depend on the host a request came through.
export const SITE_URL = (process.env.SITE_URL || "https://lps.uz").replace(/\/$/, "");

// A path in a language: Russian (the default) has no prefix, English lives under /en,
// and every address ends with "/" (trailingSlash in next.config).
export function localePath(locale: string, path: string = "/"): string {
    const clean = path === "/" || path === "" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
    if (locale === routing.defaultLocale) return clean;
    return clean === "/" ? `/${locale}/` : `/${locale}${clean}`;
}

export const absoluteUrl = (locale: string, path: string = "/") => `${SITE_URL}${localePath(locale, path)}`;

export type LocalePaths = Record<Locale, string>;

// The same path in both languages (pages without a translated slug).
export const samePaths = (path: string): LocalePaths => ({ ru: path, en: path });

// "<base>/<id>-<slug>" in both languages: slugs can differ per language.
export const entityPaths = (base: string, id: number, localization: ILocalization): LocalePaths => ({
    ru: `${base}/${id}-${localization.ru.slug}`,
    en: `${base}/${id}-${localization.en.slug}`,
});

// canonical to the page itself and hreflang to both versions; x-default is Russian.
export function pageAlternates(locale: string, paths: LocalePaths): NonNullable<Metadata["alternates"]> {
    return {
        canonical: absoluteUrl(locale, paths[locale as Locale] ?? paths.ru),
        languages: {
            ru: absoluteUrl("ru", paths.ru),
            en: absoluteUrl("en", paths.en),
            "x-default": absoluteUrl("ru", paths.ru),
        },
    };
}

// Cart, checkout, account, compare, wishlist, search, order: per visitor, nothing to index.
export const NOINDEX: Metadata["robots"] = { index: false, follow: true };

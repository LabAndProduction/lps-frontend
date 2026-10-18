import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ILocalization } from "@/types/api/api.types";
import { absoluteUrl, entityPaths, LocalePaths, samePaths } from "@/lib/seo";

// /sitemap.xml: every public page in Russian and English, each entry naming its twin in
// the other language. Built from the API once an hour.
export const revalidate = 3600;

interface IEntity {
    id: number;
    slug: string;
    localization: ILocalization;
    url?: string;
}

const API = process.env.API;

async function api<T>(path: string): Promise<T | null> {
    try {
        const response = await fetch(`${API}${path}`, {
            headers: { Accept: "application/json", "Accept-Language": routing.defaultLocale },
            next: { revalidate },
        });
        return response.ok ? ((await response.json()) as T) : null;
    } catch {
        return null;
    }
}

// all pages of a paginated list
async function all(path: string): Promise<IEntity[]> {
    const items: IEntity[] = [];
    for (let page = 1; page <= 200; page++) {
        const sep = path.includes("?") ? "&" : "?";
        const data = await api<{ data: IEntity[]; meta?: { last_page: number } }>(`${path}${sep}page=${page}`);
        if (!data?.data?.length) break;
        items.push(...data.data);
        if (!data.meta || page >= data.meta.last_page) break;
    }
    return items;
}

function entry(paths: LocalePaths, priority: number): MetadataRoute.Sitemap {
    return routing.locales.map((locale) => ({
        url: absoluteUrl(locale, paths[locale]),
        changeFrequency: "weekly" as const,
        priority,
        alternates: {
            languages: {
                ...Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, paths[l])])),
                "x-default": absoluteUrl(routing.defaultLocale, paths.ru),
            },
        },
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [categories, products, brands, news, pages] = await Promise.all([
        api<{ data: IEntity[] }>("categories").then((d) => d?.data ?? []),
        all("products?quantity=36"),
        all("brands/"),
        all("publications?quantity=50"),
        api<{ data: IEntity[] }>("pages").then((d) => d?.data ?? []),
    ]);

    return [
        ...entry(samePaths("/"), 1),
        ...["/about", "/contacts", "/brands", "/news"].flatMap((path) => entry(samePaths(path), 0.5)),
        ...categories.flatMap((c) => entry(entityPaths("/categories", c.id, c.localization), 0.9)),
        ...products.flatMap((p) => entry(entityPaths("/product", p.id, p.localization), 0.8)),
        ...brands.flatMap((b) => entry(entityPaths("/brands", b.id, b.localization), 0.6)),
        ...news.flatMap((n) => entry(entityPaths("/news", n.id, n.localization), 0.4)),
        // the info pages (delivery, payment, warranty…); "О компании" is /about, the
        // home page and the brands list have their own addresses above
        ...pages
            .filter((p) => p.url?.includes("/pages/") && p.slug !== "o-kompanii")
            .flatMap((p) => entry(entityPaths("/pages", p.id, p.localization), 0.4)),
    ];
}

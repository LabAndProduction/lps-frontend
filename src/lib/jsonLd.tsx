import { ISettings } from "@/types/api/settings.types";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { SITE_NAME } from "@/lib/seoTexts";

/* Structured data (schema.org JSON-LD) for search engines: the organisation, product
   cards and breadcrumbs. Only facts the API gives are used - no ratings (every product
   carries the same default 5 of 1), no price when it is 0. */

type Json = Record<string, unknown>;

export function JsonLd({ data }: { data: Json | Json[] }) {
    return (
        <script
            type="application/ld+json"
            // "<" escaped so a text field can never close the script tag
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}

const isUrl = (v?: string | null) => !!v && /^https?:\/\//.test(v);
const plain = (html?: string | null) =>
    (html || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();

export function organizationJsonLd(settings: Partial<ISettings> | null | undefined): Json {
    const sameAs = [
        ...new Set(
            [settings?.telegram, settings?.facebook, settings?.instagram, settings?.linkedin, settings?.youtube].filter(
                (v): v is string => isUrl(v),
            ),
        ),
    ];
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: settings?.title || SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/logo.png`,
        ...(settings?.email ? { email: settings.email } : {}),
        ...(settings?.phone ? { telephone: settings.phone } : {}),
        ...(settings?.address
            ? { address: { "@type": "PostalAddress", streetAddress: settings.address, addressLocality: "Ташкент", addressCountry: "UZ" } }
            : {}),
        ...(sameAs.length ? { sameAs } : {}),
    };
}

export interface ICrumb {
    name: string;
    path: string; // site path without the language, e.g. "/categories/116-..."
}

export function breadcrumbJsonLd(locale: string, crumbs: ICrumb[]): Json {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(locale, c.path),
        })),
    };
}

// "Под заказ…" is supplied on order, "Нет в наличии" is out of stock; an empty status
// follows the stock flag
function availability(inStock: number, status?: string | null): string {
    const s = (status || "").toLowerCase();
    if (s.includes("нет в наличии") || s.includes("out of stock")) return "https://schema.org/OutOfStock";
    if (s.includes("под заказ") || s.includes("order")) return "https://schema.org/BackOrder";
    if (s.includes("в наличии") || s.includes("in stock") || inStock > 0) return "https://schema.org/InStock";
    return "https://schema.org/OutOfStock";
}

interface IProductForLd {
    name: string;
    sku?: string | null;
    description?: string | null;
    brand_name?: string | null;
    current_price?: number | null;
    in_stock: number;
    stock_info?: string | null;
    img?: string | null;
    gallery?: { original: string }[] | null;
    categories?: { name: string }[] | null;
}

export function productJsonLd(product: IProductForLd, url: string, fallbackDescription: string): Json {
    const images = [
        ...new Set(
            [product.img, ...(product.gallery || []).map((g) => g.original)].filter(
                (src): src is string => typeof src === "string" && isUrl(src) && !src.includes("no-image"),
            ),
        ),
    ];
    const description = plain(product.description).slice(0, 500) || fallbackDescription;
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        url,
        description,
        ...(product.sku ? { sku: product.sku } : {}),
        ...(images.length ? { image: images } : {}),
        ...(product.brand_name ? { brand: { "@type": "Brand", name: product.brand_name } } : {}),
        ...(product.categories?.[0]?.name ? { category: product.categories[0].name } : {}),
        ...(product.current_price && product.current_price > 0
            ? {
                  offers: {
                      "@type": "Offer",
                      url,
                      price: product.current_price,
                      priceCurrency: "UZS",
                      availability: availability(product.in_stock, product.stock_info),
                      itemCondition: "https://schema.org/NewCondition",
                      seller: { "@id": `${SITE_URL}/#organization` },
                  },
              }
            : {}),
    };
}

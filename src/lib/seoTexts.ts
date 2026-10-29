import { Locale } from "@/types/api/api.types";

// Titles and descriptions for search results when the admin's SEO fields are empty
// (a filled field always wins). The layout adds " - LPS" to every title but the
// home page's. Titles use a plain hyphen, never a dash or a colon.

export const SITE_NAME = "LPS";

// A field counts as filled only if it says more than the page's own name
// (the home page's seo_title is just «Главная»).
export const filled = (value: string | null | undefined, name?: string) =>
    !!value && value.trim() !== "" && value.trim() !== name?.trim() ? value.trim() : null;

const T = {
    ru: {
        homeTitle: "LPS - Лабораторное оборудование и расходные материалы в Ташкенте",
        homeDescription:
            "Лабораторное оборудование, посуда, реактивы и расходные материалы ведущих брендов в Ташкенте. Каталог с ценами, доставка по Узбекистану.",
        homeHeading: "Лабораторное оборудование и расходные материалы в Ташкенте",
        product: (name: string) => `${name} - Цена в Ташкенте`,
        productDescription: (name: string, price?: number | null) =>
            price && price > 0
                ? `${name} - купить в LPS по цене ${new Intl.NumberFormat("ru-RU").format(price)} сум. Характеристики, наличие, доставка по Ташкенту и Узбекистану.`
                : `${name} - купить в LPS. Цена, характеристики, наличие. Доставка по Ташкенту и Узбекистану.`,
        category: (name: string) => `${name} - Купить в Ташкенте`,
        categoryDescription: (name: string) => `${name} в Ташкенте - каталог с ценами и характеристиками в LPS.`,
        brand: (name: string) => `${name} - Лабораторное оборудование в Ташкенте`,
        brandDescription: (name: string) =>
            `Оборудование и расходные материалы ${name} в Ташкенте - каталог с ценами в LPS. Доставка по Узбекистану.`,
    },
    en: {
        homeTitle: "LPS - Laboratory equipment and consumables in Tashkent",
        homeDescription:
            "Laboratory equipment, glassware, reagents and consumables from leading brands in Tashkent. Catalogue with prices, delivery across Uzbekistan.",
        homeHeading: "Laboratory equipment and consumables in Tashkent",
        product: (name: string) => `${name} - Price in Tashkent`,
        productDescription: (name: string, price?: number | null) =>
            price && price > 0
                ? `${name} - buy at LPS for ${new Intl.NumberFormat("en-US").format(price)} UZS. Specifications, availability, delivery in Tashkent and across Uzbekistan.`
                : `${name} - buy at LPS. Price, specifications, availability. Delivery in Tashkent and across Uzbekistan.`,
        category: (name: string) => `${name} - Buy in Tashkent`,
        categoryDescription: (name: string) => `${name} in Tashkent - catalogue with prices and specifications at LPS.`,
        brand: (name: string) => `${name} - Laboratory equipment in Tashkent`,
        brandDescription: (name: string) =>
            `${name} equipment and consumables in Tashkent - catalogue with prices at LPS. Delivery across Uzbekistan.`,
    },
};

export const seoTexts = (locale: string) => T[(locale as Locale) in T ? (locale as Locale) : "ru"];

import { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { getTexts } from "@/api/textsApi";
import { getLocaleTs } from "@/utils/getLocaleTs";
import { NOINDEX, pageAlternates, samePaths } from "@/lib/seo";
import { REVIEW_LINKS, REVIEW_PATH } from "@/lib/reviews";

/* /otzyv: the visitor picks the map to leave a review on (Google, Yandex, 2GIS). A page for
   customers and the QR code on printed cards, not for search: noindex. */
const TEXTS = {
    ru: {
        title: "Оставить отзыв",
        heading: "Оставьте отзыв о Lab & Production Solutions",
        lead: "Нам важно ваше мнение о работе LPS. Выберите карту, на которой вам удобнее оставить отзыв, - это займёт минуту.",
        cta: "Оставить отзыв",
        home: "Главная",
    },
    en: {
        title: "Leave a review",
        heading: "Leave a review about Lab & Production Solutions",
        lead: "Your opinion about LPS matters to us. Choose the map where it is easier for you to leave a review - it takes a minute.",
        cta: "Leave a review",
        home: "Home",
    },
};

const MAPS = [
    { key: "google", name: "Google Maps", href: REVIEW_LINKS.google, icon: <GoogleIcon /> },
    { key: "yandex", name: "Яндекс Карты", nameEn: "Yandex Maps", href: REVIEW_LINKS.yandex, icon: <YandexIcon /> },
    { key: "twogis", name: "2ГИС", nameEn: "2GIS", href: REVIEW_LINKS.twogis, icon: <TwoGisIcon /> },
];

export default async function ReviewPage() {
    const locale = await getLocaleTs();
    const t = TEXTS[locale === "en" ? "en" : "ru"];
    const { text } = await getTexts();

    return (
        <>
            <PageHeader breadcrumbs={{ links: [{ href: "/", title: text("Главная") || t.home }], current: t.title }} title={t.heading} />

            <section className="container pb-[3.75rem]">
                <p className="max-w-[40rem] text-secondary leading-160 mb-8">{t.lead}</p>

                <ul className="grid gap-5 sm:grid-cols-3">
                    {MAPS.map((map) => (
                        <li key={map.key}>
                            <a
                                href={map.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-full flex-col gap-5 rounded-card bg-white p-6 transition-300 hover:text-main">
                                <span className="flex items-center gap-3">
                                    {map.icon}
                                    <span className="text-lg font-semibold">{locale === "en" && map.nameEn ? map.nameEn : map.name}</span>
                                </span>
                                <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-btn bg-main px-4 py-2.5 text-sm font-semibold text-white transition-300 group-hover:bg-main-dark">
                                    {t.cta}
                                    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                                        <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocaleTs();
    const t = TEXTS[locale === "en" ? "en" : "ru"];
    return {
        title: t.title,
        description: t.lead,
        robots: NOINDEX,
        alternates: pageAlternates(locale, samePaths(REVIEW_PATH)),
    };
}

function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 shrink-0">
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2 3.5-5.1 3.5-8.7z" />
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
            <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
        </svg>
    );
}

function YandexIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 shrink-0">
            <path fill="#FC3F1D" d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.3 6.2 12.3 6.9 13.1.3.3.9.3 1.2 0 .7-.8 6.9-7.8 6.9-13.1A7.5 7.5 0 0 0 12 1.5z" />
            <circle cx="12" cy="9" r="3" fill="#fff" />
        </svg>
    );
}

function TwoGisIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 shrink-0">
            <rect width="24" height="24" rx="6" fill="#19AA1E" />
            <text x="12" y="15.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="Arial, sans-serif">2GIS</text>
        </svg>
    );
}

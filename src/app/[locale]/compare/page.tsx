import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import Compare from "@/components/pages/compare/Compare";
import { getFullUrl } from "@/utils/getFullUrl";
import { NOINDEX } from "@/lib/seo";

export default async function ComparePage() {
    const { text } = await getTexts();

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Сравнение"),
                }}
                title={text("Сравнение")}
            />

            <Compare />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/compare");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return {
        robots: NOINDEX,
        title: text("Сравнение"),
        description: text("Сравнение"),
        keywords: text("Сравнение"),
        openGraph: {
            title: text("Сравнение"),
            url: pageUrl,
            images: [
                {
                    url: imageUrl,
                },
            ],
            type: "website",
        },
    };
}

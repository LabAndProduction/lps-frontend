import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { getPage } from "@/api/pagesApi";
import About from "@/components/pages/about/About";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function AboutPage() {
    const { text } = await getTexts();
    const page = await getPage({ pageId: 3 });
    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: page.data.seo_title,
                }}
            />

            <About page={page} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage({ pageId: 3 });

    const pageUrl = await getFullUrl("/about");
    const imageUrl = await getFullUrl("/images/logo.png", false);

    return {
        title: page.data.seo_title,
        description: page.data.meta_description,
        keywords: page.data.meta_keywords,
        openGraph: {
            title: page.data.seo_title,
            description: page.data.meta_description,
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

import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { getPage } from "@/api/pagesApi";
import { IPageParamsWithId } from "@/types/pageParams.types";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import { notFound } from "next/navigation";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getFullUrl } from "@/utils/getFullUrl";
import { pageAlternates, entityPaths } from "@/lib/seo";
import { getLocaleTs } from "@/utils/getLocaleTs";

export default async function TextPage({ params }: IPageParamsWithId) {
    const { id } = await params;

    const slug = id.split("-").slice(1).join("-");
    const pageId = Number(id.split("-")[0]);
    const page = await getPage({
        pageId: pageId,
    });
    const { text } = await getTexts();

    if (!Number.isFinite(pageId) || !slug) notFound();

    if (!page || !page.data || page.data.slug !== slug) notFound();

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: page.data.seo_title,
                }}
                title={page.data.seo_title}
            />

            <SectionWrapper>
                <div className="custom-block xl:py-[3.75rem] lg:py-10 py-6 xl:px-[6.25rem] lg:px-10 sm:px-6 px-4">
                    <div>
                        <div
                            className="text-block"
                            dangerouslySetInnerHTML={{
                                __html: page.data.body,
                            }}></div>
                    </div>
                </div>
            </SectionWrapper>

            <LocalizationComponent id={pageId} localization={page.data.localization} startPath="/pages" />
        </>
    );
}

export async function generateMetadata({ params }: IPageParamsWithId): Promise<Metadata> {
    const locale = await getLocaleTs();
    const { id } = await params;
    const slug = id.split("-").slice(1).join("-");
    const pageId = Number(id.split("-")[0]);
    const page = await getPage({ pageId: Number(id.split("-")[0]) });

    if (!Number.isFinite(pageId) || !slug) notFound();

    if (!page || !page.data || page.data.slug !== slug) notFound();

    const pageUrl = await getFullUrl(`/pages/${id}`);
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return {
        alternates: pageAlternates(locale, entityPaths("/pages", pageId, page.data.localization)),
        title: page.data.seo_title || page.data.name,
        description: page.data.meta_description,
        keywords: page.data.meta_keywords,
        openGraph: {
            title: page.data.seo_title || page.data.name,
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

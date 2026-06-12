import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { IPageParamsWithId } from "@/types/pageParams.types";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import { notFound } from "next/navigation";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getFullUrl } from "@/utils/getFullUrl";
import { getPublication } from "@/api/publicationsApi";

export default async function SingleNewsPage({ params }: IPageParamsWithId) {
    const { id } = await params;

    const slug = id.split("-").slice(1).join("-");
    const newsId = Number(id.split("-")[0]);
    const publication = await getPublication({
        id: newsId,
    });
    const { text } = await getTexts();

    if (!Number.isFinite(newsId) || !slug) notFound();

    if (!publication || !publication.data || publication.data.slug !== slug) notFound();

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [
                        { href: "/", title: text("Главная") },
                        { href: "/news", title: text("Новости") },
                    ],
                    current: publication.data.seo_title,
                }}
                title={publication.data.seo_title}
            />

            <SectionWrapper>
                <div className="custom-block xl:py-[3.75rem] lg:py-10 py-6 xl:px-[6.25rem] lg:px-10 sm:px-6 px-4">
                    <div>
                        <div
                            className="text-block"
                            dangerouslySetInnerHTML={{
                                __html: publication.data.body,
                            }}></div>
                    </div>
                </div>
            </SectionWrapper>

            <LocalizationComponent id={newsId} localization={publication.data.localization} startPath="/pages" />
        </>
    );
}

export async function generateMetadata({ params }: IPageParamsWithId): Promise<Metadata> {
    const { id } = await params;
    const slug = id.split("-").slice(1).join("-");
    const newsId = Number(id.split("-")[0]);
    const publication = await getPublication({ id: newsId });

    if (!Number.isFinite(newsId) || !slug) notFound();

    if (!publication || !publication.data || publication.data.slug !== slug) notFound();

    const pageUrl = await getFullUrl(`/news/${id}`);
    const imageUrl = await getFullUrl("/images/logo.png", false);

    const { seo_title, name, meta_description } = publication.data;

    const title = seo_title || name;
    const description = meta_description || title;

    return {
        title: title,
        description: description,

        openGraph: {
            title: title,
            description: description,
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

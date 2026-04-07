import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { getPage } from "@/api/pagesApi";
import { IPageParamsWithId } from "@/types/pageParams.types";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import { notFound } from "next/navigation";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function TextPage({ params }: IPageParamsWithId) {
    const { id } = await params;

    const pageId = Number(id.split("-")[0]);
    const page = await getPage({
        pageId: pageId,
    });
    const { text } = await getTexts();

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

                        {/* <div className="text-block">
                            <div className="period-card">
                                <div>
                                    <h4>Кондиционер</h4>
                                </div>
                                <div>
                                    <p>Гарантийный период*</p>
                                    <h5>12 месяцев</h5>
                                </div>
                                <div>
                                    <p>Бесплатное сервисное обслуживание*</p>
                                    <h5>24 месяца</h5>
                                </div>

                                <div>
                                    <p>Dual Inverter Compressor</p>
                                    <h5>10 лет</h5>
                                </div>
                            </div>

                            <div className="info-block">
                                <p>
                                    Подробную информацию о предоставлении и ограничении гарантийного и бесплатного
                                    сервисного обслуживания, вы можете найти в гарантийном талоне, прилагаемом к вашему
                                    продукту.
                                </p>
                                <p>
                                    <small>Телефонный номер</small> <span>8 8000 805 805 или 2255</span>
                                </p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </SectionWrapper>

            <LocalizationComponent id={pageId} localization={page.data.localization} startPath="/pages" />
        </>
    );
}

export async function generateMetadata({ params }: IPageParamsWithId): Promise<Metadata> {
    const { id } = await params;
    const slug = id.split("-").slice(1).join("-");
    const page = await getPage({ pageId: Number(id.split("-")[0]) });

    if (!page || page.data.slug !== slug) notFound();

    const pageUrl = await getFullUrl(`/pages/${id}`);
    const imageUrl = await getFullUrl("/images/lg.svg", false);
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

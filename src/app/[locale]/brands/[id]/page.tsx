import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { IBrandPageParams } from "@/types/pageParams.types";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import { notFound } from "next/navigation";
import { getFullUrl } from "@/utils/getFullUrl";
import { getBrand } from "@/api/brandsApi";
import Brand from "@/components/pages/brands/Brand";
import { getProducts } from "@/api/productsApi";

export default async function BrandPage({ params, searchParams }: IBrandPageParams) {
    const { id } = await params;

    const { sort, direction, page } = await searchParams;

    const brandId = Number(id.split("-")[0]);
    const slug = id.split("-").slice(1).join("-");

    const brand = await getBrand({
        brandId: brandId,
    });
    if (!Number.isFinite(brandId) || !slug) notFound();

    if (!brand || !brand.data || brand.data.slug !== slug) notFound();

    const { text } = await getTexts();

    const products = await getProducts({
        page: Number(page),
        quantity: 20,
        brands: [brandId],
        order_by: sort,
        order_direction: direction,
    });

    const { localization, h1_name, name } = brand.data;

    const title = h1_name || name;

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [
                        { href: "/", title: text("Главная") },
                        { href: "/brands", title: text("Бренды") },
                    ],
                    current: title,
                }}
                title={title}
            />

            <Brand brand={brand} products={products} />

            <LocalizationComponent id={brandId} localization={localization} startPath="/brands" />
        </>
    );
}

export async function generateMetadata({ params }: IBrandPageParams): Promise<Metadata> {
    const { id } = await params;
    const slug = id.split("-").slice(1).join("-");
    const brandId = Number(id.split("-")[0]);
    const brand = await getBrand({ brandId });

    if (!Number.isFinite(brandId) || !slug) notFound();

    if (!brand || !brand.data || brand.data.slug !== slug) notFound();

    const pageUrl = await getFullUrl(`/brands/${id}`);
    const imageUrl = await getFullUrl("/images/logo.png", false);

    const { seo_title, name, meta_description } = brand.data;

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

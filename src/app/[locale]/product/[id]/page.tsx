import { Metadata } from "next";
import { getProduct, getProductAttributes } from "@/api/productsApi";
import { notFound } from "next/navigation";
import { IProductPageParams } from "@/types/pageParams.types";
import Advantages from "@/components/ui/sections/Advantages";
import { getTexts } from "@/api/textsApi";
import { getProductGroup } from "@/api/productGroupApi";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import Product from "@/components/pages/product/Product";
import PageHeader from "@/components/ui/PageHeader";
import SpecialSwiper from "@/components/ui/swipers/SpecialSwiper";
import { getFullUrl } from "@/utils/getFullUrl";
import { pageAlternates, entityPaths, productLanguages, NOINDEX } from "@/lib/seo";
import { Locale } from "@/types/api/api.types";
import { filled, seoTexts } from "@/lib/seoTexts";
import { getLocaleTs } from "@/utils/getLocaleTs";

export default async function CategoryPage({ params }: IProductPageParams) {
    const { id } = await params;
    const productId = Number(id.split("-")[0]);
    const slug = id.split("-").slice(1).join("-");

    const { text } = await getTexts();

    const product = await getProduct({
        productId: productId,
    });

    if (!Number.isFinite(productId) || !slug) notFound();

    if (!product || !product.data || product.data.slug !== slug) notFound();

    const productGroup = await getProductGroup({
        productGroupId: product.data.product_group_id,
    });

    const productAttributes = await getProductAttributes({
        productId: productId,
    });

    return (
        <>
            <div className="md:block hidden">
                <PageHeader
                    breadcrumbs={{
                        links: [
                            { href: "/", title: text("Главная") },
                            ...product.data.categories.map((category) => {
                                return {
                                    href: `/categories/${category.id}-${category.slug}`,
                                    title: category.name,
                                };
                            }),
                        ],

                        current: product.data.name,
                    }}
                />
            </div>

            <Product product={product} productGroup={productGroup} attributes={productAttributes} />

            <SpecialSwiper />

            <Advantages />

            <LocalizationComponent id={productId} localization={product.data.localization} startPath="/product" />
        </>
    );
}

export async function generateMetadata({ params }: IProductPageParams): Promise<Metadata> {
    const locale = await getLocaleTs();
    const { id } = await params;
    const productId = Number(id.split("-")[0]);
    const slug = id.split("-").slice(1).join("-");

    const product = await getProduct({
        productId,
    });

    if (!Number.isFinite(productId) || !slug) notFound();

    if (!product || !product.data || product.data.slug !== slug) notFound();

    const pageUrl = await getFullUrl(`/product/${id}`);
    const { name, seo_title, meta_description } = product.data;
    const tx = seoTexts(locale);
    const title = filled(seo_title, name) || tx.product(name);
    const description = filled(meta_description) || tx.productDescription(name);

    return {
        alternates: pageAlternates(locale, entityPaths("/product", productId, product.data.localization), productLanguages),
        ...(productLanguages.includes(locale as Locale) ? {} : { robots: NOINDEX }),
        title,
        description,
        keywords: product.data.meta_keywords,
        openGraph: {
            title,
            description,
            url: pageUrl,
            images: [
                {
                    url: product.data.img,
                },
            ],
            type: "website",
        },
    };
}

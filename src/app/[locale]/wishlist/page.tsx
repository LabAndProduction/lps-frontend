import { seoMeta } from "@webnumseoagent/next";
import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import Wishlist from "@/components/pages/wishlist/Wishlist";
import { getProducts } from "@/api/productsApi";
import ProductsSwiper from "@/components/ui/sections/ProductsSwiper";
import { getFullUrl } from "@/utils/getFullUrl";
import { NOINDEX } from "@/lib/seo";

export default async function WishlistPage() {
    const { text } = await getTexts();
    const recommendProducts = await getProducts({
        quantity: 10,
        is_bestseller: 1,
        order_direction: "desc",
    });
    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Избранное"),
                }}
                title={text("Избранное")}
            />

            <Wishlist />

            <ProductsSwiper id="recommend" label={text("Рекомендуемые продукты")} products={recommendProducts} />
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/wishlist");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return seoMeta({
        route: "/wishlist",
        locale: (await params).locale,

        fallback: {
            robots: NOINDEX,
            title: text("Избранное"),
            description: text("Избранное"),
            keywords: text("Избранное"),
            openGraph: {
                title: text("Избранное"),
                url: pageUrl,
                images: [
                    {
                        url: imageUrl,
                    },
                ],
                type: "website",
            },
        }
    });
}

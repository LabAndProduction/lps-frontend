import { getPage } from "@/api/pagesApi";
import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import HomeBanner from "@/components/pages/home/homeBanner/HomeBanner";
import ProductsSwiper from "@/components/ui/sections/ProductsSwiper";
import { getProducts } from "@/api/productsApi";
import Advantages from "@/components/ui/sections/Advantages";
import Banners from "@/components/ui/sections/Banners";
import { getBanners } from "@/api/bannersApi";
import SpecialSwiper from "@/components/ui/swipers/SpecialSwiper";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function HomePage() {
    const { text } = await getTexts();
    const discountedProducts = await getProducts({
        quantity: 10,
        is_discounted: 1,
        order_direction: "desc",
    });
    const recommendProducts = await getProducts({
        quantity: 10,
        is_bestseller: 1,
        order_direction: "desc",
    });

    const homeBanners1 = await getBanners({ type: "home_1" });

    return (
        <>
            {/* {homeBanners1 && homeBanners1.data && <HomeBanner banners={homeBanners1} />} */}

            <ProductsSwiper id="discounted" label={text("Со скидкой")} products={discountedProducts} />

            <ProductsSwiper id="recommended" label={text("Рекомендуемые продукты")} products={recommendProducts} />

            <Banners />

            <SpecialSwiper />

            <Advantages />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const page = await getPage({ pageId: 1 });

    const pageUrl = await getFullUrl();
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

import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";
import { getProducts } from "@/api/productsApi";
import CartTotal from "@/components/pages/cart/CartTotal";
import Cart from "@/components/pages/cart/Cart";
import CartWrapper from "@/components/pages/cart/CartWrapper";
import ProductsSwiper from "@/components/ui/sections/ProductsSwiper";
import { getFullUrl } from "@/utils/getFullUrl";
import { NOINDEX } from "@/lib/seo";

export default async function CartPage() {
    const { text } = await getTexts();
    const recommendProducts = await getProducts({
        quantity: 10,
        is_bestseller: 1,
        order_direction: "desc",
    });

    return (
        <>
            <PageHeader
                title={text("Корзина")}
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Корзина"),
                }}
            />

            <CartWrapper content={<Cart />} sidebar={<CartTotal />} />

            <ProductsSwiper id="recommend" label={text("Рекомендуемые продукты")} products={recommendProducts} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/cart");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return {
        robots: NOINDEX,
        title: text("Корзина"),
        description: text("Корзина"),
        keywords: text("Корзина"),
        openGraph: {
            title: text("Корзина"),
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

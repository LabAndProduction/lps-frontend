import ProductsSwiper from "../sections/ProductsSwiper";
import { getTexts } from "@/api/textsApi";
import { getProducts } from "@/api/productsApi";
import { getCookies } from "next-client-cookies/server";

export default async function SpecialSwiper() {
    const { text } = await getTexts();
    const cookies = await getCookies();
    const categoryId = cookies.get("last_category");
    const specialProducts = await getProducts(categoryId ? { category_id: Number(categoryId) } : {});

    return (
        <>
            <ProductsSwiper id="special" label={text("Специально для вас")} products={specialProducts} />
        </>
    );
}

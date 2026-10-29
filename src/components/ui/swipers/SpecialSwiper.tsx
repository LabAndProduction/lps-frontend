import ProductsSwiper from "../sections/ProductsSwiper";
import { getTexts } from "@/api/textsApi";
import { getProduct } from "@/api/productsApi";
import { SPECIAL_PRODUCT_IDS, SPECIAL_PRODUCTS_REVALIDATE } from "@/lib/specialProducts";

export default async function SpecialSwiper() {
    const { text } = await getTexts();
    const products = await Promise.all(
        SPECIAL_PRODUCT_IDS.map((productId) =>
            getProduct({ productId, revalidate: SPECIAL_PRODUCTS_REVALIDATE })
                // the cards need only the list fields - the page body and documents stay on the server
                .then((product) => {
                    if (!product?.data) return undefined;
                    const {
                        h1_name,
                        body,
                        body2,
                        seo_title,
                        meta_description,
                        meta_keywords,
                        book,
                        documents,
                        specifications,
                        video_links,
                        ...card
                    } = product.data;
                    return card;
                })
                .catch(() => undefined),
        ),
    );
    const specialProducts = products.filter(
        (product): product is NonNullable<typeof product> =>
            !!product && !!product.img && !product.img.includes("no-image"),
    );

    return (
        <>
            <ProductsSwiper id="special" label={text("Специально для вас")} products={{ data: specialProducts }} />
        </>
    );
}

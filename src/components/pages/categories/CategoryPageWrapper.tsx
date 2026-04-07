import Advantages from "@/components/ui/sections/Advantages";
import { getProducts } from "@/api/productsApi";
import SeoSection from "@/components/ui/sections/SeoSection";
import CategoryBanners from "./categoryBanners/CategoryBanners";
import Category from "./category/Category";
import CategoriesPageHeader from "./CategoriesPageHeader";
import LocalizationComponent from "@/components/layout/LocalizationComponent";
import { ICategoryPageWrapperProps } from "@/types/props/pages.types";
import { getTexts } from "@/api/textsApi";
import ProductsSwiper from "@/components/ui/sections/ProductsSwiper";
import Banners from "@/components/ui/sections/Banners";
import SpecialSwiper from "@/components/ui/swipers/SpecialSwiper";
import CategoryTracker from "./CategoryTracker";

export default async function CategoryPageWrapper({ products, category }: ICategoryPageWrapperProps) {
    const recommendProducts = await getProducts({
        quantity: 10,
        is_bestseller: 1,
        order_direction: "desc",
    });

    const { text } = await getTexts();

    return (
        <>
            {category && category.data && category.data.id && <CategoryTracker categoryId={String(category.data.id)} />}

            <CategoriesPageHeader category={category} />

            <CategoryBanners category={category} />

            <Category category={category} products={products} />

            <ProductsSwiper id="recommend" label={text("Рекомендуемые продукты")} products={recommendProducts} />

            <Banners />

            <SpecialSwiper />

            <SeoSection body={category.data.body} link="/" />

            <Advantages />

            <LocalizationComponent
                id={category.data.id}
                localization={category.data.localization}
                startPath={`/categories`}
            />
        </>
    );
}

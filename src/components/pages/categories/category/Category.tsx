import SectionWrapper from "@/components/layout/SectionWrapper";
import CategoriesSwiper from "@/components/ui/swipers/CategoriesSwiper";
import { getCategoryAttributes, getCategoryBrands, getCategoryPrices, getSubCategories } from "@/api/categoriesApi";
import CategoriesFilters from "./categoriesFilters/CategoriesFilters";
import CategoryProductsWrapper from "./categoryProductsWrapper/CategoryProductsWrapper";
import { ICategoryProps } from "@/types/props/pages.types";

export default async function Category({ category, products }: ICategoryProps) {
    const categoryId = category.data.id;
    const subCategories = await getSubCategories({ categoryId });
    const price = await getCategoryPrices({ categoryId });
    const attributes = await getCategoryAttributes({ categoryId });
    const brands = await getCategoryBrands({ categoryId });

    return (
        <SectionWrapper className="section-padding">
            <div className="flex flex-col gap-6">
                <h1 className="xl:text-[2.25rem] lg:text-[2rem] sm:text-[1.75rem] text-2xl leading-120 font-bold">
                    {category.data.h1_name.length > 0 ? category.data.h1_name : category.data.name}
                </h1>

                <div className="flex flex-col xl:gap-16 gap-12">
                    <div className="flex flex-col gap-5">
                        {subCategories.data.length > 0 && <CategoriesSwiper categories={subCategories} />}
                    </div>

                    <div className="products-grid-wrapper">
                        <div className="lg:block hidden">
                            <CategoriesFilters attributes={attributes} price={price} brands={brands} />
                        </div>

                        <CategoryProductsWrapper
                            products={products}
                            attributes={attributes}
                            price={price}
                            brands={brands}
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

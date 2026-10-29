import SectionWrapper from "@/components/layout/SectionWrapper";
import BrandCategories from "./brandCategories/BrandCategories";
import { getBrandCategories } from "@/api/brandsApi";
import { IProducts } from "@/types/api/products.types";
import { ISingleBrand } from "@/types/api/brand.types";
import BrandProducts from "./BrandProducts";

export interface IBrandProps {
    products: IProducts;
    brand: ISingleBrand;
}

export default async function Brand({ products, brand }: IBrandProps) {
    const brandsCategoriesTree = await getBrandCategories({ brandId: brand.data.id });

    return (
        <>
            <SectionWrapper className="pt-6">
                <div className="catalog-grid-wrapper">
                    <div className="lg:block hidden">
                        <BrandCategories brandCategoriesTree={brandsCategoriesTree} brand={brand} />
                    </div>

                    <BrandProducts brand={brand} brandsCategoriesTree={brandsCategoriesTree} products={products} />
                </div>
            </SectionWrapper>
        </>
    );
}

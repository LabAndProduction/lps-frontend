"use client";

import ProductsSort from "@/components/ui/ProductsSort";
import { useText } from "@/context/text.context";
import { ProductsViewType } from "@/types/types";
import { useState } from "react";
import BrandCategoriesMenu from "./brandCategoriesMenu/BrandCategoriesMenu";
import ProductsViewButtons from "@/components/ui/ProductsViewButtons";
import ProductsGrid from "@/components/ui/ProductsGrid";
import { IProducts } from "@/types/api/products.types";
import { IBrandCategories, ISingleBrand } from "@/types/api/brand.types";

export interface IBrandProductsProps {
    products: IProducts;
    brand: ISingleBrand;
    brandsCategoriesTree: IBrandCategories;
}

export default function BrandProducts({ brand, products, brandsCategoriesTree }: IBrandProductsProps) {
    const [productsView, setProductsView] = useState<ProductsViewType>("column");
    const { text } = useText();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <div className="lg:hidden flex items-center flex-wrap justify-between gap-3">
                    {products.data.length > 0 && <ProductsSort />}
                    <BrandCategoriesMenu brandCategoriesTree={brandsCategoriesTree} brand={brand} />
                </div>

                <div className="flex items-center gap-3 flex-wrap justify-between">
                    <p className="text-sm">
                        {products.meta.total} {text("шт.")}
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="lg:block hidden">{products.data.length > 0 && <ProductsSort />}</div>

                        <ProductsViewButtons productsView={productsView} setProductsView={setProductsView} />
                    </div>
                </div>
            </div>

            <ProductsGrid products={products} productsView={productsView} />
        </div>
    );
}

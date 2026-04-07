"use client";

import ProductsGrid from "@/components/ui/ProductsGrid";
import { useState } from "react";
import { ProductsViewType } from "@/types/types";
import { useText } from "@/context/text.context";
import ProductsSort from "@/components/ui/ProductsSort";
import { ICategoryProductsWrapperProps } from "@/types/props/pages.types";
import ProductsViewButtons from "@/components/ui/ProductsViewButtons";
import CategoriesFiltersMenu from "../categoriesFiltersMenu/CategoriesFiltersMenu";

export default function CategoryProductsWrapper({ products, attributes, price }: ICategoryProductsWrapperProps) {
    const [productsView, setProductsView] = useState<ProductsViewType>("column");
    const { text } = useText();

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                <div className="lg:hidden flex items-center flex-wrap justify-between gap-3">
                    {products.data.length > 0 && <ProductsSort />}
                    <CategoriesFiltersMenu attributes={attributes} price={price} />
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

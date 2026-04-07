"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import ProductsGrid from "@/components/ui/ProductsGrid";
import ProductsSort from "@/components/ui/ProductsSort";
import ProductsViewButtons from "@/components/ui/ProductsViewButtons";
import SearchFiltersMenu from "./searchFiltersMenu/SearchFiltersMenu";
import SearchFilters from "./searchFilters/SearchFilters";
import { useText } from "@/context/text.context";
import { ProductsViewType } from "@/types/types";
import { useState } from "react";
import { ISearchProps } from "@/types/props/pages.types";
import SearchForm from "./searchForm/SearchForm";

export default function Search({ products, price, keyword }: ISearchProps) {
    const { text } = useText();
    const [productsView, setProductsView] = useState<ProductsViewType>("column");
    return (
        <SectionWrapper>
            <div className="products-grid-wrapper">
                <div className="lg:block hidden">
                    <SearchFilters price={price} keyword={keyword} />
                </div>

                <div className="lg:hidden">
                    <SearchForm keyword={keyword} isSearchPage={true} />
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="lg:hidden flex items-center flex-wrap justify-between gap-3">
                            {products.data.length > 0 && <ProductsSort />}
                            <SearchFiltersMenu price={price} keyword={keyword} />
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
            </div>
        </SectionWrapper>
    );
}

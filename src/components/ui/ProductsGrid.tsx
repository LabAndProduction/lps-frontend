"use client";

import Pagination from "./pagination/Pagination";
import Empty from "./Empty";
import { IProductsGridProps } from "@/types/props/ui.types";
import ProductCard from "./cards/ProductCard";
import { useText } from "@/context/text.context";
import classNames from "classnames";
import RowProductCard from "./cards/RowProductCard";

export default function ProductsGrid({ products, productsView }: IProductsGridProps) {
    const { text } = useText();
    return (
        <div className="flex flex-col @container">
            {(!products.data || (products.data && products.data.length == 0)) && (
                <Empty img="/images/cart-empty.png" title={text("Ничего не найдено")} />
            )}
            {products.data && products.data.length > 0 && (
                <div
                    className={classNames(
                        productsView == "row"
                            ? "flex flex-col"
                            : `min-[360px]:grid flex flex-col @[70.5rem]:grid-cols-5 @[53.75rem]:grid-cols-4 @[37.5rem]:grid-cols-3 grid-cols-2`,
                        "gap-x-3 gap-y-5",
                    )}>
                    {products.data.map((product) =>
                        productsView == "row" ? (
                            <RowProductCard key={product.id} product={product} />
                        ) : (
                            <ProductCard key={product.id} product={product} />
                        ),
                    )}
                </div>
            )}
            {products.meta.last_page > 1 && <Pagination meta={products.meta} />}
        </div>
    );
}

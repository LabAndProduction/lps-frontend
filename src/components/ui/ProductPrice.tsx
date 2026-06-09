"use client";

import { useText } from "@/context/text.context";
import ProductBadge from "./badges/ProductBadge";
import { IProductPriceProps } from "@/types/props/ui.types";

export default function ProductPrice({ product, isWithBadge = false }: IProductPriceProps) {
    const { text } = useText();
    return (
        <div className="flex gap-2">
            <p className="font-semibold !leading-110 lg:text-lg sm:text-base text-sm">
                {product.current_price > 0 ? product.current_price_formatted : text("Нет в наличии")}
            </p>

            {Number(product.discount) > 0 && isWithBadge && (
                <ProductBadge text={`-${Number(product.discount).toFixed(0)}%`} />
            )}
        </div>
    );
}

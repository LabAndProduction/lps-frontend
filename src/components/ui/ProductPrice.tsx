"use client";

import { useText } from "@/context/text.context";
import ProductBadge from "./badges/ProductBadge";
import { IProductPriceProps } from "@/types/props/ui.types";

export default function ProductPrice({ product, isWithBadge = false }: IProductPriceProps) {
    const { text } = useText();
    return (
        <div className="flex gap-2">
            <div className="flex flex-col lg:gap-1 w-full">
                <p className="font-semibold !leading-110 lg:text-lg sm:text-base text-sm">
                    {product.current_price > 0 ? product.current_price_formatted : text("Нет в наличии")}
                </p>

                {product.min_price_per_month > 0 && product.min_price_per_month_duration > 0 && (
                    <p className="font-semibold sm:text-sm text-xs line-clamp-1">
                        {product.min_price_per_month_formatted} x{" "}
                        <span className="font-medium text-xs">
                            {product.min_price_per_month_duration} {text("мес.")}
                        </span>
                    </p>
                )}
            </div>

            {Number(product.discount) > 0 && isWithBadge && (
                <ProductBadge text={`-${Number(product.discount).toFixed(0)}%`} />
            )}
        </div>
    );
}

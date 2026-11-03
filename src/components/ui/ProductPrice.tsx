"use client";

import { useText } from "@/context/text.context";
import { IProductPriceProps } from "@/types/props/ui.types";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";

export default function ProductPrice({ product, isWithBadge = false }: IProductPriceProps) {
    const { text } = useText();
    const isLoggedIn = useIsLoggedIn();
    const { current_price, current_price_formatted } = product;

    if (!isLoggedIn) return null;

    return (
        <p className="font-semibold !leading-110 xl:text-lg sm:text-base text-sm">
            {current_price > 0 ? current_price_formatted : text("Цена по запросу")}
        </p>
    );
}

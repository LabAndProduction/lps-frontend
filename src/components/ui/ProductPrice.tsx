"use client";

import { useText } from "@/context/text.context";
import { IProductPriceProps } from "@/types/props/ui.types";
import { useCookies } from "next-client-cookies";

export default function ProductPrice({ product, isWithBadge = false }: IProductPriceProps) {
    const { text } = useText();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { current_price, current_price_formatted } = product;

    return (
        <>
            {token && token.length > 0 && (
                <p className="font-semibold !leading-110 lg:text-lg sm:text-base text-sm">
                    {current_price > 0 ? current_price_formatted : text("Нет в наличии")}
                </p>
            )}
        </>
    );
}

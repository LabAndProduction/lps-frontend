"use client";

import { useOrder } from "@/context/order.context";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { IInstallmentPrice } from "@/types/api/products.types";
import NextImage from "@/components/ui/NextImage";
import { useEffect, useState } from "react";
import { IOrderProductCardProps } from "@/types/props/ui.types";

export default function OrderProductCard({ product, quantity }: IOrderProductCardProps) {
    const { text } = useText();

    return (
        <div className="flex gap-5 border-b border-gray2 pb-5">
            <Link href={`/product/${product.id}-${product.slug}`} className="flex">
                <NextImage
                    width={100}
                    height={100}
                    src={product.img}
                    alt={product.name}
                    className="sm:min-w-[6.25rem] sm:max-w-[6.25rem] sm:min-h-[6.25rem] sm:max-h-[6.25rem] min-w-[5rem] max-w-[5rem] min-h-[5rem] max-h-[5rem] object-contain"
                />
            </Link>
            <div className="grow flex flex-col gap-4">
                <Link href={`/product/${product.id}-${product.slug}`} className="leading-140 text-sm hover:text-main">
                    {product.name}
                </Link>

                <div className="flex grow justify-between items-end gap-2 flex-wrap">
                    <p className="text-sm">
                        {text("Количество")}: {quantity}
                    </p>

                    <div className="flex flex-col gap-1">
                        {product.old_price > product.current_price && product.old_price_formatted && (
                            <p className="line-through sm:text-sm text-xs font-semibold">
                                {product.old_price_formatted}
                            </p>
                        )}

                        <p className="sm:text-base text-sm font-semibold">{product.current_price_formatted}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

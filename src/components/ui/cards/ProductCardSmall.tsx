"use client";

import { Link } from "@/i18n/routing";
import { useText } from "@/context/text.context";
import { IProductCardSmallProps } from "@/types/props/ui.types";
import NextImage from "../NextImage";

export default function ProductCardSmall({ product }: IProductCardSmallProps) {
    const { text } = useText();

    return (
        <Link
            href={`/product/${product.id}-${product.slug}`}
            className={
                "@container flex sm:flex-row flex-col sm:items-center gap-[0.875rem] bg-white p-[0.875rem] h-full border border-t-0 border-l-0 border-gray3"
            }>
            <div className="grow flex gap-[0.875rem]">
                <div className="min-w-[4rem]">
                    <NextImage
                        src={product.img}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="lg:size-[6.25rem] size-16 object-contain"
                    />
                </div>
                <div className="flex flex-col justify-center gap-3 h-auto grow">
                    <h4
                        className="font-medium line-clamp-2 hover:opacity-60 lg:text-base text-sm transition-300"
                        style={{ overflowWrap: "anywhere" }}>
                        {product.name}
                    </h4>
                    <p className="font-bold leading-120 lg:text-base text-sm">
                        {product.current_price > 0 ? product.current_price_formatted : text("Цена по запросу")}
                    </p>
                </div>
            </div>
        </Link>
    );
}

"use client";

import { Link } from "@/i18n/routing";
import { ICartProductCardProps } from "@/types/props/ui.types";
import WishlistButton from "../buttons/WishlistBtn";
import Quantity from "../formElements/Quantity";
import RemoveFromCart from "@/components/pages/cart/RemoveFromCart";
import ProductPrice from "../ProductPrice";
import { useText } from "@/context/text.context";
import CompareButton from "../buttons/CompareButton";
import NextImage from "../NextImage";

export default function CartProductCard({ product, quantity }: ICartProductCardProps) {
    const { text } = useText();
    return (
        <div className="@container last:border-none border-b border-gray4 last:pb-0 pb-6">
            <div className="flex sm:gap-5 gap-2 flex-row flex-col">
                <div className="relative">
                    <Link href={`/product/${product.id}-${product.slug}`} className="flex-center self-start">
                        <NextImage
                            src={product.img}
                            alt={product.name}
                            width={120}
                            height={120}
                            className="@[26.25rem]:min-w-[7.5rem] @[26.25rem]:min-h-[7.5rem] @[26.25rem]:size-[7.5rem] min-w-20 min-h-20 size-20  object-contain object-center"
                        />
                    </Link>
                </div>
                <div className="flex sm:flex-row flex-col justify-between sm:gap-10 @[26.25rem]:gap-5 gap-2 w-full">
                    <div className="flex flex-col gap-3">
                        <Link
                            href={`/product/${product.id}-${product.slug}`}
                            className="font-medium leading-150 sm:text-base text-sm hover:text-main line-clamp-2">
                            {product.name}
                        </Link>

                        <p className="font-medium sm:text-sm text-xs text-secondary">
                            {text("Код товара")}: {product.sku}
                        </p>
                        <ProductPrice product={product} isWithBadge={true} />
                    </div>

                    <div className="flex xl:flex-row-reverse sm:flex-col flex-row sm:gap-y-8 gap-y-2 gap-x-4 flex-wrap xl:justify-start sm:justify-center justify-between xl:items-center items-end">
                        {quantity && <Quantity productQuantity={quantity} product={product} />}
                        <div className="flex items-center gap-4">
                            <WishlistButton product={product} />
                            {/* <CompareButton product={product} /> */}
                            <RemoveFromCart product={product} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

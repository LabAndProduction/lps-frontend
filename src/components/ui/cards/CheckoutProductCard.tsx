"use client";

import { ICheckoutTableItemProps } from "@/types/props/pages.types";
import NextImage from "../NextImage";
import Quantity from "../formElements/Quantity";
import RemoveFromCart from "@/components/pages/cart/RemoveFromCart";
import { useText } from "@/context/text.context";
import { useCookies } from "next-client-cookies";

export default function CheckoutProductCard({ product, quantity }: ICheckoutTableItemProps) {
    const { text } = useText();
    const cookies = useCookies();
    const token = cookies.get("token");

    return (
        <div className="flex gap-2 border-t-2 border-gray pt-4">
            <NextImage
                src={product.img}
                alt={product.name}
                height={80}
                width={80}
                className="sm:size-[5rem] sm:min-w-[5rem] sm:min-h-[5rem] sm:max-w-[5rem] sm:max-h-[5rem] size-[4rem] min-w-[4rem] min-h-[4rem] max-w-[4rem] max-h-[4rem] object-contain"
            />
            <div className="flex flex-col justify-between gap-2 w-full h-auto">
                <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm text-secondary2">{product.name}</h4>
                    <RemoveFromCart product={product} />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <Quantity product={product} productQuantity={quantity} />

                    {token && token.length > 0 && (
                        <p className="text-sm">
                            {new Intl.NumberFormat("fr-FR").format(product.current_price * quantity)} {text("сум")}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

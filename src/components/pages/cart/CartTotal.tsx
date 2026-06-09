"use client";

import { Link } from "@/i18n/routing";
import { useCookies } from "next-client-cookies";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { useState } from "react";
import OvalSpinner from "@/components/ui/OvalSpinner";

export default function CartTotal() {
    const cookies = useCookies();
    const token = cookies.get("token");
    const { apiCart, localCartQuantity, clearCart, localCartTotal, cart } = useCart();
    const [isClearLoading, setIsClearLoading] = useState<boolean>(false);
    const { text } = useText();

    return (
        <div className={`custom-block-with-padding flex-col gap-6 h-fit`}>
            <h2 className="font-semibold">{text("Ваша корзина")}</h2>

            <div className="flex flex-col gap-4">
                <div className="text-sm flex items-center justify-between gap-4">
                    <h4>{text("Количество товаров")}:</h4>
                    <p>
                        {token ? apiCart.quantity : localCartQuantity} {text("шт.")}
                    </p>
                </div>
                <div className="text-sm font-semibold flex items-center justify-between gap-4 border-t border-gray4 pt-3">
                    <h4>{text("К оплате")}:</h4>

                    <p>
                        {token
                            ? apiCart.total_formatted
                            : `${new Intl.NumberFormat("fr-FR").format(localCartTotal)} ${text("сум")}`}
                    </p>
                </div>
            </div>

            <div className="lg:flex sm:grid flex grid-cols-2 flex-col gap-2">
                {cart.length > 0 && (
                    <Link href="/checkout" className={`main-btn w-full`}>
                        {text("Оформить заказ")}
                    </Link>
                )}

                <button
                    disabled={isClearLoading}
                    className="main-transparent-btn w-full"
                    type="button"
                    onClick={() => clearCart({ setIsLoading: setIsClearLoading })}>
                    {isClearLoading && <OvalSpinner size={16} color="var(--color-white)" />}
                    {text("Очистить корзину")}
                </button>
            </div>
        </div>
    );
}

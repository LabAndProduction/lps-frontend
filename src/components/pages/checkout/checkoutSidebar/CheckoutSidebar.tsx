"use client";

import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import CheckoutProducts from "./checkoutProducts/CheckoutProducts";
import { ICheckoutSidebarProps } from "@/types/props/pages.types";
import OvalSpinner from "@/components/ui/OvalSpinner";

export default function CheckoutSidebar({ isSubmitting }: ICheckoutSidebarProps) {
    const { isCartEmpty, pricedTotal, onRequestCount } = useCart();
    const { text } = useText();

    return (
        <div className="flex flex-col gap-5">
            <div className={`custom-block-with-padding flex-col gap-6 h-fit transition-300`}>
                <h4 className="text-lg leading-120 font-bold">{text("Товары")}:</h4>

                <div className="flex flex-col gap-4">
                    {isCartEmpty ? <div></div> : <CheckoutProducts />}
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between gap-4 font-bold">
                            <h4>{text("Итого")}:</h4>
                            <p className="text-lg text-main">
                                {pricedTotal > 0
                                    ? `${new Intl.NumberFormat("ru-RU").format(pricedTotal)} ${text("сум")}`
                                    : text("Цена по запросу")}
                            </p>
                        </div>
                        {onRequestCount > 0 && pricedTotal > 0 && (
                            <p className="text-xs text-secondary">
                                {text("Без учёта товаров с ценой по запросу")} ({onRequestCount})
                            </p>
                        )}
                        <p className="text-xs text-secondary">
                            {text("Стоимость доставки менеджер уточнит после заказа.")}
                        </p>
                    </div>
                </div>

                <button type="submit" className="main-btn w-full">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}

                    {text("Оформить заказ")}
                </button>
            </div>

            {/* {values.payment_method === "installment" && !!installments && (
                <div className="custom-block-with-padding flex-col gap-6">
                    <h4 className="text-lg font-semibold">{text("Купить в рассрочку")}</h4>

                    <CheckoutInstallmentDurations installments={installments} />

                    <CheckoutInstallments installments={installments} />
                </div>
            )} */}
        </div>
    );
}

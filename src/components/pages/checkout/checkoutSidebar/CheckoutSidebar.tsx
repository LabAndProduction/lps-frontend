"use client";

import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { useCookies } from "next-client-cookies";
import CheckoutProducts from "./checkoutProducts/CheckoutProducts";
import CheckoutInstallments from "./checkoutInstallments/CheckoutInstallments";
import { useFormikContext } from "formik";
import { ICheckoutForm } from "@/types/form.types";
import CheckoutInstallmentDurations from "./checkoutInstallmentDurations/CheckoutInstallmentDurations";
import { ICheckoutSidebarProps } from "@/types/props/pages.types";
import OvalSpinner from "@/components/ui/OvalSpinner";

export default function CheckoutSidebar({ installments, isSubmitting }: ICheckoutSidebarProps) {
    const { isCartEmpty, apiCart, localCartTotal } = useCart();
    const { values } = useFormikContext<ICheckoutForm>();
    const { text } = useText();
    const cookies = useCookies();
    const token = cookies.get("token");

    return (
        <div className="flex flex-col gap-5">
            <div className={`custom-block-with-padding flex-col gap-6 h-fit transition-300`}>
                <h4 className="text-lg leading-120 font-bold">{text("Товары")}:</h4>

                <div className="flex flex-col gap-4">
                    {isCartEmpty ? <div></div> : <CheckoutProducts />}
                    <div className="flex items-center justify-between gap-4 font-bold">
                        <h4>{text("К оплате")}:</h4>

                        <p className="text-lg text-main">
                            {token
                                ? apiCart.total_formatted
                                : `${new Intl.NumberFormat("fr-FR", {}).format(localCartTotal)} ${text("сум")}`}
                        </p>
                    </div>
                </div>

                <button type="submit" className="main-btn w-full">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}

                    {text("Отправить")}
                </button>
            </div>

            {values.payment_method === "installment" && !!installments && (
                <div className="custom-block-with-padding flex-col gap-6">
                    <h4 className="text-lg font-semibold">{text("Купить в рассрочку")}</h4>

                    <CheckoutInstallmentDurations installments={installments} />

                    <CheckoutInstallments installments={installments} />
                </div>
            )}
        </div>
    );
}

"use client";

import { IProduct } from "@/types/api/products.types";
import { ICheckoutForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { useLocaleTS } from "./useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { useOrder } from "@/context/order.context";
import { useCookies } from "next-client-cookies";
import { useCart } from "@/context/cart.context";
import { ICalculatedInstallments } from "@/types/api/installmentCalc.types";
import { sendFeedback } from "@/api/contactsApi";

export default function useCheckoutSubmit({ installments }: { installments?: ICalculatedInstallments }) {
    const locale = useLocaleTS();
    const { replace } = useRouter();
    const { setOrderInfo } = useOrder();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { localCartTotal, apiCart, clearCart, cart } = useCart();

    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<ICheckoutForm>) => {
        const {
            name,
            phone_number,
            installment,
            installment_name,
            installment_duration,
            email,
            surname,
            message,
            payment_method,
        } = values;
        try {
            const now = new Date();
            const currentDate = new Intl.DateTimeFormat("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            })
                .format(now)
                .replace(",", "");

            const formattedPhone = formatPhone(phone_number);

            const apiProducts = apiCart.items.map((item) => ({
                item: item.product,
                quantity: item.quantity,
            }));
            const products: { item: IProduct; quantity: number }[] = token ? apiProducts : cart;
            const totalFormatted = token ? apiCart.total_formatted : localCartTotal + " сум";

            const currentInstl =
                installments && installments.installment_prices.find((item) => item.code == installment);
            const currentInstPrice =
                currentInstl && currentInstl.prices.filter((price) => price.duration == installment_duration)[0];

            sendFeedback({
                clientLocale: locale,
                body: {
                    message: `${message ? `${message}; ` : ""}\nСпособ оплаты: ${
                        payment_method == "installment" ? "Рассрочка" : "Карта или наличные"
                    }; ${installment_name ? `\nКомпания: ${installment_name}; ` : ""}${
                        installments && installments.price_formatted ? `\nСумма: ${installments.price_formatted}; ` : ""
                    }${
                        currentInstPrice && currentInstPrice.price_per_month_formatted
                            ? `\nСумма рассрочки в месяц: ${currentInstPrice.price_per_month_formatted}; `
                            : ""
                    }${
                        payment_method == "installment" && installment_duration
                            ? `\nДлительность рассрочки: ${installment_duration}; `
                            : ""
                    }\nТовары: ${products
                        .map(
                            (item, id) =>
                                `\n${id + 1}) Название: <a href="${window.location.origin}/product/${item.item.id}-${
                                    item.item.slug
                                }">${item.item.name}</a>, Количество: ${item.quantity}`,
                        )
                        .join(", ")}.`,
                    name: `${name}${surname ? " " + surname : ""}`,
                    phone: formattedPhone,
                    email: email ? email : "",
                },
            }).then(() => {
                resetForm();

                setOrderInfo({
                    name,
                    phone_number,
                    email,
                    surname,
                    products: products,
                    totalFormatted,
                    installment: installment_name,
                    installment_duration,
                    payment_method,
                    date: currentDate,
                });
                clearCart({ isRedirect: false });
                replace("/order");
            });
        } catch (err) {
            throw err;
        }
    };

    return { handleSubmit };
}

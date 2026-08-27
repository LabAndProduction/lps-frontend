"use client";

import { ICheckoutForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { useLocaleTS } from "./useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { useCookies } from "next-client-cookies";
import { createOrder } from "@/api/orderApi";

export default function useCheckoutSubmit() {
    const locale = useLocaleTS();
    const { replace } = useRouter();
    const cookies = useCookies();
    const token = cookies.get("token");

    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<ICheckoutForm>) => {
        const { name, phone_number, email, surname, message } = values;
        try {
            const formattedPhone = formatPhone(phone_number);

            if (token) {
                console.log({ message, name: `${name} ${surname}`, phone_number: formattedPhone, email });
                createOrder({
                    body: { message, name: `${name} ${surname}`, phone_number: formattedPhone, email },
                    token,
                    clientLocale: locale,
                }).then(({ data }) => {
                    resetForm();

                    replace(`/order/${data.id}`);
                });
            }
            // sendFeedback({
            //     clientLocale: locale,
            //     body: {
            //         message: `${message ? `${message}; ` : ""}\nСпособ оплаты: ${
            //             payment_method == "installment" ? "Рассрочка" : "Карта или наличные"
            //         }; ${installment_name ? `\nКомпания: ${installment_name}; ` : ""}${
            //             installments && installments.price_formatted ? `\nСумма: ${installments.price_formatted}; ` : ""
            //         }${
            //             currentInstPrice && currentInstPrice.price_per_month_formatted
            //                 ? `\nСумма рассрочки в месяц: ${currentInstPrice.price_per_month_formatted}; `
            //                 : ""
            //         }${
            //             payment_method == "installment" && installment_duration
            //                 ? `\nДлительность рассрочки: ${installment_duration}; `
            //                 : ""
            //         }\nТовары: ${products
            //             .map(
            //                 (item, id) =>
            //                     `\n${id + 1}) Название: <a href="${window.location.origin}/product/${item.item.id}-${
            //                         item.item.slug
            //                     }">${item.item.name}</a>, Количество: ${item.quantity}`,
            //             )
            //             .join(", ")}.`,
            //         name: `${name}${surname ? " " + surname : ""}`,
            //         phone: formattedPhone,
            //         email: email ? email : "",
            //     },
            // }).then(() => {
            //     resetForm();

            //     setOrderInfo({
            //         name,
            //         phone_number,
            //         email,
            //         surname,
            //         products: products,
            //         totalFormatted,
            //         installment: installment_name,
            //         installment_duration,
            //         payment_method,
            //         date: currentDate,
            //     });
            //     clearCart({ isRedirect: false });
            //     replace("/order");
            // });
        } catch (err) {
            throw err;
        }
    };

    return { handleSubmit };
}

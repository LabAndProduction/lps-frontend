"use client";

import toast from "react-hot-toast";
import { ICheckoutForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { useLocaleTS } from "./useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { useCookies } from "next-client-cookies";
import { createOrder } from "@/api/orderApi";
import { sendOrderRequest } from "@/api/contactsApi";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { ICartLine } from "@/types/context/cart.context.types";
import { absoluteUrl } from "@/lib/seo";

const sum = (value: number) => `${new Intl.NumberFormat("ru-RU").format(value)} сум`;

// The order as plain text for the feedback the store's managers read: contacts first, then
// every product with its article number, quantity, price and link, then the total.
function orderText(values: ICheckoutForm, lines: ICartLine[], pricedTotal: number, onRequestCount: number) {
    const { company, email, message } = values;
    const products = lines.map(({ product, quantity }, i) => {
        const price =
            product.current_price > 0
                ? `${quantity} шт. x ${sum(product.current_price)} = ${sum(product.current_price * quantity)}`
                : `${quantity} шт., цена по запросу`;
        return `${i + 1}) ${product.name}${product.sku ? ` (арт. ${product.sku})` : ""} - ${price}\n${absoluteUrl("ru", `/product/${product.id}-${product.slug}`)}`;
    });
    const total =
        pricedTotal > 0
            ? `Итого: ${sum(pricedTotal)}${onRequestCount > 0 ? ` + товары с ценой по запросу (${onRequestCount})` : ""}`
            : "Итого: цена по запросу";

    return [
        "ЗАКАЗ С САЙТА",
        company ? `Компания: ${company}` : "",
        email ? `E-mail: ${email}` : "",
        message ? `Комментарий: ${message}` : "",
        "",
        "Товары:",
        ...products,
        "",
        total,
    ]
        .filter((line, i, all) => line !== "" || (all[i - 1] ?? "") !== "")
        .join("\n");
}

export default function useCheckoutSubmit({ onDone }: { onDone: () => void }) {
    const locale = useLocaleTS();
    const { replace } = useRouter();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { lines, pricedTotal, onRequestCount, clearCart } = useCart();
    const { text } = useText();

    const handleSubmit = async ({ values, resetForm }: ISubmitFormFuncParams<ICheckoutForm>) => {
        const { name, phone_number, email, surname, message, company } = values;
        const formattedPhone = formatPhone(phone_number);

        // an account's order goes to the store's orders and to the visitor's cabinet
        if (token) {
            const { data } = await createOrder({
                body: {
                    message: [company ? `Компания: ${company}` : "", message || ""].filter(Boolean).join("\n"),
                    name: surname ? `${name} ${surname}` : name,
                    phone_number: formattedPhone,
                    email,
                },
                token,
                clientLocale: locale,
            });
            resetForm();
            replace(`/order/${data.id}`);
            return;
        }

        // a guest's order goes to the store as a request with the whole cart in its text
        const { ok, message: answer } = await sendOrderRequest({
            clientLocale: locale,
            body: {
                name: surname ? `${name} ${surname}` : name,
                phone: formattedPhone,
                email: email || undefined,
                message: orderText(values, lines, pricedTotal, onRequestCount),
            },
        });
        if (!ok) {
            toast.error(answer || text("Не удалось отправить заказ. Позвоните нам, пожалуйста."));
            return;
        }
        resetForm();
        clearCart({ isRedirect: false });
        onDone();
    };

    return { handleSubmit };
}

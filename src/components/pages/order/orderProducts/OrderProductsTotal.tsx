"use client";

import { useText } from "@/context/text.context";
import { ISingleOrder } from "@/types/api/orders.types";

export default function OrderProductsTotal({ order }: { order: ISingleOrder }) {
    const { orderItems, total } = order.data;

    const quantity = orderItems.reduce((prev, curr) => prev + curr.quantity, 0);

    const { text } = useText();

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 pb-4">
                <h4 className="font-bold">{text("Количество товаров")}:</h4>
                <p>
                    {quantity} {text("шт.")}
                </p>
            </div>
            <div className="flex items-center justify-between gap-4 font-bold">
                <h4>{text("К оплате")}:</h4>

                <p className="text-xl text-main">{`${new Intl.NumberFormat("fr-FR").format(total)} ${text("сум")}`}</p>
            </div>
        </div>
    );
}

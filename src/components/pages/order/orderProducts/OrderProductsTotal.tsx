"use client";

import { useOrder } from "@/context/order.context";
import { useText } from "@/context/text.context";
import { useEffect, useState } from "react";

export default function OrderProductsTotal() {
    const { orderInfo } = useOrder();
    const { text } = useText();
    const [productsQuantity, setProductsQuantity] = useState<number>(0);
    const [productsTotal, setProductsTotal] = useState<number>(0);

    useEffect(() => {
        if (orderInfo) {
            const quantity = orderInfo.products.reduce((acc, curr) => (acc += curr.quantity), 0);
            setProductsQuantity(quantity);
            if (orderInfo.payment_method === "installment") {
                const prices: number[] = orderInfo.products.map((product) => {
                    const currentInstallment = product.item.installment_prices.find((instl) => {
                        return instl.code === orderInfo.installment;
                    });
                    if (currentInstallment) {
                        const currentPrice = currentInstallment.prices.find(
                            (instlPrice) => instlPrice.duration == orderInfo.installment_duration,
                        )?.price;

                        return currentPrice ? currentPrice : 0;
                    }
                    return 0;
                });
                if (prices && prices.length > 0) {
                    const total: number = prices.reduce((acc, curr) => (acc += curr), 0);
                    setProductsTotal(total);
                }
            } else {
                const total = orderInfo.products.reduce((acc, curr) => (acc += curr.item.current_price), 0);
                setProductsTotal(total);
            }
        }
    }, [orderInfo]);

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between gap-4 pb-4">
                <h4 className="font-bold">{text("Количество товаров")}:</h4>
                <p>
                    {productsQuantity} {text("шт.")}
                </p>
            </div>
            <div className="flex items-center justify-between gap-4 font-bold">
                <h4>{text("К оплате")}:</h4>

                <p className="text-xl text-main">
                    {`${new Intl.NumberFormat("fr-FR").format(productsTotal)} ${text("сум")}`}
                </p>
            </div>
        </div>
    );
}

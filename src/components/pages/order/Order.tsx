"use client";

import OrderInfo from "./orderInfo/OrderInfo";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { useOrder } from "@/context/order.context";
import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import OrderProducts from "./orderProducts/OrderProducts";

export default function Order() {
    const { orderInfo } = useOrder();
    const router = useRouter();
    useEffect(() => {
        if (!orderInfo) {
            router.replace("/");
        }
    }, []);

    return (
        <SectionWrapper className="mt-5">
            <div className="products-grid-wrapper">
                <OrderInfo />

                <OrderProducts />
            </div>
        </SectionWrapper>
    );
}

"use client";

import OrderInfo from "./orderInfo/OrderInfo";
import SectionWrapper from "@/components/layout/SectionWrapper";
import OrderProducts from "./orderProducts/OrderProducts";
import { ISingleOrder } from "@/types/api/orders.types";

export default function Order({ order }: { order: ISingleOrder }) {
    return (
        <SectionWrapper className="mt-5">
            <div className="products-grid-wrapper">
                <OrderInfo order={order} />

                <OrderProducts order={order} />
            </div>
        </SectionWrapper>
    );
}

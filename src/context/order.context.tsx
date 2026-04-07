"use client";

import { IOrderContextProps, IOrderInfo, IOrderProviderProps } from "@/types/context/order.context.types";
import { createContext, useContext, useState } from "react";

const OrderContext = createContext<IOrderContextProps>({
    orderInfo: null,
    setOrderInfo: () => null,
});

export const OrderProvider = ({ children }: IOrderProviderProps) => {
    const [orderInfo, setOrderInfo] = useState<IOrderInfo | null>(null);

    const values = { orderInfo, setOrderInfo };

    return <OrderContext.Provider value={values}>{children}</OrderContext.Provider>;
};

export const useOrder = () => useContext(OrderContext);

"use client";

import { IProduct } from "@/types/api/products.types";
import { ISettingsContextProps, ISettingsProviderProps } from "@/types/context/settings.context.types";
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext<ISettingsContextProps>({
    headerHeight: 0,
    headerTopHeight: 0,

    setHeaderHeight: () => undefined,
    setHeaderTopHeight: () => undefined,

    isBuyModalOpen: false,
    setIsBuyModalOpen: () => undefined,

    buyModalProduct: null,
    setBuyModalProduct: () => undefined,
});

export const SettingsProvider = ({ children }: ISettingsProviderProps) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [headerTopHeight, setHeaderTopHeight] = useState<number>(0);

    const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
    const [buyModalProduct, setBuyModalProduct] = useState<IProduct | null>(null);

    const values = {
        headerHeight,
        headerTopHeight,

        setHeaderHeight,
        setHeaderTopHeight,

        isBuyModalOpen,
        setIsBuyModalOpen,

        buyModalProduct,
        setBuyModalProduct,
    };

    return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);

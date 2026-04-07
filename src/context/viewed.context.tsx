"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "@/types/api/products.types";
import {
    IAddProductParams,
    IViewedContextProps,
    IViewedProviderParams,
} from "@/types/context/viewed.context.types";
import {
    getItemWithExpiry,
    setItemWithExpiry,
} from "@/utils/expiryLocalStorage";

const ViewedContext = createContext<IViewedContextProps>({
    viewed: [],
    addProduct: () => null,
});

export const ViewedProvider = ({ children }: IViewedProviderParams) => {
    const viewedLocal = getItemWithExpiry({ key: "viewed" });
    const parsedViewed = viewedLocal ? JSON.parse(viewedLocal) : [];
    const [viewed, setViewed] = useState<IProduct[]>(parsedViewed);

    const addProduct = ({ product }:IAddProductParams ): void => {
        const finded = viewed.find((el) => {
            if (el.id === product.id) {
                return el;
            }
        });
        if (!finded) {
            setViewed([product, ...viewed]);
        }
        if (viewed.length > 20) {
            viewed.slice(0, 19);
        }
    };

    useEffect(() => {
        setItemWithExpiry({
            key: "viewed",
            value: JSON.stringify(viewed),
            expireTime: 604800000,
        });
    }, [viewed]);

    const values = {
        viewed,
        addProduct,
    };

    return (
        <ViewedContext.Provider value={values}>
            {children}
        </ViewedContext.Provider>
    );
};

export const useViewed = () => useContext(ViewedContext);

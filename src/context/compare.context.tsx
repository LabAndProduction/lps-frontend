"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";
import { compareAdd, compareClear, compareCreate, compareRemove, getCompare } from "@/api/compareApi";
import { IProduct } from "@/types/api/products.types";
import { useRouter } from "@/i18n/routing";
import { ICompare } from "@/types/api/compare.types";
import { SetState } from "@/types/types";
import {
    IAllAttributesAttr,
    ICompareAddProduct,
    ICompareContextProps,
    ICompareProviderProps,
    ICompareRemoveProduct,
    ICompareToggleProduct,
} from "@/types/context/compare.context.types";
import { useText } from "./text.context";
import { useLocaleTS } from "@/hooks/useLocaleTS";

const COMPARE_MAX_LENGTH = 5;

const CompareContext = createContext<ICompareContextProps>({
    apiCompareList: { items: [], quantity: 0 },
    compareList: [],
    addProduct: () => null,
    clearCompare: () => null,
    toggleCompare: () => null,
    removeProduct: () => null,
    checkExist: () => false,
    allAttributes: [],
    setAllAttributes: () => [],
    isCompareEmpty: true,
    maxLength: COMPARE_MAX_LENGTH,
});

export const CompareProvider = ({ children }: ICompareProviderProps) => {
    const locale = useLocaleTS();
    const maxLength: number = COMPARE_MAX_LENGTH;
    const { text } = useText();
    const compareListLocal = typeof window !== "undefined" && localStorage.getItem("compare");
    const parsedCompareList = compareListLocal ? JSON.parse(compareListLocal) : [];

    const [compareList, setCompareList] = useState<IProduct[]>([]);

    const [apiCompareList, setApiCompareList] = useState<ICompare>({
        items: [],
        quantity: 0,
    });
    const { refresh, replace } = useRouter();
    const cookies = useCookies();
    const token = cookies.get("token");
    const [allAttributes, setAllAttributes] = useState<IAllAttributesAttr[]>([]);
    const [isCompareEmpty, setIsCompareEmpty] = useState<boolean>(true);

    useEffect(() => {
        if ((token && apiCompareList.quantity > 0) || (!token && compareList.length > 0)) {
            setIsCompareEmpty(false);
        } else {
            setIsCompareEmpty(true);
        }
    }, [token, apiCompareList, compareList]);

    const addProduct = ({ product, setIsLoading }: ICompareAddProduct): void => {
        if (!token) {
            if (compareList.length >= maxLength) {
                toast.error(text("Максимальное количество элементов :number").replace(":number", String(maxLength)));
                return;
            }
            setCompareList([...compareList, product]);
        }
        if (token) {
            setIsLoading(true);
            compareAdd({ token, body: { product_id: product.id }, clientLocale: locale })
                .then((data) => {
                    if (typeof data !== "string") {
                        setApiCompareList(data);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    const removeProduct = ({ productId, setIsLoading }: ICompareRemoveProduct) => {
        if (!token) setCompareList(compareList.filter((el) => productId !== el.id));
        if (token) {
            setIsLoading(true);
            compareRemove({ token, body: { product_id: productId }, clientLocale: locale })
                .then((data) => {
                    if (typeof data !== "string") {
                        setApiCompareList(data);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    };

    const toggleCompare = ({ product, setIsLoading }: ICompareToggleProduct) => {
        if (!token) {
            if (compareList.length > 0) {
                const searchProduct = compareList.filter((el) => {
                    return el.id == product.id;
                });
                if (searchProduct.length === 1) removeProduct({ productId: product.id, setIsLoading });
                else addProduct({ product, setIsLoading });
            } else addProduct({ product, setIsLoading });
        } else {
            const filteredApiCompareList = apiCompareList.items.filter((el) => {
                return el.id === product.id;
            });
            if (filteredApiCompareList.length === 1) removeProduct({ productId: product.id, setIsLoading });
            else addProduct({ product, setIsLoading });
        }
    };

    const checkExist = (productId: number): boolean => {
        if (!token) {
            const filteredArr = compareList.filter((el) => {
                return el.id == productId;
            });
            return filteredArr.length === 1;
        } else {
            const filteredApiCompareList = apiCompareList.items.filter((el) => {
                return el.id === productId;
            });

            return filteredApiCompareList.length === 1;
        }
    };
    const clearCompare = ({ setIsLoading }: { setIsLoading: SetState<boolean> }) => {
        if (!token) {
            setCompareList([]);
            replace("/");
        } else {
            setIsLoading(true);
            compareClear({ token, clientLocale: locale })
                .then((data) => {
                    setApiCompareList({ items: [], quantity: 0 });
                    replace("/");
                    toast.success(data.message);
                })
                .finally(() => setIsLoading(false));
        }
    };

    useEffect(() => {
        localStorage.setItem("compare", JSON.stringify(compareList));
    }, [compareList]);

    useEffect(() => {
        setCompareList(parsedCompareList);
    }, []);

    useEffect(() => {
        if (token) {
            getCompare({ token, clientLocale: locale }).then((data) => {
                if (typeof data !== "string") {
                    if (data.quantity === 0 && compareList.length > 0) {
                        const products = compareList.map((el) => {
                            return { id: el.id };
                        });

                        compareCreate({
                            token,
                            body: { products: products },
                            clientLocale: locale,
                        }).then((updatedData) => {
                            setCompareList([]);
                            if (typeof updatedData !== "string") setApiCompareList(updatedData);
                        });
                    } else if (data.quantity > 0 && compareList.length === 0) {
                        setApiCompareList(data);
                        setCompareList([]);
                    } else if (data.quantity > 0 && compareList.length > 0) {
                        const apiArr = data.items.map((el) => {
                            return el.product;
                        });
                        const compareListIds = compareList.map((el) => {
                            return el.id;
                        });
                        const filteredApiArr = apiArr.filter((el) => {
                            return !compareListIds.includes(el.id);
                        });

                        const arr = [...filteredApiArr, ...compareList].slice(0, maxLength);

                        compareCreate({
                            body: { products: arr },
                            token,
                            clientLocale: locale,
                        }).then((updatedData) => {
                            setCompareList([]);
                            if (typeof updatedData !== "string") setApiCompareList(updatedData);
                            refresh();
                        });
                    }
                }
            });
        }
    }, [token]);

    const values = {
        compareList,
        apiCompareList,
        addProduct,
        removeProduct,
        checkExist,
        toggleCompare,
        clearCompare,
        allAttributes,
        setAllAttributes,
        isCompareEmpty,
        maxLength,
    };

    return <CompareContext.Provider value={values}>{children}</CompareContext.Provider>;
};

export const useCompare = () => useContext(CompareContext);

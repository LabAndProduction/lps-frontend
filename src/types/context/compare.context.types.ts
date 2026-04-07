import { ReactNode } from "react";
import { ICompare } from "../api/compare.types";
import { IProduct } from "../api/products.types";
import { SetState } from "../types";

export interface ICompareContextProps {
    compareList: IProduct[];
    apiCompareList: ICompare;
    addProduct: ({ product, setIsLoading }: ICompareAddProduct) => void | null;
    removeProduct: ({ productId, setIsLoading }: ICompareRemoveProduct) => void | null;
    checkExist: (productId: number) => boolean;
    toggleCompare: ({ product, setIsLoading }: ICompareToggleProduct) => void | null;
    clearCompare: ({ setIsLoading }: { setIsLoading: SetState<boolean> }) => void | null;
    allAttributes: IAllAttributesAttr[];
    setAllAttributes: SetState<IAllAttributesAttr[]>;
    isCompareEmpty: boolean;
    maxLength: number;
}
export interface ICompareAddProduct {
    product: IProduct;
    setIsLoading: SetState<boolean>;
}
export interface ICompareToggleProduct {
    product: IProduct;
    setIsLoading: SetState<boolean>;
}
export interface ICompareRemoveProduct {
    productId: number;
    setIsLoading: SetState<boolean>;
}
export interface ICompareProviderProps {
    children: ReactNode;
}

export interface IAllAttributesAttr {
    name: string;
    slug: string;
    id: number;
    used_for_filter: 0 | 1;
}

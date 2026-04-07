import { ReactNode } from "react";
import { IProduct } from "../api/products.types";

export interface IViewedContextProps {
    viewed: IProduct[];
    addProduct: ({ product }: { product: IProduct }) => void | null;
}

export interface IViewedProviderParams {
    children: ReactNode;
}
export interface IAddProductParams {
    product: IProduct;
}

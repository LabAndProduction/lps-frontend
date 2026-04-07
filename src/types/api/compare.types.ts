import { Locale } from "./api.types";
import { IProduct } from "./products.types";
export interface ICompare {
    quantity: number;
    items: { id: number; name: string; product: IProduct }[];
}
export interface ICompareAddParams {
    token: string;
    body: { product_id: number };
    clientLocale?: Locale;
}

export interface ICompareRemoveParams {
    token: string;
    body: { product_id: number };
    clientLocale?: Locale;
}

export interface ICompareCreateParams {
    token: string;
    body: {
        products: {
            id: number;
        }[];
    };
    clientLocale?: Locale;
}
export interface IGetCompareParams {
    token?: string;
    clientLocale?: Locale;
}
export interface ICompareClearParams {
    token: string;
    clientLocale?: Locale;
}

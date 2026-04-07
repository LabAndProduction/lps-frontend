import { Locale } from "./api.types";
import { IProduct } from "./products.types";

export interface ICart {
    quantity: number;
    subtotal: number;
    subtotal_formatted: string;
    total: number;
    total_formatted: string;
    items: ICartItem[];
    installment: [];
}

export interface ICartItem {
    id: number;
    name: string;
    current_price: number;
    current_price_formatted: string;
    old_price: number;
    old_price_formatted: string;
    quantity: number;
    duration: number;
    price_per_month: number;
    price_per_month_formatted: string;
    old_price_per_month: number;
    old_price_per_month_formatted: string;
    line_subtotal: number;
    line_subtotal_formatted: string;
    line_total: number;
    line_total_formatted: string;
    product: CartProduct;
}

export type CartProduct = IProduct;
//  Omit<IProduct, "categories" | "stickers">;
export interface ICartAddParams {
    token: string;
    body: { product_id: number; quantity: number };
    clientLocale?: Locale;
}
export interface ICartUpdateParams {
    token: string;
    body: { product_id: number; quantity: number };
    clientLocale?: Locale;
}
export interface ICartRemoveParams {
    token: string;
    body: { product_id: number };
    clientLocale?: Locale;
}
export interface ICartCreateParams {
    token: string;
    body: {
        products: {
            id: number;
            quantity: number;
        }[];
    };
    clientLocale?: Locale;
}

export interface IGetCardParams {
    token?: string;
    clientLocale?: Locale;
}

export interface ICartClearParams {
    token: string;
    clientLocale?: Locale;
}

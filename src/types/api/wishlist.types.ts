import { Locale } from "./api.types";
import { IProduct } from "./products.types";

export interface IWishlist {
    quantity: number;
    items: {
        id: number;
        name: string;
        product: IProduct;
    }[];
}
// export type WishlistProduct = Omit<IProduct, "categories" | "stickers">;

export interface IWishlistAddParams {
    token: string;
    body: { product_id: number };
    clientLocale?: Locale;
}

export interface IWishlistRemoveParams {
    token: string;
    body: { product_id: number };
    clientLocale?: Locale;
}
export interface IWishlistCreateParams {
    token: string;
    body: {
        products: {
            id: number;
        }[];
    };
    clientLocale?: Locale;
}
export interface IGetWishlistParams {
    token?: string;
    clientLocale?: Locale;
}
export interface IWishlistClearParams {
    token: string;
    clientLocale?: Locale;
}

import {
    IGetWishlistParams,
    IWishlist,
    IWishlistAddParams,
    IWishlistClearParams,
    IWishlistCreateParams,
    IWishlistRemoveParams,
} from "@/types/api/wishlist.types";

import { fetchGET, fetchMutate } from "./fetch";

export const getWishlist = async ({ token, clientLocale }: IGetWishlistParams) => {
    if (token) {
        return await fetchGET({
            url: "wishlist",
            tag: "Wishlist",
            token,
            clientLocale,
        }).then((data: IWishlist) => data);
    } else {
        return "Unauthorized";
    }
};

export const wishlistAdd = async ({ token, body, clientLocale }: IWishlistAddParams) => {
    return await fetchMutate({
        url: "wishlist/items/add",
        method: "POST",
        body,
        tag: "Wishlist",
        token,
        clientLocale,
    }).then(async () => {
        const data: IWishlist | string = await getWishlist({ token, clientLocale });
        return data;
    });
};

export const wishlistRemove = async ({ token, body, clientLocale }: IWishlistRemoveParams) => {
    return await fetchMutate({
        url: "wishlist/items/remove",
        method: "DELETE",
        tag: "Wishlist",
        body,
        token,
        clientLocale,
    }).then(async () => {
        const data: IWishlist | string = await getWishlist({ token, clientLocale });
        return data;
    });
};

export const wishlistCreate = async ({ token, body, clientLocale }: IWishlistCreateParams) => {
    return await fetchMutate({
        url: "wishlist",
        method: "POST",
        tag: "Wishlist",
        body,
        token,
        clientLocale,
    }).then((data) => {
        return data;
    });
};

export const wishlistClear = async ({ token, clientLocale }: IWishlistClearParams) => {
    return await fetchMutate({
        url: "wishlist/clear",
        method: "POST",
        tag: "Wishlist",
        token,
        clientLocale,
    }).then((data: { message: string }) => {
        return data;
    });
};

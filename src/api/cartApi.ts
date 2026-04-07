import {
    ICart,
    ICartAddParams,
    ICartClearParams,
    ICartCreateParams,
    ICartRemoveParams,
    ICartUpdateParams,
    IGetCardParams,
} from "@/types/api/cart.types";

import { fetchGET, fetchMutate } from "./fetch";

export const getCart = async ({ token, clientLocale }: IGetCardParams) => {
    if (token) {
        return await fetchGET({
            url: "cart",
            tag: "Cart",
            token: token,
            clientLocale,
        }).then((data: ICart) => data);
    } else {
        return "Unauthorized";
    }
};

export const cartAdd = async ({ token, body, clientLocale }: ICartAddParams) => {
    return await fetchMutate({
        url: "cart/items/add",
        method: "POST",
        body,
        tag: "Cart",
        token: token,
        clientLocale,
    }).then(async () => {
        const data: ICart | string = await getCart({ token, clientLocale });
        return data;
    });
};

export const cartUpdate = async ({ token, body, clientLocale }: ICartUpdateParams) => {
    return await fetchMutate({
        url: "cart/items/update",
        method: "PUT",
        body,
        tag: "Cart",
        token: token,
        clientLocale,
    }).then(async () => {
        const data: ICart | string = await getCart({ token, clientLocale });
        return data;
    });
};

export const cartRemove = async ({ token, body, clientLocale }: ICartRemoveParams) => {
    return await fetchMutate({
        url: "cart/items/remove",
        method: "DELETE",
        tag: "Cart",
        body,
        token: token,
        clientLocale,
    }).then(async () => {
        const data: ICart | string = await getCart({ token, clientLocale });
        return data;
    });
};

export const cartCreate = async ({ token, body, clientLocale }: ICartCreateParams) => {
    return await fetchMutate({
        url: "cart",
        method: "POST",
        tag: "Cart",
        body,
        token: token,
        clientLocale,
    }).then((data) => {
        return data;
    });
};

export const cartClear = async ({ token, clientLocale }: ICartClearParams) => {
    return await fetchMutate({
        url: "cart/clear",
        method: "POST",
        tag: "Cart",
        token: token,
        clientLocale,
    }).then((data: { message: string }) => {
        return data;
    });
};

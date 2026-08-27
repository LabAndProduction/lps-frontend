import { ICreateOrderParams, IGetOrderParams, IGetOrdersParams, IOrders } from "@/types/api/orders.types";
import { ICreateOrderRes, ISingleOrder } from "@/types/api/orders.types";
import { fetchGET, fetchMutate } from "./fetch";

export const getOrders = async ({ token, page = 1, quantity = 20 }: IGetOrdersParams) => {
    if (token) {
        return await fetchGET({
            url: `orders?page=${page}&quantity=${quantity}`,
            tag: "Orders",
            token,
        }).then((data: IOrders) => data);
    } else {
        return "Unauthorized";
    }
};

export const createOrder = async ({ token, body, clientLocale }: ICreateOrderParams) => {
    return await fetchMutate({
        url: "orders",
        method: "POST",
        body,
        tag: "Orders",
        token,
        clientLocale,
    }).then((data: ICreateOrderRes) => {
        return data;
    });
};

export const getOrder = async ({ token, orderId }: IGetOrderParams) => {
    if (token) {
        return await fetchGET({
            url: `orders/${orderId}`,
            tag: "Orders",
            token: token,
        }).then((data: ISingleOrder) => data);
    } else {
        return "Unauthorized";
    }
};

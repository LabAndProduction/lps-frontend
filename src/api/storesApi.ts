import { fetchGET } from "./fetch";
import { IGetStoreParams, IGetStoresParams, IStores, SingleStore } from "@/types/api/stores.types";

export const getStores = async ({ page = 1, quantity = 120 }: IGetStoresParams) => {
    return await fetchGET({
        url: `stores?page=${page}&quantity=${quantity}`,
        tag: "Stores",
    }).then((data: IStores) => data);
};

export const getStore = async ({ id }: IGetStoreParams) => {
    return await fetchGET({
        url: `stores/${id}`,
        tag: "Stores",
    }).then((data: { data: SingleStore }) => data);
};

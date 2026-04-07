import {
    ICompare,
    ICompareAddParams,
    ICompareClearParams,
    ICompareCreateParams,
    ICompareRemoveParams,
    IGetCompareParams,
} from "@/types/api/compare.types";
import { fetchGET, fetchMutate } from "./fetch";
import toast from "react-hot-toast";

export const getCompare = async ({ token, clientLocale }: IGetCompareParams) => {
    if (token) {
        return await fetchGET({
            url: "compare",
            tag: "Compare",
            token,
            clientLocale: clientLocale,
        }).then((data: ICompare) => data);
    } else {
        return "Unauthorized";
    }
};

export const compareAdd = async ({ token, body, clientLocale }: ICompareAddParams) => {
    return await fetchMutate({
        url: "compare/items/add",
        method: "POST",
        body,
        tag: "Compare",
        token,
        clientLocale: clientLocale,
    }).then(async (res: { errors?: { product_id?: string[] } }) => {
        if (res.errors && res.errors.product_id) {
            toast.error(res.errors?.product_id[0]);
            return res.errors?.product_id[0];
        }
        const data: ICompare | string = await getCompare({ token, clientLocale });
        return data;
    });
};

export const compareRemove = async ({ token, body, clientLocale }: ICompareRemoveParams) => {
    return await fetchMutate({
        url: "compare/items/remove",
        method: "DELETE",
        tag: "Compare",
        body,
        token,
        clientLocale: clientLocale,
    }).then(async () => {
        const data: ICompare | string = await getCompare({ token, clientLocale });
        return data;
    });
};

export const compareCreate = async ({ token, body, clientLocale }: ICompareCreateParams) => {
    return await fetchMutate({
        url: "compare",
        method: "POST",
        tag: "Compare",
        body,
        token,
        clientLocale: clientLocale,
    }).then((data) => {
        return data;
    });
};

export const compareClear = async ({ token, clientLocale }: ICompareClearParams) => {
    return await fetchMutate({
        url: "compare/clear",
        method: "POST",
        tag: "Compare",
        token,
        clientLocale: clientLocale,
    }).then((data: { message: string }) => {
        return data;
    });
};

import toast from "react-hot-toast";

import {
    IAddresses,
    ICreateAddressParams,
    IDeleteAddressParams,
    IGetAddressParams,
    IGetAddressesParams,
    ISetDefaultAddressParams,
    ISingleAddress,
    IUpdateAddressParams,
} from "@/types/api/address.types";

import { fetchGET, fetchMutate } from "./fetch";

export const getAddresses = async ({ token }: IGetAddressesParams) => {
    if (token) {
        return await fetchGET({
            url: "addresses",
            tag: "Addresses",
            token: token,
        }).then((data: IAddresses) => data);
    } else {
        return "Unauthorized";
    }
};

export const getAddress = async ({ token, addressId }: IGetAddressParams) => {
    if (token) {
        return await fetchGET({
            url: `addresses/${addressId}`,
            tag: "Addresses",
            token: token,
        }).then((data: ISingleAddress) => data);
    } else {
        return "Unauthorized";
    }
};

export const createAddress = async ({ token, body }: ICreateAddressParams) => {
    return await fetchMutate({
        url: "addresses",
        method: "POST",
        body,
        tag: "Addresses",
        token: token,
    }).then((data: ISingleAddress) => {
        return data;
    });
};

export const updateAddress = async ({ token, body, addressId }: IUpdateAddressParams) => {
    return await fetchMutate({
        url: `addresses/${addressId}`,
        method: "PUT",
        body,
        tag: "Addresses",
        token: token,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

export const setDefaultAddress = async ({ token, addressId }: ISetDefaultAddressParams) => {
    return await fetchMutate({
        url: `addresses/${addressId}/set-default`,
        method: "POST",
        tag: "Addresses",
        token: token,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

export const deleteAddress = async ({ token, addressId }: IDeleteAddressParams) => {
    return await fetchMutate({
        url: `addresses/${addressId}`,
        method: "DELETE",
        tag: "Addresses",
        token: token,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

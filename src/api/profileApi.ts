import toast from "react-hot-toast";
import { IProfile, IUpdatePasswordParams, IUpdatePhoneParams, IUpdateProfileParams } from "@/types/api/profile.types";
import { fetchGET, fetchMutate } from "./fetch";

export const getProfile = async ({ token }: { token?: string }) => {
    if (token) {
        return await fetchGET({
            url: "profile",
            tag: "Profile",
            token,
        }).then((data: IProfile) => data);
    } else {
        return "Unauthorized";
    }
};

export const updateProfile = async ({ token, body, clientLocale }: IUpdateProfileParams) => {
    return await fetchMutate({
        method: "PUT",
        url: "profile/update",
        tag: "Profile",
        body,
        token,
        clientLocale,
    }).then((data: IProfile) => data);
};

export const updatePassword = async ({ token, body, clientLocale }: IUpdatePasswordParams) => {
    return await fetchMutate({
        method: "PUT",
        url: "profile/password/update",
        tag: "Profile",
        body,
        token,
        clientLocale,
    });
};

export const updatePhone = async ({ token, body, clientLocale }: IUpdatePhoneParams) => {
    return await fetchMutate({
        method: "PUT",
        url: "profile/phone-number/update",
        tag: "Profile",
        body,
        token,
        clientLocale,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

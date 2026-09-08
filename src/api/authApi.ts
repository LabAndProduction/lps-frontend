import toast from "react-hot-toast";
import { deleteCookie, setCookie } from "cookies-next";

import { fetchMutate } from "./fetch";
import { getTexts } from "./textsApi";
import {
    ILoginCheckParams,
    ILoginParams,
    ILogoutParams,
    IOtpCheckParams,
    IRegisterParams,
    IResetPasswordParams,
    ISendOtpParams,
} from "@/types/api/auth.types";

export const register = async ({ body, clientLocale }: IRegisterParams) => {
    const { text } = await getTexts(clientLocale);
    return await fetchMutate({
        url: "register",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { token: string } | { message: string }) => {
        if ("token" in data && !!data.token) {
            setCookie("token", data.token, {
                maxAge: 30 * 24 * 60 * 60,
            });
            toast.success(text("Регистрация прошла успешно"));
        }

        return data;
    });
};

export const login = async ({ body, clientLocale }: ILoginParams) => {
    return await fetchMutate({
        url: "login",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { message: string } | { token: string }) => {
        if ("message" in data) {
            toast.error(data.message);
            return false;
        } else if (data.token) {
            setCookie("token", data.token, {
                maxAge: 30 * 24 * 60 * 60,
            });
            toast.success("Вход выполнен успешно!");
            return true;
        }
    });
};

export const loginCheck = async ({ body, clientLocale }: ILoginCheckParams) => {
    return await fetchMutate({
        url: "login/check",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { user_exists: boolean }) => {
        return data;
    });
};

export const sendOtp = async ({ body, clientLocale }: ISendOtpParams) => {
    return await fetchMutate({
        url: "otp",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { message: string; errors?: unknown }) => {
        if ("errors" in data) {
            toast.error(data.message);
        } else {
            toast.success(data.message);
        }
    });
};

export const otpCheck = async ({ body, clientLocale }: IOtpCheckParams) => {
    return await fetchMutate({
        url: "otp/check",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { message?: string; errors?: { otp: string[]; message: string } }) => {
        if (data.errors && data.errors.otp) {
            toast.error(data.errors.otp[0]);
        }
        return data;
    });
};

export const logout = async ({ token, clientLocale }: ILogoutParams) => {
    return await fetchMutate({
        url: "logout",
        method: "POST",
        tag: "Auth",
        token: token,
        clientLocale: clientLocale,
    }).then((data: { message: string }) => {
        if (data && data.message) toast.success(data.message);

        deleteCookie("token");
        return data;
    });
};

export const resetPassword = async ({ body, clientLocale }: IResetPasswordParams) => {
    return await fetchMutate({
        url: "reset-password",
        body,
        method: "POST",
        tag: "Auth",
        clientLocale: clientLocale,
    }).then((data: { message: string }) => {
        toast.success(data.message);
    });
};

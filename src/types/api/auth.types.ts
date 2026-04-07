import { Locale } from "./api.types";

export interface IRegisterBody {
    name: string;
    phone_number: string;
    password: string;
    otp: number;
}
export interface ILoginBody {
    phone_number: string;
    password: string;
}
export interface IOtpCheckBody {
    phone_number: string;
    otp: number;
    target: OtpTarget;
}
export interface IResetPasswordBody {
    phone_number: string;
    new_password: string;
    otp: number;
}

export interface IRegisterParams {
    body: IRegisterBody;
    clientLocale?: Locale;
}
export interface ILoginParams {
    body: ILoginBody;
    clientLocale?: Locale;
}
export interface ILoginCheckParams {
    body: { phone_number: string };
    clientLocale?: Locale;
}

export interface ISendOtpParams {
    body: { phone_number: string; target: OtpTarget };
    clientLocale?: Locale;
}

export type OtpTarget = "registration" | "reset_password" | "verification";

export interface IOtpCheckParams {
    body: IOtpCheckBody;
    clientLocale?: Locale;
}

export interface ILogoutParams {
    token: string;
    clientLocale?: Locale;
}

export interface IResetPasswordParams {
    body: IResetPasswordBody;
    clientLocale?: Locale;
}

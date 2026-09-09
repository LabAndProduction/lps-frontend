import { Locale } from "./api.types";

export interface IProfile {
    data: {
        id: number;
        name: string;
        phone_number: string;
        phone_number_verified_at: string;
        email: string | null;
        created_at: string;
        updated_at: string;
        image: {
            original: string;
            small: string;
            medium: string;
        };
    };
}

export interface IUpdateProfileParams {
    token?: string;
    body: { name: string; email?: string };
    clientLocale?: Locale;
}

export interface IUpdatePasswordParams {
    token?: string;
    body: { current_password: string; new_password: string };
    clientLocale?: Locale;
}

export interface IUpdatePhoneParams {
    token?: string;
    body: { phone_number: string; otp: number };
    clientLocale?: Locale;
}

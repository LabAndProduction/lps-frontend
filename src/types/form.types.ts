import { PaymentMethodType } from "./types";

export interface IContactsForm {
    name: string;
    phone_number: string;
    message: string;
}
export interface ILoginForm {
    phone_number: string;
    password: string;
}

export interface IRegisterForm {
    name: string;
    phone_number: string;
    password: string;
    confirm_password: string;
}

export interface IResetPasswordForm {
    phone_number: string;
    new_password: string;
    confirm_password: string;
}
export interface IUpdatePasswordForm {
    password: string;
    new_password: string;
    confirm_password: string;
}

export interface IUpdateProfileForm {
    name: string;
}
export interface IUpdatePhoneForm {
    phone_number: string;
}

export interface ICheckoutForm {
    name: string;
    surname?: string;
    phone_number: string;
    email?: string;
    message?: string;

    // payment_method: PaymentMethodType;

    // installment: string;
    // installment_name: string;
    // installment_duration: number;
}
export interface IBuyForm {
    name: string;
    phone_number: string;
    message: string;
}

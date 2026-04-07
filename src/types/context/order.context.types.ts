import { ReactNode } from "react";
import { IProduct } from "../api/products.types";
import { PaymentMethodType, SetState } from "../types";

export interface IOrderProviderProps {
    children: ReactNode;
}

export interface IOrderContextProps {
    orderInfo: IOrderInfo | null;
    setOrderInfo: SetState<IOrderInfo | null>;
}

export interface IOrderInfo {
    name: string;
    surname?: string;
    phone_number: string;
    email?: string;
    installment?: string;
    installment_duration?: number;
    date: string;
    products: { quantity: number; item: IProduct }[];
    totalFormatted: string;

    payment_method: PaymentMethodType;
}

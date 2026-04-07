import { Locale } from "./api.types";
import { IInstallment } from "./products.types";

export interface ICalculatedInstallments {
    price: number;
    price_formatted: string;
    installment_prices: IInstallment[];
}

export interface IGetCalculatedInstallments {
    price: number;
    clientLocale?: Locale;
}

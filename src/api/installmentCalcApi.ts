import { fetchGET } from "./fetch";
import { ICalculatedInstallments, IGetCalculatedInstallments } from "@/types/api/installmentCalc.types";

export const getCalculatedInstallments = async ({ price, clientLocale }: IGetCalculatedInstallments) => {
    return await fetchGET({
        url: `calculate/installments?price=${price}`,
        tag: "CalculatedInstallments",
        clientLocale,
    }).then((data: ICalculatedInstallments) => data);
};

import { IPaymentMethods, IShippingMethods } from "@/types/api/checkoutMethods.types";
import { fetchGET } from "./fetch";

export const getShippingMethods = async () => {
    return await fetchGET({
        url: `shipping-methods`,
        tag: "Shipping",
    }).then((data: IShippingMethods) => data);
};
export const getPaymentMethods = async () => {
    return await fetchGET({
        url: `payment-methods`,
        tag: "Payment",
    }).then((data: IPaymentMethods) => data);
};

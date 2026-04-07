export interface IShippingMethods {
    data: IShippingMethod[];
}

export interface IShippingMethod {
    id: number;
    code: string;
    name: string;
    img: string;
    micro_img: string;
    description: string;
    price: number;
    order_min_price: number;
    order_max_price: number;
}

export interface IPaymentMethods {
    data: IPaymentMethod[];
}

export interface IPaymentMethod {
    id: number;
    code: string;
    name: string;
    img: string;
    micro_img: string;
    description: string;
    installment: boolean;
}

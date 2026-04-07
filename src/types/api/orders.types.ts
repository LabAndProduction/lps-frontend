import { ILinks, IMeta } from "./api.types";
import { IProduct } from "./products.types";

export interface IOrders {
    data: IOrder[];
    links: ILinks;
    meta: IMeta;
}
export interface IOrder {
    address_id: number;
    address_line_1: string;
    created_at: string;
    email: string;
    id: number;
    installment_duration: number;
    installment_percent: number;
    installment_phone_number: null;
    installment_price_per_month: number;
    installment_total: number;
    latitude: string;
    location_accuracy: string | null;
    longitude: string;
    message: string;
    name: string;
    orderItems: IOrderItem[];
    paycom_details_base64: string;
    payment_method_code: string;
    payment_method_id: number;
    payment_method_title: string;
    phone_number: string;
    shipping_method_id: number;
    shipping_method_title: string;
    shipping_price: number;
    status: number;
    status_title: string;
    subtotal: number;
    total: number;
}
export interface IOrderItem {
    id: number;
    ikpu: null;
    name: string;
    order_id: number;
    package_code: string | null;
    price: number;
    product: IProduct;
    // product: OrderProduct;
    product_id: number;
    quantity: number;
    total: number;
    vat_percent: number;
}

// export type OrderProduct = Omit<IProduct, "categories" | "stickers">;

export interface IGetOrdersParams {
    token?: string;
    quantity?: number;
    page?: number;
}

export interface ICreateOrderParams {
    token: string;
    body: ICreateOrderBody;
}

export interface ICreateOrderBody {
    name: string;
    phone_number: string;
    // email?: string;
    address_id: number;
    payment_method_id: number;
    shipping_method_id: number;
    message: string;
}

export interface IGetOrderParams {
    token?: string;
    orderId: number;
}
export interface ICreateOrderRes {
    data: IOrder;
}
export interface ISingleOrder {
    data: IOrder;
}

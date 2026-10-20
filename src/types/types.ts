import { Dispatch, RefObject, SetStateAction } from "react";
import { IMeta, Locale } from "./api/api.types";
import { IProduct, OrderBy } from "./api/products.types";
import { FormikErrors, FormikState } from "formik";

export type SpritesName =
    | "arrow"
    | "chevron"
    | "eye"
    | "eye-off"
    | "filter"
    | "phone"
    | "search"
    | "play"
    | "compare"
    | "cart"
    | "time"
    | "cart-check"
    | "heart"
    | "exit"
    | "location"
    | "user"
    | "plus"
    | "minus"
    | "email"
    | "menu"
    | "copy"
    | "x"
    | "pause"
    | "check"
    | "play"
    | "drill"
    | "medal"
    | "delivery"
    | "telegram"
    | "facebook"
    | "youtube"
    | "instagram"
    | "linkedin"
    | "column"
    | "row"
    | "trash"
    | "service";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type InputNames =
    | "name"
    | "surname"
    | "email"
    | "phone_number"
    | "password"
    | "confirm_password"
    | "pin"
    | "expiry"
    | "message"
    | "address"
    | "cost"
    | "prepayment_percent"
    | "new_password";

export interface ISetItemWithExpiryParams {
    key: string;
    value: string;
    expireTime: number;
}

export interface IUseClickOutsideParams<T> {
    ref: RefObject<T>;
    callback: () => void;
}

export interface IUsePaginationParams {
    meta: IMeta;
}

export interface IUseQuantityParams {
    productQuantity: number;
    setQuantity?: SetState<number>;
    product: IProduct;
}

export interface IUseScrollDownParams {
    threshold?: number;
}

export interface ILangOption {
    id: number;
    locale: Locale;
    label: string;
    src: string;
}
export interface IFooterMenuIcon {
    id: number;
    href: string;
    icon: SpritesName;
    quantity?: number;
    label: string;
}
export type BreadcrumbsType = {
    links: {
        href: string;
        title: string;
    }[];
    current: string;
};

export type ProductsViewType = "column" | "row";
export interface IAllAttributesAttr {
    name: string;
    slug: string;
    id: number;
    used_for_filter: 0 | 1;
}
export interface ISubmitFormFuncParams<FormValues> {
    values: FormValues;
    resetForm: ResetFormType<FormValues>;
    setSubmitting?: (isSubmitting: boolean) => void;
    setFieldValue?: SetFieldValueType<FormValues>;
}

export type SortDirectionType = "asc" | "desc";
export interface ISortBtn {
    id: number;
    option: OrderBy;
    title: string;
    direction: SortDirectionType;
}
export type AuthTab = "login" | "register" | "reset-password";
export type FulfillAfterOtpType = ({ otp }: { otp: string }) => void;

export type DashboardRoutes = "orders" | "profile";
export interface IDashboardTab {
    id: number;
    title: string;
    iconName: SpritesName;
    route: DashboardRoutes;
}
export type PaymentMethodType = "cash&card" | "installment";

export type SetFieldValueType<Form> = (
    field: string,
    value: any,
    shouldValidate: boolean | undefined,
) => Promise<void | FormikErrors<Form>>;

export type ResetFormType<T> = (nextState?: Partial<FormikState<T>> | undefined) => void;

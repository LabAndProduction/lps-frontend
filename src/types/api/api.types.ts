export interface ILocalization {
    ru: {
        slug: string;
    };
    en: {
        slug: string;
    };
}

export interface IGallery {
    original: string;
    micro: string;
    small: string;
    medium: string;
}

export interface ILinks {
    first: string;
    last: string;
    prev: string;
    next: string;
}

export interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: IMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}
interface IMetaLink {
    url: string;
    label: string;
    active: boolean;
}
export interface IFetchMutateParams {
    url: string;
    body?: Record<string, any>;
    tag: Tag;
    method: Method;
    token?: string;
    contentType?: "multipart/form-data" | "application/json";
    clientLocale?: Locale;
}
export interface IFetchGetParams {
    url: string;
    tag: Tag;
    token?: string;
    clientLocale?: Locale;
}
export interface IMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: IMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface IMetaLink {
    url: string;
    label: string;
    active: boolean;
}

export type Locale = "ru" | "en";

export type Tag =
    | "Auth"
    | "Products"
    | "Texts"
    | "Categories"
    | "CalculatedInstallments"
    | "Compare"
    | "Feedback"
    | "Settings"
    | "Addresses"
    | "Publications"
    | "Profile"
    | "Brands"
    | "Cart"
    | "Wishlist"
    | "Shipping"
    | "Payment"
    | "Partners"
    | "Menus"
    | "Promotions"
    | "ProductGroup"
    | "Regions"
    | "Banners"
    | "Reviews"
    | "Pages"
    | "Stores"
    | "StaticTexts"
    | "Orders";
export type Method = "POST" | "PUT" | "DELETE";
export interface IRedirect {
    id: number;
    from: string;
    to: string;
}

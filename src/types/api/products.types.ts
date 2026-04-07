import { IGallery, ILinks, ILocalization, IMeta, Locale } from "./api.types";

export interface IProducts {
    data: IProduct[];
    links: ILinks;
    meta: IMeta;
}

export interface IProduct {
    id: number;
    slug: string;
    product_group_id: number | null;
    name: string;
    url: string;
    sku: string | null;
    barcode: null;
    ikpu: null;
    package_code: number;
    units: number;
    brand_id: number;
    img: string;
    micro_img: string;
    small_img: string;
    medium_img: string;
    gallery: IGallery[];
    current_price: number;
    current_price_formatted: string;
    old_price: number;
    old_price_formatted: string;
    installment_prices: IInstallment[];
    discount: string;
    discount_formatted: string;
    min_price_per_month: number;
    min_price_per_month_formatted: string;
    min_price_per_month_duration: number;
    old_min_price_per_month: number;
    old_min_price_per_month_formatted: string;
    in_stock: number;
    is_special: 0 | 1;
    is_bestseller: 0 | 1;
    is_new: 0 | 1;
    is_promotion: 0 | 1;
    is_popular: 0 | 1;
    rating: number;
    rating_count: number;
    number_of_sales: number;
    description: string;
    views: number;
    categories: IProductCategory[];
    stickers: [];
    brand: IProductBrand | null;
    brand_name: string;
    is_book: boolean;
    localization: ILocalization;
    wholesale_price: string;
    wholesale_price_formatted: string;
}

export interface IInstallment {
    id: number;
    name: string;
    image: string;
    prices: IInstallmentPrice[];
    code: string;
}
export interface IInstallmentPrice {
    id: number;
    price: number;
    price_formatted: string;
    old_price: number;
    old_price_formatted: string;
    price_per_month: number;
    price_per_month_formatted: string;
    old_price_per_month: number;
    old_price_per_month_formatted: string;
    duration: number;
}
export type ProductsFilter =
    | "is_bestseller"
    | "is_discounted"
    | "is_new"
    | "is_popular"
    | "is_special"
    | "is_promotion";

interface IProductCategory {
    id: number;
    slug: string;
    parent_id: number;
    order: number;
    name: string;
    url: string;
    img: string;
    small_img: string;
    icon: string;
    small_icon: string;
    svg_icon: string;
    description: string;
    localization: ILocalization;
}

export interface IProductBrand {
    id: number;
    slug: string;
    order: number;
    name: string;
    url: string;
    img: string;
    small_img: string;
    description: string;
    bg: string;
    accent_color: string;
    localization: ILocalization;
}

export type OrderBy = "created_at" | "price" | "views" | "rating" | "discount" | string;

export interface IGetProductsParams {
    page?: number;
    quantity?: number;
    order_by?: OrderBy;
    order_direction?: "asc" | "desc";
    category_id?: number;
    price_from?: number | null;
    price_to?: number | null;
    is_new?: 0 | 1 | null;
    is_special?: 0 | 1 | null;
    is_bestseller?: 0 | 1 | null;
    is_promotion?: 0 | 1 | null;
    is_popular?: 0 | 1 | null;
    is_discounted?: 0 | 1 | null;
    search?: string;
    brands?: number[] | null;
    attributes?:
        | {
              attrId: number;
              attrValId: number;
          }[]
        | null;
    clientLocale?: Locale;
}

export interface ISingleProduct {
    data: IProduct & {
        h1_name: string;
        body: string;
        seo_title: string;
        meta_description: string;
        meta_keywords: string;
        book: string;
        body2: string;
    };
}

export interface IProductAttributes {
    data: IProductAttribute[];
}

export interface IProductAttribute {
    id: number;
    slug: string;
    name: string;
    used_for_filter: 0 | 1;
    attribute_values: IProductAttributeValue[];
}

export interface IProductAttributeValue {
    id: number;
    slug: string;
    name: string;
    used_for_filter: 0 | 1;
}

export interface IGetProductParams {
    productId: number;
}
export interface IGetProductAttributesParams {
    productId: number;
    clientLocale?: Locale;
}

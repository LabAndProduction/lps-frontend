import { OrderBy } from "./api/products.types";
import { SortDirectionType } from "./types";

export interface IPageParamsWithId {
    params: Promise<{ id: string }>;
}

export interface ICategoryPageParams {
    params: Promise<{ id: string }>;
    searchParams: Promise<ICategoryPageSearchParams>;
}
export interface IProductPageParams {
    params: Promise<{ id: string }>;
}
export interface ICategoryPageSearchParams {
    is_discounted?: string;
    is_bestseller?: string;
    is_new?: string;
    is_popular?: string;
    is_promotion?: string;
    is_special?: string;
    price?: string;
    brands?: string;
    attributes?: string;
    sort?: OrderBy;
    direction?: SortDirectionType;
    page?: string;
}

export interface ISearchPageParams {
    searchParams: Promise<{
        keyword: string;
        page?: string;
        price?: string;
        brands?: string;
        sort?: OrderBy;
        direction?: SortDirectionType;
    }>;
}

export interface INewsPageParams {
    searchParams: Promise<{
        page?: string;
    }>;
}

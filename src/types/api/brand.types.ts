import { ILinks, ILocalization, IMeta } from "./api.types";
import { ICategory } from "./categories.types";

export interface IBrands {
    data: SingleBrand[];
    links: ILinks;
    meta: IMeta;
}

export type SingleBrand = Omit<IBrand, "h1_name" | "body" | "seo_title" | "meta_description" | "meta_keywords">;

interface IBrand {
    id: number;
    slug: string;
    order: number;
    name: string;
    h1_name: string;
    url: string;
    img: string;
    small_img: string;
    description: string;
    body: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string;
    bg: string;
    accent_color: string;
    localization: ILocalization;
}

export interface ISingleBrand {
    data: IBrand;
}

export interface IBrandCategory extends Omit<
    ICategory,
    "h1_name" | "body" | "seo_title" | "meta_description" | "meta_keywords"
> {
    children: IBrandCategory[];
}
export interface IBrandCategories {
    data: IBrandCategory[];
}

export interface IGetBrandsParams {
    page?: number;
    quantity?: number;
    is_featured?: boolean;
}

export interface IGetBrandParams {
    brandId: number;
}
export interface IGetBrandCategoriesParams {
    brandId: number;
}

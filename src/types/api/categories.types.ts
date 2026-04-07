import { ILinks, ILocalization, IMeta } from "./api.types";
import { SingleBrand } from "./brand.types";

export interface ICategoriesTree {
    data: ICategoryTree[];
    links: ILinks;
    meta: IMeta;
}
export interface ICategoryTree {
    id: number;
    slug: string;
    parent_id: number | null;
    order: number;
    name: string;
    url: string;
    img: string;
    small_img: string;
    icon: string;
    small_icon: string;
    svg_icon: string;
    description: string;
    // children: Omit<ICategory, "h1_name" | "body" | "seo_title" | "meta_description" | "meta_keywords">[];
    children: ICategoryTree[];
    localization: ILocalization;
}

export interface ICategories {
    data: CategoryWithoutMeta[];
}

export type CategoryWithoutMeta = Omit<
    ICategory,
    "h1_name" | "body" | "seo_title" | "meta_description" | "meta_keywords"
>;

export interface ICategory {
    id: number;
    slug: string;
    parent_id: number | null;
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

    h1_name: string;
    body: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string;
}

export interface ISingleCategory {
    data: ICategory & {
        video_btn_text?: string;
        video_link?: string;
        video_title?: string;
        video_url?: string;
        poster_img?: string;
    };
}

export interface ICategoryAttributes {
    data: ICategoryAttribute[];
}

export interface ICategoryAttribute {
    id: number;
    slug: string;
    name: string;
    used_for_filter: 0 | 1;
    attribute_values: IAttrValue[];
}

interface IAttrValue {
    id: number;
    slug: string;
    name: string;
    used_for_filter: 0 | 1;
}

export interface ICategoryBrands {
    data: SingleBrand[];
}

export interface IPrices {
    min: number;
    max: number;
}

export interface IGetCategoryParams {
    categoryId: number;
}
export interface IGetParentCategoryParams {
    categoryId: number;
}
export interface IGetSubCategoriesParams {
    categoryId: number;
}
export interface IGetCategoryBrandsParams {
    categoryId: number;
}
export interface IGetCategoryAttributesParams {
    categoryId: number;
}
export interface IGetCategoryPricesParams {
    categoryId: number;
}

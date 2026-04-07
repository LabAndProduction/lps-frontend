import { ILocalization } from "./api.types";

export interface IPages {
    data: Omit<IPage, "body" | "seo_title" | "meta_description" | "meta_keywords">[];
}

interface IPage {
    id: number;
    slug: string;
    name: string;
    url: string;
    img: string;
    small_img: string;
    description: string;
    body: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string;
    localization: ILocalization;
}

export interface ISinglePage {
    data: IPage;
}
export interface IGetPageParams {
    pageId: number;
}

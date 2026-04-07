import { ILinks, ILocalization, IMeta } from "./api.types";

export interface IPublications {
    data: IPublicationsPublication[];
    links: ILinks;
    meta: IMeta;
}
export type IPublicationsPublication = Omit<IPublication, "body" | "seo_title" | "meta_description" | "meta_keywords">;

export interface IPublication {
    id: number;
    slug: string;
    type: PublicationType;
    name: string;
    url: string;
    img: string;
    small_img: string;
    medium_img: string;
    description: string;
    body: string;
    seo_title: string;
    meta_description: string;
    meta_keywords: string;
    created_at: string;
    video_code: string;
    localization: ILocalization;
}

export type PublicationType = 2 | 13;

export interface ISinglePublication {
    data: IPublication;
}

export interface IGetPublicationsParams {
    type: PublicationType;
    page?: number;
    quantity?: number;
}
export interface IGetPublicationParams {
    id: number;
}

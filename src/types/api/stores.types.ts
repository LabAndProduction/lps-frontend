import { ILinks, ILocalization, IMeta } from "./api.types";

export interface IGetStoresParams {
    page?: number;
    quantity?: number;
}
export interface IGetStoreParams {
    id: number;
}

export interface IStores {
    data: IStore[];
    meta: IMeta;
    links: ILinks;
}

export interface IStore {
    id: number;
    slug: string;
    name: string;
    img: string;
    small_img: string;
    email: string;
    phone_number: string;
    address: string;
    landmark: string;
    work_hours: string;
    latitude: string;
    longitude: string;
    map_code: string;
    localization: ILocalization;
}

export type SingleStore = IStore & {
    seo_title: string;
    meta_description: string;
    meta_keywords: string;
};

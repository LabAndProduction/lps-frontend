import { Locale } from "./api.types";

export interface IBanners {
    data: IBanner[];
}
export interface IBanner {
    id: number;
    name: string;
    description: string;
    button_text: string;
    url: string;
    img: string;
    active_from: string | null;
    active_to: string | null;
    text_color: string | null;
    text_position: BannerTextPosition;
}

type BannerTextPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "middle-left"
    | "middle-center"
    | "middle-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type BannerType = "home_1" | "home_2" | "category_page_1" | "menu_1";

export interface IGetBannersParams {
    type: BannerType;
    category_id?: number;
    clientLocale?: Locale;
}

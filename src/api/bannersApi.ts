import { fetchGET } from "./fetch";

import { IBanners, IGetBannersParams } from "@/types/api/banners.types";

export const getBanners = async ({ type, category_id, clientLocale }: IGetBannersParams) => {
    return await fetchGET({
        url: `banners?type=${type}${category_id ? `&category_id=${category_id}` : ""}`,
        tag: "Banners",
        clientLocale,
    }).then((data: IBanners) => data);
};

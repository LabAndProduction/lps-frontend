import { IGetPromotionParams, IGetPromotionsParams, IPromotions, ISinglePromotion } from "@/types/api/promotion.types";
import { fetchGET } from "./fetch";

export const getPromotions = async ({ page = 1, quantity = 10, type }: IGetPromotionsParams) => {
    return await fetchGET({
        url: `promotions?page=${page}&quantity=${quantity}${type ? `&type=${type}` : null}`,
        tag: "Promotions",
    }).then((data: IPromotions) => data);
};

export const getPromotion = async ({ id }: IGetPromotionParams) => {
    return await fetchGET({
        url: `promotions/${id}`,
        tag: "Promotions",
    }).then((data: { data: ISinglePromotion }) => data);
};

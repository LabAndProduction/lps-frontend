import {
    IBrandCategories,
    IBrands,
    IGetBrandCategoriesParams,
    IGetBrandParams,
    IGetBrandsParams,
    ISingleBrand,
} from "@/types/api/brand.types";

import { fetchGET } from "./fetch";

export const getBrands = async ({ page = 1, quantity, is_featured }: IGetBrandsParams) => {
    return await fetchGET({
        url: `brands/?page=${page}${quantity ? `&quantity=${quantity}` : ""}${is_featured ? `&is_featured=1` : ""}`,
        tag: "Brands",
    }).then((data: IBrands) => data);
};

export const getBrand = async ({ brandId }: IGetBrandParams) => {
    return await fetchGET({
        url: `brands/${brandId}`,
        tag: "Brands",
    }).then((data: ISingleBrand) => data);
};

export const getBrandCategories = async ({ brandId }: IGetBrandCategoriesParams) => {
    return await fetchGET({
        url: `brands/${brandId}/categories/tree`,
        tag: "Brands",
    }).then((data: IBrandCategories) => data);
};

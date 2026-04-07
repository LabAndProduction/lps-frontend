import {
    IBrandCategories,
    IBrands,
    IGetBrandCategoriesParams,
    IGetBrandParams,
    IGetBrandsParams,
    ISingleBrand,
} from "@/types/api/brand.types";

import { fetchGET } from "./fetch";

export const getBrands = async ({ page = 1, quantity = 20 }: IGetBrandsParams) => {
    return await fetchGET({
        url: `brands/?page=${page}&quantity=${quantity}`,
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

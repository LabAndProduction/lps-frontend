import {
    ICategories,
    ICategoriesTree,
    ICategoryAttributes,
    ICategoryBrands,
    IGetCategoryAttributesParams,
    IGetCategoryBrandsParams,
    IGetCategoryParams,
    IGetCategoryPricesParams,
    IGetParentCategoryParams,
    IGetSubCategoriesParams,
    IPrices,
    ISingleCategory,
} from "@/types/api/categories.types";

import { fetchGET } from "./fetch";

export const getCategoriesTree = async () => {
    return await fetchGET({
        url: "categories/tree",
        tag: "Categories",
    }).then((data: ICategoriesTree) => data);
};

export const getCategory = async ({ categoryId }: IGetCategoryParams) => {
    return await fetchGET({
        url: `categories/${categoryId}`,
        tag: "Categories",
    }).then((data: ISingleCategory) => data);
};

export const getParentCategory = async ({ categoryId }: IGetParentCategoryParams) => {
    return await fetchGET({
        url: `categories/${categoryId}`,
        tag: "Categories",
    }).then(async (data: ISingleCategory) => {
        if (data.data.parent_id) {
            return await fetchGET({
                url: `categories/${data.data.parent_id}`,
                tag: "Categories",
            }).then((data: ISingleCategory) => {
                return data;
            });
        } else {
            return "Not exist";
        }
    });
};

export const getSubCategories = async ({ categoryId }: IGetSubCategoriesParams) => {
    return await fetchGET({
        url: `categories/${categoryId}/subcategories`,
        tag: "Categories",
    }).then((data: ICategories) => data);
};

export const getCategoryBrands = async ({ categoryId }: IGetCategoryBrandsParams) => {
    return await fetchGET({
        url: `categories/${categoryId}/brands`,
        tag: "Categories",
    }).then((data: ICategoryBrands) => data);
};

export const getCategoryAttributes = async ({ categoryId }: IGetCategoryAttributesParams) => {
    return await fetchGET({
        url: `categories/${categoryId}/attributes?only_filter=1`,
        tag: "Categories",
    }).then((data: ICategoryAttributes) => data);
};

export const getCategoryPrices = async ({ categoryId }: IGetCategoryPricesParams) => {
    return await fetchGET({
        url: `categories/${categoryId}/prices`,
        tag: "Categories",
    }).then((data: IPrices) => data);
};

export const getSaleCategories = async () => {
    return await fetchGET({
        url: `categories/sale`,
        tag: "Categories",
    }).then((data: ICategories) => data);
};
export const getPopularCategories = async () => {
    return await fetchGET({
        url: `categories/popular`,
        tag: "Categories",
    }).then((data: ICategories) => data);
};

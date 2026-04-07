import { IGetPageParams, IPages, ISinglePage } from "@/types/api/pages.types";
import { fetchGET } from "./fetch";

export const getPages = async () => {
    return await fetchGET({
        url: "pages",
        tag: "Pages",
    }).then((data: IPages) => data);
};

export const getPage = async ({ pageId }: IGetPageParams) => {
    return await fetchGET({
        url: `pages/${pageId}`,
        tag: "Pages",
    }).then((data: ISinglePage) => data);
};

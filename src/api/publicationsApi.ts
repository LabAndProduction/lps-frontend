import {
    IGetPublicationParams,
    IGetPublicationsParams,
    IPublications,
    ISinglePublication,
} from "@/types/api/publications.types";

import { fetchGET } from "./fetch";

export const getPublications = async ({ type, page, quantity }: IGetPublicationsParams) => {
    return await fetchGET({
        url: `publications?type=${type}&page=${page}&quantity=${quantity}`,
        tag: "Publications",
    }).then((data: IPublications) => data);
};

export const getPublication = async ({ id }: IGetPublicationParams) => {
    return await fetchGET({
        url: `publications/${id}`,
        tag: "Publications",
    }).then((data: ISinglePublication) => data);
};

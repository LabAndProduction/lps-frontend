import { fetchGET } from "./fetch";
import { IGetStaticTextParams, IStaticText } from "@/types/api/staticTexts.types";

export const getStaticText = async ({ searchKey }: IGetStaticTextParams) => {
    return await fetchGET({
        url: `static-texts/search?key=${searchKey}`,
        tag: "StaticTexts",
    }).then((data: { data: IStaticText }) => data);
};

export const getStaticTextAdvantages = async () => {
    return await fetchGET({
        url: `static-texts/advantages`,
        tag: "StaticTexts",
    }).then((data: { data: IStaticText[] }) => data);
};

export const getStaticTextAbout = async () => {
    return await fetchGET({
        url: `static-texts/about`,
        tag: "StaticTexts",
    }).then((data: { data: IStaticText[] }) => data);
};

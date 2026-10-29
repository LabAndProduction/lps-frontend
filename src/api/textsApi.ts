import { Locale } from "@/types/api/api.types";
import { fetchGET } from "./fetch";
import { ITexts, TextKey } from "@/types/api/text.types";

export const fetchTexts = async (clientLocale?: Locale) => {
    let texts: ITexts = { data: [] };

    // when the API refuses (429 "Too many requests") the keys themselves are shown instead of
    // failing the whole page
    await fetchGET({ url: "texts", tag: "Texts", clientLocale: clientLocale }).then((data: ITexts) => {
        if (data?.data) texts = data;
    });
    return texts;
};

export const getTexts = async (clientLocale?: Locale) => {
    const texts = await fetchTexts(clientLocale);

    return {
        texts,
        text: (key: TextKey) => texts.data.find((el) => el.key == key)?.value || key,
    };
};

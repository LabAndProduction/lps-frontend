import { ISettings } from "@/types/api/settings.types";
import { fetchGET } from "./fetch";

export const getSettings = async () => {
    return await fetchGET({ url: "settings", tag: "Settings" }).then((data: ISettings) => data);
};

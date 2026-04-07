import { IRegion } from "@/types/api/regions.types";
import { fetchGET } from "./fetch";

export const getRegions = async () => {
    return await fetchGET({ url: "regions", tag: "Regions" }).then((data: { data: IRegion[] }) => data);
};

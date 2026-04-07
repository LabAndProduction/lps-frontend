import { IPartner } from "@/types/api/partners.types";
import { fetchGET } from "./fetch";

export const getPartners = async () => {
    return await fetchGET({ url: "partners", tag: "Partners" }).then((data: { data: IPartner[] }) => data);
};

export const getPartner = async ({ partnerId }: { partnerId: string }) => {
    return await fetchGET({ url: `partners/${partnerId}`, tag: "Partners" }).then((data: { data: IPartner }) => data);
};

import { IGetMenuParams, IMenus, ISingleMenu } from "@/types/api/menus.types";
import { fetchGET } from "./fetch";

export const getMenus = async () => {
    return await fetchGET({ url: "menus", tag: "Menus" }).then((data: IMenus) => data);
};

export const getMenu = async ({ menuId }: IGetMenuParams) => {
    return await fetchGET({
        url: `menus/${menuId}`,
        tag: "Menus",
    }).then((data: ISingleMenu) => data);
};

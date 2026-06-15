import { getSettings } from "@/api/settingsApi";
import HeaderBottom from "./headerBottom/HeaderBottom";
import HeaderTop from "./headerTop/HeaderTop";
import { getMenu } from "@/api/menusApi";
import { ICategoriesTree } from "@/types/api/categories.types";

export interface IHeaderProps {
    categoriesTree: ICategoriesTree;
}

export default async function Header({ categoriesTree }: IHeaderProps) {
    const settings = await getSettings();
    const menu2 = await getMenu({ menuId: 2 });

    return (
        <>
            <HeaderTop settings={settings} menu={menu2} />
            <HeaderBottom settings={settings} categoriesTree={categoriesTree} />
        </>
    );
}

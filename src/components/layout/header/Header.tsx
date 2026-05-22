import { getSettings } from "@/api/settingsApi";
import HeaderBottom from "./headerBottom/HeaderBottom";
import HeaderTop from "./headerTop/HeaderTop";
import { IHeaderProps } from "@/types/props/types";
import { getMenu } from "@/api/menusApi";

export default async function Header({ categoriesTree, menu }: IHeaderProps) {
    const settings = await getSettings();
    const menu2 = await getMenu({ menuId: 2 });

    return (
        <>
            <HeaderTop settings={settings} menu={menu2} />
            <HeaderBottom settings={settings} menu={menu} categoriesTree={categoriesTree} />
        </>
    );
}

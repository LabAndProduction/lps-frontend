import { getSettings } from "@/api/settingsApi";
import HeaderBottom from "./headerBottom/HeaderBottom";
import HeaderTop from "./headerTop/HeaderTop";
import { IHeaderProps } from "@/types/props/types";

export default async function Header({ categoriesTree, menu }: IHeaderProps) {
    const settings = await getSettings();

    return (
        <>
            <HeaderTop />
            <HeaderBottom settings={settings} menu={menu} categoriesTree={categoriesTree} />
        </>
    );
}

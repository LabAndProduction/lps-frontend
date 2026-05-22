"use client";

// import Icon from "@/components/ui/Icon";
// import AuthMenu from "@/components/ui/modals/authMenu/AuthMenu";
// import { Link } from "@/i18n/routing";
// import { useCookies } from "next-client-cookies";
import HeaderQuantityIcons from "./headerQuantityIcons/HeaderQuantityIcons";
import HeaderSearchBtn from "./headerSearchBtn/HeaderSearchBtn";
import { IHeaderIconsProps } from "@/types/props/types";
import HeaderMenu from "../../headerMenu/HeaderMenu";

export default function HeaderIcons({ setIsSearchOpen, isSearchOpen, menu, categoriesTree }: IHeaderIconsProps) {
    // const cookies = useCookies();
    // const token = cookies.get("token");

    return (
        <div className="lg:flex hidden items-center xl:gap-5 gap-4 py-3">
            <HeaderSearchBtn setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />

            {/* {token ? (
                <Link href="/dashboard/profile" className={`relative flex-center group group`}>
                    <Icon name="user" className={`size-8 text-primary group-hover:text-main`} />
                </Link>
            ) : (
                <AuthMenu />
            )} */}

            <HeaderQuantityIcons />
            {/* <div className="xl:hidden">
                <HeaderMenu categoriesTree={categoriesTree} menu={menu} isBtnWithText={false} />
            </div> */}
        </div>
    );
}

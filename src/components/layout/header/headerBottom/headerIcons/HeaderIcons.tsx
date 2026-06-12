"use client";

import HeaderQuantityIcons from "./headerQuantityIcons/HeaderQuantityIcons";
import { IHeaderIconsProps } from "@/types/props/types";
import { useCookies } from "next-client-cookies";
import { Link } from "@/i18n/routing";
import Icon from "@/components/ui/Icon";
import AuthMenu from "@/components/ui/modals/authMenu/AuthMenu";

export default function HeaderIcons() {
    const cookies = useCookies();
    const token = cookies.get("token");

    return (
        <div className="lg:flex hidden items-center xl:gap-5 gap-4 py-3">
            {token ? (
                <Link href="/dashboard/profile" className={`relative flex-center group group`}>
                    <Icon name="user" className={`size-8 text-primary group-hover:text-main`} />
                </Link>
            ) : (
                <AuthMenu />
            )}

            <HeaderQuantityIcons />
        </div>
    );
}

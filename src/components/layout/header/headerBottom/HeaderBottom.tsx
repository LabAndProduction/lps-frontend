"use client";

import { Link } from "@/i18n/routing";
import HeaderIcons from "./headerIcons/HeaderIcons";
import HeaderMobileLinks from "./headerMobileLinks/HeaderMobileLinks";
import HeaderSearchForm from "../headerSearchForm/HeaderSearchForm";
import { useRef } from "react";
import { IHeaderBottomProps } from "@/types/props/types";
import { useText } from "@/context/text.context";
import { useSettings } from "@/context/settings.context";
import useElementHeight from "@/hooks/useElementHeight";
import HeaderCategoriesMenu from "./headerCategoriesMenu/HeaderCategoriesMenu";
import SiteLogo from "@/components/ui/SiteLogo";
import { useLocale } from "next-intl";

export default function HeaderBottom({ settings, categoriesTree }: IHeaderBottomProps) {
    const locale = useLocale();
    const { text } = useText();
    const headerRef = useRef<HTMLDivElement>(null);

    const { setHeaderHeight } = useSettings();

    useElementHeight({ element: headerRef, setHeight: setHeaderHeight });

    return (
        <header
            ref={headerRef}
            className="header sticky lg:top-[2.75rem] top-0 relative bg-white z-90">
            <div className="container flex justify-between lg:gap-4 md:gap-10 gap-8">
                <div className="flex lg:gap-[3.125rem] gap-4">
                    <Link href="/" className="flex items-center py-3">
                        <SiteLogo locale={locale} />
                    </Link>

                    <div className="py-2.5 lg:flex-center hidden">
                        <HeaderCategoriesMenu categoriesTree={categoriesTree} />
                    </div>
                </div>

                <HeaderSearchForm />
                {/* {isSearchOpen ? (
                    <HeaderSearchForm setIsSearchOpen={setIsSearchOpen} />
                ) : (
                    <HeaderLinks categoriesTree={categoriesTree} />
                )} */}

                <HeaderMobileLinks settings={settings} />

                <HeaderIcons />
            </div>
        </header>
    );
}

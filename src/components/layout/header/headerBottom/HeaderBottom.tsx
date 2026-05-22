"use client";

import { Link } from "@/i18n/routing";
import HeaderIcons from "./headerIcons/HeaderIcons";
import NextImage from "@/components/ui/NextImage";
import HeaderMobileLinks from "./headerMobileLinks/HeaderMobileLinks";
import HeaderSearchForm from "../headerSearchForm/HeaderSearchForm";
import { useRef, useState } from "react";
import { IHeaderBottomProps } from "@/types/props/types";
import { useText } from "@/context/text.context";
import classNames from "classnames";
import Icon from "@/components/ui/Icon";
import { useSettings } from "@/context/settings.context";
import useElementHeight from "@/hooks/useElementHeight";
import HeaderCategoriesMenu from "./headerCategoriesMenu/HeaderCategoriesMenu";

export default function HeaderBottom({ settings, menu, categoriesTree }: IHeaderBottomProps) {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const { text } = useText();
    const headerRef = useRef<HTMLDivElement>(null);

    const { setHeaderHeight } = useSettings();

    useElementHeight({ element: headerRef, setHeight: setHeaderHeight });

    return (
        <header
            ref={headerRef}
            className="header sticky lg:top-[2.75rem] top-0 relative bg-white shadow-[0_0.125rem_0.5rem_0_var(--color-black-5)] z-90">
            <div className="container flex  justify-between md:gap-10 gap-8">
                <div className="flex gap-4">
                    <Link href="/" className="py-3">
                        <NextImage
                            src={"/images/logo.png"}
                            alt="LPS"
                            width={120}
                            height={56}
                            className="lg:w-[7.5rem] sm:w-[6.5rem] w-[5.5rem] h-auto object-contain"
                            unoptimized
                        />
                    </Link>

                    <div className="py-2.5 lg:flex-center hidden">
                        <HeaderCategoriesMenu categoriesTree={categoriesTree} />
                    </div>
                </div>

                {isSearchOpen && <HeaderSearchForm setIsSearchOpen={setIsSearchOpen} />}
                {/* {isSearchOpen ? (
                    <HeaderSearchForm setIsSearchOpen={setIsSearchOpen} />
                ) : (
                    <HeaderLinks categoriesTree={categoriesTree} />
                )} */}

                <HeaderMobileLinks settings={settings} setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />

                <HeaderIcons
                    setIsSearchOpen={setIsSearchOpen}
                    isSearchOpen={isSearchOpen}
                    menu={menu}
                    categoriesTree={categoriesTree}
                />
            </div>
        </header>
    );
}

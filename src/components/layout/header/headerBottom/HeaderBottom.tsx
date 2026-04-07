"use client";

import { Link } from "@/i18n/routing";
import HeaderLinks from "./headerLinks/HeaderLinks";
import HeaderIcons from "./headerIcons/HeaderIcons";
import NextImage from "@/components/ui/NextImage";
import HeaderMobileLinks from "./headerMobileLinks/HeaderMobileLinks";
import HeaderSearchForm from "../headerSearchForm/HeaderSearchForm";
import { useState } from "react";
import { IHeaderBottomProps } from "@/types/props/types";

export default function HeaderBottom({ settings, menu, categoriesTree }: IHeaderBottomProps) {
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    return (
        <header className="header sticky lg:top-[2.75rem] top-0 relative bg-white shadow-[0_0.125rem_0.5rem_0_var(--color-black-5)] z-90">
            <div className="container flex  justify-between md:gap-10 gap-8">
                {/* <Link href="/" className="py-3 flex items-center sm:gap-3 gap-[0.625rem]">
                    <span className="flex flex-center bg-main rounded-full relative sm:min-w-[3.5rem] sm:size-[3.5rem] min-w-[3rem] size-[3rem]">
                        <NextImage
                            src={"/images/logo.webp"}
                            alt="LG"
                            width={56}
                            height={56}
                            className="size-full object-contain scale-[1.35]"
                        />
                    </span>
                    <NextImage
                        src="/images/logo-lg.svg"
                        alt=""
                        width={52}
                        height={34}
                        className="sm:w-[3.25rem] w-[2.625rem] h-auto"
                    />
                </Link> */}
                <Link href="/" className="py-3">
                    <NextImage
                        src={"/images/logo.svg"}
                        alt="LG"
                        width={120}
                        height={56}
                        className="lg:w-[7.5rem] sm:w-[6.5rem] w-[5.5rem] h-auto object-contain"
                    />
                </Link>

                {isSearchOpen ? (
                    <HeaderSearchForm setIsSearchOpen={setIsSearchOpen} />
                ) : (
                    <HeaderLinks categoriesTree={categoriesTree} />
                )}

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

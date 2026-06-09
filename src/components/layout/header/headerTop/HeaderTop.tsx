"use client";

import { Link } from "@/i18n/routing";

import Icon from "@/components/ui/Icon";
import HeaderTopLinks from "./headerTopLinks/HeaderTopLinks";
import LangSelect from "../langSelect/LangSelect";
import { ISettings } from "@/types/api/settings.types";
import { useRef } from "react";
import { useSettings } from "@/context/settings.context";
import useElementHeight from "@/hooks/useElementHeight";
import { ISingleMenu } from "@/types/api/menus.types";
import { phoneFormatter } from "@/utils/phoneFormatter";

export default function HeaderTop({ settings, menu }: { settings: ISettings; menu: ISingleMenu }) {
    const headerTopRef = useRef<HTMLDivElement>(null);
    const { setHeaderTopHeight } = useSettings();

    useElementHeight({ element: headerTopRef, setHeight: setHeaderTopHeight });

    return (
        <div ref={headerTopRef} className="header-top lg:block hidden sticky top-0 bg-gray py-[0.625rem] z-91">
            <div className="container flex justify-between">
                <HeaderTopLinks menu={menu} />

                <div className="flex items-center gap-10">
                    <LangSelect />

                    <div className="flex items-center gap-2">
                        <Icon name="phone" className="size-[1.125rem] group-hover:text-main" />
                        <div className="flex items-center gap-4">
                            <Link href={`tel:${settings.phone}`} className="flex font-semibold text-sm hover:text-main">
                                {phoneFormatter(settings.phone)}
                            </Link>
                            <Link
                                href={`tel:${settings.phone2}`}
                                className="flex font-semibold text-sm hover:text-main">
                                {phoneFormatter(settings.phone2)}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Link } from "@/i18n/routing";
import classNames from "classnames";
import { useState } from "react";
import { IHeaderCategorySubmenuProps } from "@/types/props/types";
import useHeaderSize from "@/hooks/useHeaderSize";
import HeaderSubmenuContent from "./headerSubmenuContent/HeaderSubmenuContent";

export default function HeaderCategorySubmenu({ category, btnClassname, spanClassname }: IHeaderCategorySubmenuProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { height } = useHeaderSize();

    return (
        <>
            <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
                <Link
                    prefetch={false}
                    href={`/categories/${category.id}-${category.slug}`}
                    className={classNames(btnClassname, isOpen ? "text-main" : "")}>
                    <span className={classNames(spanClassname, isOpen ? "after:translate-x-0" : "")}>
                        {category.name}
                    </span>
                </Link>

                {isOpen && (
                    <div
                        className={classNames(
                            `fixed max-h-[80vh] left-0 h-fit w-full overflow-y-auto z-[89]`,
                            // isOpen
                            //     ? "opacity-100 visible translate-y-0 pointer-events-auto"
                            //     : "opacity-0 invisible translate-y-4 pointer-events-none",
                            isOpen ? "block pointer-events-auto" : "hidden pointer-events-none",
                        )}
                        style={{ top: `${height - 10}px` }}>
                        <HeaderSubmenuContent category={category} />
                    </div>
                )}
            </div>
            {isOpen && <div className="fixed size-full left-0 top-0 bg-black-20" style={{ top: `${height}px` }}></div>}
        </>
    );
}

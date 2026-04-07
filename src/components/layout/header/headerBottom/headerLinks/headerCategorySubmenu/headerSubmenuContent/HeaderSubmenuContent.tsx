import { Link } from "@/i18n/routing";
import classNames from "classnames";
import HeaderSubmenuBanners from "./headerSubmenuBanners/HeaderSubmenuBanners";
import React from "react";
import { IHeaderSubmenuContentProps } from "@/types/props/types";

function HeaderSubmenuContent({ category }: IHeaderSubmenuContentProps) {
    const linkClassname = "flex items-center py-[0.375rem] px-[0.625rem] hover:bg-gray rounded-main leading-100";

    return (
        <div className="w-full bg-white">
            <div className="container flex flex-col gap-6 py-6">
                <div className="grid grid-cols-4 gap-6">
                    {category.children.map((childCategory) => (
                        <div key={childCategory.id}>
                            <Link
                                prefetch={false}
                                href={`/categories/${childCategory.id}-${childCategory.slug}`}
                                className={classNames(linkClassname, "xl:!text-lg !text-base font-medium")}>
                                {childCategory.name}
                            </Link>

                            <div className="flex flex-col gap-1">
                                {childCategory.children.map((subChild) => (
                                    <Link
                                        prefetch={false}
                                        key={subChild.id}
                                        href={`/categories/${subChild.id}-${subChild.slug}`}
                                        className={linkClassname}>
                                        {subChild.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <HeaderSubmenuBanners category={category} />
            </div>
        </div>
    );
}

export default React.memo(HeaderSubmenuContent);

import Icon from "@/components/ui/Icon";
import { useSettings } from "@/context/settings.context";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { ICategoriesTree } from "@/types/api/categories.types";
import classNames from "classnames";
import { Fragment, useState } from "react";
import SimpleBar from "simplebar-react";

export default function HeaderMenuContent({
    closeMenu,
    categoriesTree,
}: {
    closeMenu: () => void;
    categoriesTree: ICategoriesTree;
}) {
    const { headerTopHeight, headerHeight } = useSettings();
    const [activeCategory, setActiveCategory] = useState<number>(categoriesTree.data[0].id);

    const { text } = useText();
    const maxHeight = `calc(100vh - ${(headerHeight + headerTopHeight + 32 * 2) / 16}rem)`;

    return (
        <div className="container relative z-1">
            {categoriesTree && (
                <div className="grid grid-cols-[20rem_1fr] gap-8 py-8">
                    <div>
                        <SimpleBar
                            className="[.simplebar-scrollable-y]:pr-3.5"
                            style={{
                                maxHeight,
                            }}>
                            <div className="flex flex-col">
                                {categoriesTree.data.map((category) => (
                                    <Link
                                        href={`/categories/${category.id}-${category.slug}`}
                                        key={category.id}
                                        onMouseOver={() => setActiveCategory(category.id)}
                                        onClick={() => closeMenu()}
                                        className={classNames(
                                            "flex items-center gap-3 justify-between py-2.5 px-3 group rounded-lg",
                                            activeCategory == category.id && "bg-gray",
                                        )}>
                                        <span
                                            className={classNames(
                                                "font-bold leading-snug",
                                                activeCategory == category.id && "text-main!",
                                            )}>
                                            {category.name}
                                        </span>

                                        {category.children.length > 0 && (
                                            <Icon
                                                name="chevron"
                                                className={classNames(
                                                    "size-4! text-main  opacity-0",
                                                    activeCategory == category.id && "opacity-100",
                                                )}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </SimpleBar>
                    </div>
                    <div>
                        <SimpleBar
                            style={{
                                maxHeight,
                            }}>
                            <div className="flex flex-col gap-3">
                                {categoriesTree.data.map((category) =>
                                    activeCategory == category.id ? (
                                        <Fragment key={category.id}>
                                            <Link
                                                href={`/categories/${category.id}-${category.slug}`}
                                                onClick={() => closeMenu()}
                                                className="font-bold text-2xl leading-snug hover:opacity-60">
                                                {category.name}
                                            </Link>

                                            <div className="grid 2xl:grid-cols-4 grid-cols-3 gap-3">
                                                {category.children.map((subcategory) => (
                                                    <Link
                                                        key={subcategory.id}
                                                        href={`/categories/${subcategory.id}-${subcategory.slug}`}
                                                        onClick={() => closeMenu()}
                                                        className="hover:text-main leading-snug font-semibold">
                                                        {subcategory.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </Fragment>
                                    ) : (
                                        <Fragment key={category.id}></Fragment>
                                    ),
                                )}
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            )}
        </div>
    );
}

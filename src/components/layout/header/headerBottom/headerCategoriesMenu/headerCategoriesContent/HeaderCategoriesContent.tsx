import { useSettings } from "@/context/settings.context";
import { Link } from "@/i18n/routing";
import { ICategoriesTree } from "@/types/api/categories.types";
import classNames from "classnames";
import SimpleBar from "simplebar-react";

export default function HeaderMenuContent({
    closeMenu,
    categoriesTree,
}: {
    closeMenu: () => void;
    categoriesTree: ICategoriesTree;
}) {
    const { headerTopHeight, headerHeight } = useSettings();

    const maxHeight = `calc(100vh - ${(headerHeight + headerTopHeight + 32 * 2) / 16}rem)`;

    return (
        <div className="container relative z-1">
            {categoriesTree && (
                <SimpleBar
                    className="[.simplebar-scrollable-y]:pr-3.5 py-8"
                    style={{
                        maxHeight,
                    }}>
                    <div className="grid grid-cols-3 flex-col">
                        {categoriesTree.data.map((category) => (
                            <Link
                                href={`/categories/${category.id}-${category.slug}`}
                                key={category.id}
                                onClick={() => closeMenu()}
                                className={classNames(
                                    "flex items-center gap-3 justify-between py-2.5 px-3 group rounded-lg",
                                )}>
                                <span className={classNames("font-bold leading-snug")}>{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </SimpleBar>
            )}
        </div>
    );
}

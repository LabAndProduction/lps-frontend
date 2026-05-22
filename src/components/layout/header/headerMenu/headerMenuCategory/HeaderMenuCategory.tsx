import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import { IHeaderMenuCategoryProps } from "@/types/props/types";
import classNames from "classnames";
import { useState } from "react";

export default function HeaderMenuCategory({ category, closeModal }: IHeaderMenuCategoryProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div>
            <div className="h-[var(--btn-height)] flex justify-between">
                <Link
                    prefetch={false}
                    href={`/categories/${category.id}-${category.slug}`}
                    onClick={() => closeModal()}
                    className="flex items-center grow h-full">
                    {category.name}
                </Link>

                {category.children && category.children.length > 0 && (
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        type="button"
                        className="flex-center size-[var(--btn-height)]">
                        <Icon name="chevron" className={classNames("size-3 text-primary", isOpen && "rotate-90")} />
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="pl-3">
                    {category.children.map((subCategory) => (
                        <Link
                            key={subCategory.id}
                            prefetch={false}
                            href={`/categories/${subCategory.id}-${subCategory.slug}`}
                            onClick={() => closeModal()}
                            className="h-[var(--btn-height)] flex items-center text-secondary">
                            {subCategory.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

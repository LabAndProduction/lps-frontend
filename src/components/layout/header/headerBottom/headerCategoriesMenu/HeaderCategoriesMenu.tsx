"use client";

import Icon from "@/components/ui/Icon";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import classNames from "classnames";
import { useState } from "react";
import HeaderMenuContent from "./headerCategoriesContent/HeaderCategoriesContent";
import { useSettings } from "@/context/settings.context";
import { ICategoriesTree } from "@/types/api/categories.types";
import { useText } from "@/context/text.context";

export default function HeaderCategoriesMenu({ categoriesTree }: { categoriesTree: ICategoriesTree }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { headerTopHeight, headerHeight } = useSettings();
    const { text } = useText();

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <>
            <button
                type="button"
                className={classNames(`flex-center gap-0.75 text-white py-2.5 px-4 h-11 rounded-main bg-main`)}
                onClick={() => setIsOpen((prev) => !prev)}>
                {text("Каталог")}
                <Icon name={isOpen ? "x" : "menu"} className="size-5!" />
            </button>

            <Dialog
                open={isOpen}
                onClose={() => closeMenu()}
                className={classNames(`fixed inset-0 lg:flex hidden w-screen items-start z-89`)}
                style={{ top: `${(headerHeight + headerTopHeight) / 16}rem` }}>
                <DialogBackdrop
                    className="fixed inset-0 bg-black/50"
                    style={{
                        top: `${(headerHeight + headerTopHeight) / 16}rem`,
                    }}
                />

                <DialogPanel
                    transition
                    className={classNames(
                        `relative bg-white shadow-lg z-1 w-full transition-300 data-closed:-translate-y-full flex flex-col justify-between`,
                    )}>
                    <HeaderMenuContent closeMenu={closeMenu} categoriesTree={categoriesTree} />
                </DialogPanel>
            </Dialog>
        </>
    );
}

import Icon from "@/components/ui/Icon";
import { useText } from "@/context/text.context";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import HeaderMenuCategory from "./headerMenuCategory/HeaderMenuCategory";
import { IHeaderMenuProps } from "@/types/props/types";
import Link from "next/link";
import classNames from "classnames";

export default function HeaderMenu({ categoriesTree, menu, isBtnWithText = true }: IHeaderMenuProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { text } = useText();

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    return (
        <>
            <button
                onClick={() => openModal()}
                type="button"
                className={classNames(
                    `relative flex-center flex-col gap-1 leading-120 @[25rem]:text-xs text-[0.625rem] text-primary`,
                    isBtnWithText ? "@[25rem]:px-2 px-[0.375rem]" : "size-8 flex-center",
                )}>
                <Icon name="menu" className={classNames(isBtnWithText ? "size-6" : "size-7")} />
                {isBtnWithText && <span>{text("Меню")}</span>}
            </button>

            <Dialog
                open={isOpen}
                onClose={closeModal}
                className="fixed inset-0 flex w-screen items-start justify-end z-[99]">
                <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

                <DialogPanel
                    transition
                    className="bg-white max-w-[21.25rem] w-full shadow-lg data-[closed]:translate-x-full z-[1] h-full transition-300 ease-out pt-4 flex flex-col justify-between overflow-y-auto">
                    <div className="flex justify-end pb-2 px-4">
                        <button type="button" className="flex-center size-8 text-primary" onClick={() => closeModal()}>
                            <Icon name="x" className="size-6" />
                        </button>
                    </div>

                    <div className="h-full overflow-y-auto flex flex-col gap-2">
                        <div className="px-4">
                            {categoriesTree.data.map((category) => (
                                <HeaderMenuCategory key={category.id} category={category} closeModal={closeModal} />
                            ))}
                        </div>

                        {menu && menu.data && (
                            <div className="px-4 bg-main-5 grow h-full pt-4 pb-6">
                                {menu.data.menuItems.map((menuItem) => (
                                    <Link
                                        key={menuItem.id}
                                        href={menuItem.url}
                                        onClick={() => closeModal()}
                                        className="h-[var(--btn-height)] flex items-center">
                                        {menuItem.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogPanel>
            </Dialog>
        </>
    );
}

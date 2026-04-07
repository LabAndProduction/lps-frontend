"use client";

import { ISideMenuWrapperProps } from "@/types/props/ui.types";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import classNames from "classnames";

export default function SideMenuWrapper({
    btn,
    content,
    isOpen,
    closeModal,
    className,
    position = "right",
}: ISideMenuWrapperProps) {
    return (
        <>
            {btn && btn}

            <Dialog
                open={isOpen}
                onClose={closeModal}
                className={classNames(
                    `fixed inset-0 flex w-screen items-start z-[99]`,
                    position == "right" ? "justify-end" : "justify-start",
                )}>
                <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

                <DialogPanel
                    transition
                    className={classNames(
                        `bg-white shadow-lg w-[25rem] z-[1] h-full transition-300 ease-out ${
                            position == "right" ? "data-[closed]:translate-x-full" : "data-[closed]:-translate-x-full"
                        } py-6 px-4 flex flex-col justify-between overflow-y-auto`,
                        className,
                    )}>
                    {content}
                </DialogPanel>
            </Dialog>
        </>
    );
}

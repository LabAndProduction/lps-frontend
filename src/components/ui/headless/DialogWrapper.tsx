"use client";

import { IDialogWrapperProps } from "@/types/props/ui.types";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Icon from "../Icon";
import classNames from "classnames";

export default function DialogWrapper({ btn, content, isOpen, closeModal, className = "" }: IDialogWrapperProps) {
    return (
        <>
            {btn}

            <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 flex-center w-screen z-[99]">
                <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

                <DialogPanel
                    transition
                    className={classNames(
                        `relative bg-white shadow-lg flex min-h-[16.25rem] max-h-[37.5rem] w-[30rem] z-[1] transition-300 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0 lg:!py-8 lg:!px-8 sm:!px-6 !py-6 !px-4 overflow-y-auto rounded-lg`,
                        className,
                    )}>
                    <button
                        onClick={() => closeModal()}
                        type="button"
                        className="absolute size-8 flex-center hover:opacity-60 lg:top-6 top-4 lg:right-6 right-4">
                        <Icon name="x" className="text-primary size-6" />
                    </button>
                    {content}
                </DialogPanel>
            </Dialog>
        </>
    );
}

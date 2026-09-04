"use client";

import Icon from "@/components/ui/Icon";
import AuthMenuContent from "./authMenuContent/AuthMenuContent";
import { useSettings } from "@/context/settings.context";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

export default function AuthMenu() {
    const { setIsAuthMenuOpen, isAuthMenuOpen } = useSettings();

    function closeModal() {
        setIsAuthMenuOpen(false);
    }

    return (
        <Dialog open={isAuthMenuOpen} onClose={closeModal} className="fixed inset-0 flex-center w-screen z-[99]">
            <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

            <DialogPanel
                transition
                className="relative bg-white shadow-lg flex min-h-[16.25rem] max-h-[37.5rem] w-[30rem] z-[1] transition-300 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0 lg:!py-8 lg:!px-8 sm:!px-6 !py-6 !px-4 overflow-y-auto rounded-lg">
                <button
                    onClick={() => closeModal()}
                    type="button"
                    className="absolute size-8 flex-center hover:opacity-60 lg:top-6 top-4 lg:right-6 right-4">
                    <Icon name="x" className="text-primary size-6" />
                </button>
                <AuthMenuContent closeModal={closeModal} />
            </DialogPanel>
        </Dialog>
    );
}

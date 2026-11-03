"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Icon from "@/components/ui/Icon";
import { useSettings } from "@/context/settings.context";
import { useText } from "@/context/text.context";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";

const DELAY_MS = 5000;
const SEEN_KEY = "price_prompt_seen";

// Prices are hidden from guests, so a few seconds after a guest opens the site this offers
// to sign in. Once closed it stays closed until the browser tab is closed.
export default function PricePrompt() {
    const { text } = useText();
    const isLoggedIn = useIsLoggedIn();
    const { isAuthMenuOpen, setIsAuthMenuOpen } = useSettings();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isLoggedIn) return;
        try {
            if (sessionStorage.getItem(SEEN_KEY)) return;
        } catch {}
        const timer = setTimeout(() => setIsOpen(true), DELAY_MS);
        return () => clearTimeout(timer);
    }, [isLoggedIn]);

    function closeModal() {
        setIsOpen(false);
        try {
            sessionStorage.setItem(SEEN_KEY, "1");
        } catch {}
    }

    function openLogin() {
        closeModal();
        setIsAuthMenuOpen(true);
    }

    return (
        <Dialog
            open={isOpen && !isLoggedIn && !isAuthMenuOpen}
            onClose={closeModal}
            className="fixed inset-0 flex-center w-screen z-[99]">
            <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

            <DialogPanel
                transition
                className="relative bg-white shadow-lg flex flex-col items-center gap-6 w-[30rem] max-w-[calc(100vw-2rem)] z-[1] transition-300 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0 lg:!p-8 sm:!px-6 !py-6 !px-4 rounded-lg text-center">
                <button
                    onClick={() => closeModal()}
                    type="button"
                    aria-label={text("Закрыть")}
                    className="absolute size-8 flex-center hover:opacity-60 lg:top-6 top-4 lg:right-6 right-4">
                    <Icon name="x" className="text-primary size-6" />
                </button>

                <div className="flex flex-col gap-3 pt-4">
                    <h4 className="text-xl font-bold">{text("Цены доступны после входа")}</h4>
                    <p className="text-secondary">
                        {text("Войдите или зарегистрируйтесь, чтобы видеть цены на товары.")}
                    </p>
                </div>

                <div className="@container w-full">
                    <div className="@[18.75rem]:grid flex flex-col grid-cols-2 gap-2 w-full">
                        <button type="button" className="main-transparent-btn w-full" onClick={() => closeModal()}>
                            {text("Закрыть")}
                        </button>
                        <button type="button" className="main-btn w-full" onClick={() => openLogin()}>
                            {text("Войти")}
                        </button>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
}

"use client";

import { useState } from "react";
import LogoutContent from "./LogoutContent";
import { useText } from "@/context/text.context";
import DialogWrapper from "../../headless/DialogWrapper";
import Icon from "../../Icon";

export default function LogoutModal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { text } = useText();
    function closeModal() {
        setIsOpen(false);
    }
    return (
        <DialogWrapper
            btn={
                <button
                    type="button"
                    className={
                        "group flex items-center gap-3 font-medium text-secondary2 hover:bg-white-70 w-full py-2 px-4 rounded-full"
                    }
                    onClick={() => setIsOpen(true)}>
                    <Icon name="exit" className="!size-8" />
                    {text("Выйти")}
                </button>
            }
            closeModal={closeModal}
            content={<LogoutContent closeModal={closeModal} />}
            isOpen={isOpen}
            // className="!w-[400px] !min-h-[230px]"
        />
    );
}

"use client";

import Icon from "@/components/ui/Icon";
import { useState } from "react";
import AuthMenuContent from "./authMenuContent/AuthMenuContent";
import { useText } from "@/context/text.context";
import { IAuthMenuProps } from "@/types/props/ui.types";
import DialogWrapper from "../../headless/DialogWrapper";

export default function AuthMenu({ defaultAuthTab, withLabel = false, btnLabel, isBtn }: IAuthMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { text } = useText();
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <>
            <DialogWrapper
                closeModal={closeModal}
                btn={
                    isBtn ? (
                        <button onClick={openModal} type="button" className="main-btn w-full">
                            {btnLabel && btnLabel.length > 0 ? btnLabel : text("Войти")}
                        </button>
                    ) : withLabel ? (
                        <button
                            onClick={openModal}
                            type="button"
                            className="flex-center @[25rem]:px-2 px-[0.375rem] flex-col gap-1 leading-120 @[25rem]:text-xs text-[0.625rem]">
                            <div className="relative">
                                <Icon name="user" className="size-6 group-hover:opacity-60 text-primary" />
                            </div>
                            {text("Профиль")}
                        </button>
                    ) : (
                        <button onClick={openModal} type="button" className="relative flex-center group group">
                            <Icon name="user" className="size-8 text-primary group-hover:text-main" />
                        </button>
                    )
                }
                isOpen={isOpen}
                content={<AuthMenuContent closeModal={closeModal} defaultAuthTab={defaultAuthTab} />}
            />
        </>
    );
}

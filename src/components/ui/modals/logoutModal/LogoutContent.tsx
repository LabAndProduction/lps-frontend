"use client";

import { logout } from "@/api/authApi";
import { useCookies } from "next-client-cookies";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { ILogoutContentProps } from "@/types/props/ui.types";
import { useText } from "@/context/text.context";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import OvalSpinner from "../../OvalSpinner";

export default function LogoutContent({ closeModal }: ILogoutContentProps) {
    const locale = useLocaleTS();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { refresh, replace } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { text } = useText();
    const handleLogout = () => {
        if (typeof token !== "undefined") {
            setIsLoading(true);
            logout({ token, clientLocale: locale })
                .then(() => {
                    replace("/");
                    refresh();
                    closeModal();
                })
                .finally(() => setIsLoading(false));
        }
    };
    return (
        <div className="@container w-full flex flex-col justify-center items-center gap-10 pt-8 pb-2 mx-auto">
            <h4 className="text-xl font-bold text-center">{text("Вы уверены что хотите выйти?")}</h4>
            <div className="@[18.75rem]:grid flex flex-col grid-cols-2 gap-2 @[18.75rem]:w-auto w-full">
                <button type="button" className="main-transparent-btn min-w-30 w-full" onClick={() => closeModal()}>
                    {text("Нет")}
                </button>
                <button type="button" className="main-btn min-w-30 w-full" onClick={() => handleLogout()}>
                    {isLoading ? <OvalSpinner size={24} color="var(--color-white)" /> : text("Да")}
                </button>
            </div>
        </div>
    );
}

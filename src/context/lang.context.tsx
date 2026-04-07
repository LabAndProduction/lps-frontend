"use client";

import { usePathname } from "@/i18n/routing";
import { ILangContextProps, ILangProviderProps } from "@/types/context/lang.context.types";
import { createContext, useContext, useEffect, useState } from "react";

const LangContext = createContext<ILangContextProps>({
    langUrl: null,
    setLangUrl: () => "",
});

export const LangProvider = ({ children }: ILangProviderProps) => {
    const [langUrl, setLangUrl] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        setLangUrl(null);
    }, [pathname, setLangUrl]);

    const values = { langUrl, setLangUrl };

    return <LangContext.Provider value={values}>{children}</LangContext.Provider>;
};

export const useLangUrl = () => useContext(LangContext);

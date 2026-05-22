"use client";

import { ISettingsContextProps, ISettingsProviderProps } from "@/types/context/settings.context.types";
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext<ISettingsContextProps>({
    headerHeight: 0,
    headerTopHeight: 0,

    setHeaderHeight: () => undefined,
    setHeaderTopHeight: () => undefined,
});

export const SettingsProvider = ({ children }: ISettingsProviderProps) => {
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [headerTopHeight, setHeaderTopHeight] = useState<number>(0);

    const values = {
        headerHeight,
        headerTopHeight,

        setHeaderHeight,
        setHeaderTopHeight,
    };

    return <SettingsContext.Provider value={values}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);

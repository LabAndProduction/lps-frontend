"use client";

import { createContext, useContext } from "react";
import { TextKey } from "@/types/api/text.types";
import { ITextContextProps, ITextProvideProps } from "@/types/context/text.context.types";

const TextContext = createContext<ITextContextProps>({
    text: () => "",
});

export const TextProvider = ({ children, texts }: ITextProvideProps) => {
    const text = (key: TextKey) => {
        return texts.data.find((el) => el.key == key)?.value || key;
    };

    const values = { text };

    return <TextContext.Provider value={values}>{children}</TextContext.Provider>;
};

export const useText = () => useContext(TextContext);

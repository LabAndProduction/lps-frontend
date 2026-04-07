import { ITexts, TextKey } from "../api/text.types";
import { ReactNode } from "react";

export interface ITextContextProps {
    text: (key: TextKey) => string;
}
export interface ITextProvideProps {
    children: ReactNode;
    texts: ITexts;
}

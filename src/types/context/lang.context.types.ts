import { ReactNode } from "react";
import { SetState } from "../types";

export interface ILangContextProps {
    langUrl: string | null;
    setLangUrl: SetState<string | null>;
}
export interface ILangProviderProps {
    children: ReactNode;
}

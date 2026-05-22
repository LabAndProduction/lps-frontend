import { ReactNode } from "react";
import { ICategoriesTree } from "../api/categories.types";
import { SetState } from "../types";

export interface ISettingsContextProps {
    headerHeight: number;
    headerTopHeight: number;

    setHeaderHeight: SetState<number>;
    setHeaderTopHeight: SetState<number>;
}
export interface ISettingsProviderProps {
    children: ReactNode;
}

import { ReactNode } from "react";

import { SetState } from "../types";
import { IProduct } from "../api/products.types";

export interface ISettingsContextProps {
    headerHeight: number;
    headerTopHeight: number;

    setHeaderHeight: SetState<number>;
    setHeaderTopHeight: SetState<number>;

    isBuyModalOpen: boolean;
    setIsBuyModalOpen: SetState<boolean>;

    buyModalProduct: IProduct | null;
    setBuyModalProduct: SetState<IProduct | null>;
}
export interface ISettingsProviderProps {
    children: ReactNode;
}

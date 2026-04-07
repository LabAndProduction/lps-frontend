import { IProduct } from "../api/products.types";
import { SetState } from "../types";
import { IWishlist } from "../api/wishlist.types";
import { ReactNode } from "react";

export interface IWishlistContextProps {
    wishlist: IProduct[];
    apiWishlist: IWishlist;
    addProduct: ({ product, setIsLoading }: IWishlistAdd) => void | null;
    removeProduct: ({ productId, setIsLoading }: IWishlistRemove) => void | null;
    checkExist: (productId: number) => boolean;
    toggleWishlist: ({ product, setIsLoading }: IWishlistToggle) => void | null;
    clearWishlist: ({ setIsLoading }: { setIsLoading: SetState<boolean> }) => void | null;
    isWishlistEmpty: boolean;
}

export interface IWishlistAdd {
    product: IProduct;
    setIsLoading: SetState<boolean>;
}
export interface IWishlistToggle {
    product: IProduct;
    setIsLoading: SetState<boolean>;
}
export interface IWishlistRemove {
    productId: number;
    setIsLoading: SetState<boolean>;
}

export interface IWishlistProviderParams {
    children: ReactNode;
}

import { ReactNode } from "react";
import { ICart } from "../api/cart.types";
import { ICreateOrderBody } from "../api/orders.types";
import { IProduct } from "../api/products.types";
import { SetState } from "../types";

export interface ICartContextProps {
    cart: {
        quantity: number;
        item: IProduct;
    }[];
    apiCart: ICart;
    addProduct: ({ product, quantity, setIsLoading }: ICartAddProduct) => void | null;
    updateProduct: ({ product, quantity, setIsLoading }: ICartUpdateProduct) => void | null;
    removeProduct: ({ productId, setIsLoading }: ICartRemoveProduct) => void | null;
    checkExist: (productId: number) => boolean;
    toggleCart: ({ product, quantity, setIsLoading }: IToggleCart) => void | null;
    clearCart: ({
        setIsLoading,
        isRedirect,
    }: {
        setIsLoading?: SetState<boolean>;
        isRedirect?: boolean;
    }) => void | null;
    localCartTotal: number;
    localCartQuantity: number;
    // checkout: ({ body }: ICartCheckout) => void | null;
    isCartEmpty: boolean;
    // the cart's products whoever owns it (a guest's local cart or the account's API cart)
    lines: ICartLine[];
    // sum of the products that have a price; ones priced on request are counted in onRequestCount
    pricedTotal: number;
    onRequestCount: number;
    isCartDrawerOpen: boolean;
    setIsCartDrawerOpen: SetState<boolean>;
}

export interface ICartLine {
    product: IProduct;
    quantity: number;
}

export interface ICartAddProduct {
    product: IProduct;
    quantity: number;
    setIsLoading?: SetState<boolean>;
}

export interface ICartRemoveProduct {
    productId: number;
    setIsLoading: SetState<boolean>;
}

export interface ICartUpdateProduct {
    product: IProduct;
    quantity: number;
    action: "plus" | "minus";
    setIsLoading: SetState<IQuantityChangerLoading>;
}
export interface IQuantityChangerLoading {
    minus: boolean;
    plus: boolean;
}

export interface IToggleCart {
    product: IProduct;
    quantity: number;
    setIsLoading: SetState<boolean>;
}

export interface ICartCheckout {
    body: ICreateOrderBody;
}

export interface ICartProvideProps {
    children: ReactNode;
}

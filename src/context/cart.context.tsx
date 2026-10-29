"use client";

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { useCookies } from "next-client-cookies";
import { cartAdd, cartClear, cartCreate, cartRemove, cartUpdate, getCart } from "@/api/cartApi";
import { createOrder } from "@/api/orderApi";
import { ICart } from "@/types/api/cart.types";
import { IProduct } from "@/types/api/products.types";
import {
    ICartAddProduct,
    ICartCheckout,
    ICartContextProps,
    ICartProvideProps,
    ICartRemoveProduct,
    ICartUpdateProduct,
    IToggleCart,
} from "@/types/context/cart.context.types";
import { SetState } from "@/types/types";
import { useText } from "./text.context";
import { useLocaleTS } from "@/hooks/useLocaleTS";

const CartContext = createContext<ICartContextProps>({
    cart: [],
    apiCart: {
        items: [],
        installment: [],
        subtotal: 0,
        subtotal_formatted: "",
        total: 0,
        total_formatted: "",
        quantity: 0,
    },
    addProduct: () => null,
    updateProduct: () => null,
    toggleCart: () => null,
    removeProduct: () => null,
    checkExist: () => false,
    clearCart: () => null,
    localCartTotal: 0,
    localCartQuantity: 0,
    // checkout: () => null,
    isCartEmpty: true,
    lines: [],
    pricedTotal: 0,
    onRequestCount: 0,
    isCartDrawerOpen: false,
    setIsCartDrawerOpen: () => undefined,
});

export const CartProvider = ({ children }: ICartProvideProps) => {
    const locale = useLocaleTS();
    const cartLocal = typeof window !== "undefined" && localStorage.getItem("cart");
    const parsedCart = cartLocal ? JSON.parse(cartLocal) : [];
    const { replace, refresh } = useRouter();
    const [cart, setCart] = useState<
        {
            quantity: number;
            item: IProduct;
        }[]
    >(parsedCart);
    const [apiCart, setApiCart] = useState<ICart>({
        items: [],
        installment: [],
        subtotal: 0,
        subtotal_formatted: "",
        total: 0,
        total_formatted: "",
        quantity: 0,
    });
    const cookies = useCookies();
    const token = cookies.get("token");
    const [localCartTotal, setLocalCartTotal] = useState<number>(0);
    const [localCartQuantity, setLocalCartQuantity] = useState<number>(0);
    const { text } = useText();
    const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

    // the guest's cart is read from the browser's storage, so until the page has hydrated the
    // lines stay empty - the same as on the server
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    useEffect(() => setIsHydrated(true), []);
    const lines = !isHydrated
        ? []
        : token
          ? apiCart.items.map((el) => ({ product: el.product, quantity: el.quantity }))
          : cart.map((el) => ({ product: el.item, quantity: el.quantity }));
    const pricedTotal = lines.reduce((sum, line) => sum + (line.product.current_price || 0) * line.quantity, 0);
    const onRequestCount = lines.filter((line) => !(line.product.current_price > 0)).length;

    useEffect(() => {
        if ((token && apiCart.quantity > 0) || (!token && localCartQuantity > 0)) {
            setIsCartEmpty(false);
        } else {
            setIsCartEmpty(true);
        }
    }, [token, apiCart, localCartQuantity]);

    useEffect(() => {
        const totalQuantity = cart
            .map((el) => {
                return el.quantity;
            })
            .reduce((acc, next) => acc + next, 0);
        setLocalCartQuantity(totalQuantity);
    }, [cart]);

    useEffect(() => {
        const totalSum = cart.map((el) => el.item.current_price * el.quantity).reduce((acc, next) => acc + next, 0);
        setLocalCartTotal(totalSum);
    }, [cart]);

    useEffect(() => {
        if (token) {
            getCart({ token, clientLocale: locale }).then((data) => {
                if (typeof data !== "string") {
                    if (data.quantity === 0 && cart.length > 0) {
                        const products = cart.map((el) => {
                            return { id: el.item.id, quantity: el.quantity };
                        });
                        cartCreate({
                            token,
                            body: { products: products },
                            clientLocale: locale,
                        }).then((updatedData) => {
                            setCart([]);
                            if (typeof updatedData !== "string") setApiCart(updatedData);
                            refresh();
                        });
                    } else if (data.quantity > 0 && cart.length === 0) {
                        setApiCart(data);
                        setCart([]);
                    } else if (data.quantity > 0 && cart.length > 0) {
                        const localProducts = cart.map((el) => {
                            return { id: el.item.id, quantity: el.quantity };
                        });
                        const apiProducts = data.items.map((el) => {
                            return { id: el.id, quantity: el.quantity };
                        });
                        const products = [...localProducts, ...apiProducts];

                        cartCreate({
                            token,
                            body: { products: products },
                            clientLocale: locale,
                        }).then((updatedData) => {
                            setCart([]);
                            if (typeof updatedData !== "string") setApiCart(updatedData);
                            refresh();
                        });
                    }
                }
            });
        }
    }, [token]);

    const addProduct = ({ product, quantity, setIsLoading }: ICartAddProduct): void => {
        if (!token) {
            setCart([...cart, { item: product, quantity: quantity }]);
            setIsCartDrawerOpen(true);
        }

        if (token) {
            if (setIsLoading) setIsLoading(true);
            cartAdd({
                token,
                body: { product_id: product.id, quantity },
                clientLocale: locale,
            })
                .then((data) => {
                    if (typeof data !== "string") {
                        setApiCart(data);
                        setIsCartDrawerOpen(true);
                    }
                })
                .finally(() => {
                    if (setIsLoading) setIsLoading(false);
                });
        }
    };

    const removeProduct = ({ productId, setIsLoading }: ICartRemoveProduct) => {
        if (!token) setCart(cart.filter((el) => productId !== el.item.id));
        if (token) {
            setIsLoading(true);
            cartRemove({ token, body: { product_id: productId }, clientLocale: locale })
                .then((data) => typeof data !== "string" && setApiCart(data))
                .finally(() => setIsLoading(false));
        }
    };

    const updateProduct = ({ product, quantity, setIsLoading, action }: ICartUpdateProduct): void => {
        if (!token) {
            const updatedCart = cart.map((el) => {
                if (el.item.id == product.id) {
                    return { item: product, quantity };
                }
                return el;
            });
            setCart(updatedCart);
        }
        if (token) {
            if (action == "minus") {
                setIsLoading({ minus: true, plus: false });
            } else if (action == "plus") {
                setIsLoading({ minus: false, plus: true });
            }

            if (product.in_stock < quantity) {
                toast.error(text("Нет такого количества товаров в наличии"));
                setIsLoading({ minus: false, plus: false });
                return;
            }
            cartUpdate({
                token,
                body: { product_id: product.id, quantity },
                clientLocale: locale,
            })
                .then((data) => typeof data !== "string" && setApiCart(data))
                .finally(() => setIsLoading({ minus: false, plus: false }));
        }
    };

    const toggleCart = ({ product, quantity, setIsLoading }: IToggleCart) => {
        if (!token) {
            if (cart.length > 0) {
                const searchProduct = cart.filter((el) => {
                    return el.item.id == product.id;
                });
                if (searchProduct.length === 1) removeProduct({ productId: product.id, setIsLoading });
                else addProduct({ product, quantity, setIsLoading });
            } else addProduct({ product, quantity, setIsLoading });
        } else {
            const filteredApiCart = apiCart.items.filter((el) => {
                return el.id === product.id;
            });
            if (filteredApiCart.length === 1) removeProduct({ productId: product.id, setIsLoading });
            else addProduct({ product, quantity, setIsLoading });
        }
    };

    const checkExist = (productId: number): boolean => {
        if (!token) {
            const filteredArr = cart.filter((el) => {
                return el.item.id == productId;
            });
            return filteredArr.length === 1;
        } else {
            const filteredApiCart = apiCart.items.filter((el) => {
                return el.id === productId;
            });

            return filteredApiCart.length === 1;
        }
    };

    const clearCart = ({
        setIsLoading,
        isRedirect = true,
    }: {
        setIsLoading?: SetState<boolean>;
        isRedirect?: boolean;
    }) => {
        if (!token) {
            setCart([]);
            if (isRedirect) replace("/");
        } else if (token) {
            if (setIsLoading) setIsLoading(true);
            cartClear({ token, clientLocale: locale })
                .then((data) => {
                    setApiCart({
                        installment: [],
                        subtotal: 0,
                        subtotal_formatted: "",
                        total: 0,
                        total_formatted: "",
                        items: [],
                        quantity: 0,
                    });
                    if (isRedirect) {
                        replace("/");
                        toast.success(data.message);
                    }
                })
                .finally(() => {
                    if (setIsLoading) setIsLoading(false);
                });
        }
    };

    // const checkout = ({ body }: ICartCheckout) => {
    //     const { address_id, name, payment_method_id, phone_number, shipping_method_id, message } = body;
    //     if (token) {
    //         createOrder({
    //             token,
    //             body: {
    //                 address_id,
    //                 name,
    //                 payment_method_id,
    //                 phone_number,
    //                 shipping_method_id,
    //                 message,
    //             },
    //         }).then(() => {
    //             getCart({ token, clientLocale: locale }).then((data) => {
    //                 if (typeof data !== "string") {
    //                     setApiCart(data);
    //                 }
    //             });
    //             replace(`/dashboard/orders`);
    //             toast.success(text("Заказ оформлен успешно"));
    //         });
    //     }
    // };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const values = {
        cart,
        apiCart,
        addProduct,
        removeProduct,
        checkExist,
        toggleCart,
        clearCart,
        updateProduct,
        localCartTotal,
        localCartQuantity,
        // checkout,
        isCartEmpty,
        lines,
        pricedTotal,
        onRequestCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
    };

    return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

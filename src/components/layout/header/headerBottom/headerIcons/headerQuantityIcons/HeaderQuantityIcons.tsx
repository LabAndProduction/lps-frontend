"use client";

import Icon from "@/components/ui/Icon";
import { useCart } from "@/context/cart.context";
import { useCompare } from "@/context/compare.context";
import { useWishlist } from "@/context/wishlist.context";
import { Link } from "@/i18n/routing";
import { SpritesName } from "@/types/types";
import classNames from "classnames";
import { useCookies } from "next-client-cookies";
import { useEffect, useState } from "react";

export default function HeaderQuantityIcons() {
    const cookies = useCookies();
    const token = cookies.get("token");
    const { apiWishlist, wishlist } = useWishlist();
    const { apiCompareList, compareList } = useCompare();
    const { apiCart, localCartQuantity } = useCart();
    const [wishlistQuantity, setWishlistQuantity] = useState<number>(0);
    const [compareQuantity, setCompareQuantity] = useState<number>(0);
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    const icons: {
        id: number;
        href: string;
        icon: SpritesName;
        quantity?: number;
    }[] = [
        {
            id: 1,
            href: "/compare",
            icon: "compare",
            quantity: compareQuantity,
        },
        {
            id: 2,
            href: "/wishlist",
            icon: "heart",
            quantity: wishlistQuantity,
        },
        {
            id: 3,
            href: "/cart",
            icon: "cart",
            quantity: cartQuantity,
        },
    ];

    useEffect(() => {
        if (token) {
            setWishlistQuantity(apiWishlist.quantity);
        } else {
            setWishlistQuantity(wishlist.length);
        }
    }, [wishlist, apiWishlist, token]);

    useEffect(() => {
        if (token) {
            setCartQuantity(apiCart.quantity);
        } else {
            setCartQuantity(localCartQuantity);
        }
    }, [apiCart, localCartQuantity, token]);

    useEffect(() => {
        if (token) {
            setCompareQuantity(apiCompareList.quantity);
        } else {
            setCompareQuantity(compareList.length);
        }
    }, [compareList, apiCompareList, token]);

    return (
        <>
            {icons.map((item) => (
                <Link key={item.id} href={item.href} className={`relative flex-center group group`}>
                    <Icon
                        name={item.icon}
                        className={classNames(
                            `size-8 text-primary group-hover:text-main`,
                            item.icon == "heart" && "fill-none",
                        )}
                    />
                    {typeof item.quantity != "undefined" ? (
                        <span className="absolute flex-center size-[1rem] text-[0.625rem] text-white leading-100 -right-[0.4375rem] -top-[0.1875rem] bg-main rounded-full shadow-[0_0_0.25rem_var(--black-10)]">
                            {item.quantity}
                        </span>
                    ) : (
                        <></>
                    )}
                </Link>
            ))}
        </>
    );
}

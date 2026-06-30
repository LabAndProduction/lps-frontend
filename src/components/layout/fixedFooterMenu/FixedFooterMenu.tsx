"use client";

import Icon from "@/components/ui/Icon";
import { useCart } from "@/context/cart.context";
import { useCompare } from "@/context/compare.context";
import { useText } from "@/context/text.context";
import { useWishlist } from "@/context/wishlist.context";
import { IFooterMenuIcon } from "@/types/types";
import { useCookies } from "next-client-cookies";
import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import classNames from "classnames";
import AuthMenu from "@/components/ui/modals/authMenu/AuthMenu";
import { IFixedFooterMenuProps } from "@/types/props/types";
import HeaderMenu from "../header/headerMenu/HeaderMenu";

export default function FixedFooterMenu({ categoriesTree, menu }: IFixedFooterMenuProps) {
    const { apiWishlist, wishlist } = useWishlist();
    const { apiCart, localCartQuantity } = useCart();
    // const { apiCompareList, compareList } = useCompare();
    const cookies = useCookies();
    const token = cookies.get("token");
    const [wishlistQuantity, setWishlistQuantity] = useState<number>(0);
    // const [compareQuantity, setCompareQuantity] = useState<number>(0);
    const [cartQuantity, setCartQuantity] = useState<number>(0);
    const { text } = useText();

    const icons: IFooterMenuIcon[] = [
        {
            id: 0,
            href: "/wishlist",
            icon: "heart",
            quantity: wishlistQuantity,
            label: text("Избранное"),
        },
        {
            id: 1,
            href: "/cart",
            icon: "cart",
            quantity: cartQuantity,
            label: text("Корзина"),
        },
        // {
        //     id: 2,
        //     href: "/compare",
        //     icon: "compare",
        //     label: text("Сравнение"),
        //     quantity: compareQuantity,
        // },
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

    // useEffect(() => {
    //     if (token) {
    //         setCompareQuantity(apiCompareList.quantity);
    //     } else {
    //         setCompareQuantity(compareList.length);
    //     }
    // }, [compareList, apiCompareList, token]);

    return (
        <div className="lg:hidden flex-center fixed bottom-0 left-0 w-full bg-white shadow-[0_0_0.5rem_var(--black-10)] z-[79] h-[3.5rem] p-1 @container">
            <div className="grid grid-cols-4 w-full">
                <HeaderMenu categoriesTree={categoriesTree} menu={menu} />

                {token ? (
                    <Link
                        href={"/dashboard/profile"}
                        className="flex-center @[400px]:px-2 px-[0.375rem] flex-col gap-1 leading-120 @[400px]:text-xs text-[0.625rem]">
                        <div className="relative">
                            <Icon name={"user"} className={classNames(`size-6 group-hover:opacity-60 text-primary`)} />
                        </div>
                        {text("Профиль")}
                    </Link>
                ) : (
                    <AuthMenu withLabel={true} />
                )}

                {icons.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="flex-center @[25rem]:px-2 px-[0.375rem] flex-col gap-1 leading-120 @[25rem]:text-xs text-[0.625rem]">
                        <div className="relative">
                            <Icon
                                name={item.icon}
                                className={classNames(
                                    `size-6 group-hover:opacity-60 text-primary`,
                                    item.icon == "heart" && "fill-none",
                                )}
                            />
                            {typeof item.quantity != "undefined" ? (
                                <span className="absolute flex-center size-[0.875rem] text-[0.5625rem] text-white leading-100 right-[-0.625rem] top-[-0.25rem] bg-main rounded-full shadow-[0_0_0.25rem_var(--black-10)]">
                                    {item.quantity}
                                </span>
                            ) : (
                                <></>
                            )}
                        </div>
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

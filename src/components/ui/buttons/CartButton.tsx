"use client";

import classNames from "classnames";
import { useCart } from "@/context/cart.context";
import { useState, useEffect } from "react";
import { useText } from "@/context/text.context";
import { ICartButtonProps } from "@/types/props/ui.types";
import OvalSpinner from "../OvalSpinner";
import Icon from "../Icon";

export default function CartButton({
    className,
    product,
    quantity = 1,
    type = "text",
    isGray = false,
}: ICartButtonProps) {
    const { checkExist: checkCartExist, toggleCart } = useCart();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { text } = useText();
    const { id, in_stock, stock_info_code } = product;
    const [isExist, setIsExist] = useState<boolean>(false);

    useEffect(() => {
        setIsExist(checkCartExist(id));
    }, [checkCartExist]);
    return (
        <button
            title={text("Добавить в корзину")}
            disabled={isLoading || (stock_info_code == "0" && in_stock === 0)}
            onClick={() => toggleCart({ product, quantity, setIsLoading })}
            className={classNames(
                "flex-center size-[var(--btn-height)] rounded-main",
                `${
                    type === "icon"
                        ? `disabled:pointer-events-none disabled:bg-secondary disabled:text-white ${isGray ? "bg-gray hover:bg-gray4 text-primary" : "bg-main hover:bg-main-dark text-white"}`
                        : isGray
                          ? "gray-btn !rounded-btn"
                          : "main-btn rounded-round-btn"
                }`,
                className,
            )}
            type="button">
            {isLoading ? (
                <OvalSpinner size={16} color={isGray ? "var(--color-main)" : "var(--color-white)"} />
            ) : type == "text" ? (
                in_stock === 0 && stock_info_code == "0" ? (
                    <span>{text("нет в наличии")}</span>
                ) : isExist ? (
                    <span>{text("В корзине")}</span>
                ) : (
                    <span>{text("в корзину")}</span>
                )
            ) : isExist ? (
                <Icon name="cart-check" className={`size-7`} />
            ) : (
                <Icon name="cart" className={`size-7`} />
            )}
        </button>
    );
}

"use client";

import { useWishlist } from "@/context/wishlist.context";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import classNames from "classnames";
import OvalSpinner from "../OvalSpinner";
import { IWishlistButtonProps } from "@/types/props/ui.types";
import { useText } from "@/context/text.context";

export default function WishlistButton({ product, className = "", type = "icon" }: IWishlistButtonProps) {
    const { checkExist: checkWishlistExist, toggleWishlist } = useWishlist();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExist, setIsExist] = useState<boolean>(false);
    const { text } = useText();
    useEffect(() => {
        setIsExist(checkWishlistExist(product.id));
    }, [checkWishlistExist]);

    return (
        <button
            title={text("Добавить в избранное")}
            disabled={isLoading}
            onClick={() => toggleWishlist({ product, setIsLoading })}
            type="button"
            className={classNames(
                "group/wishlist flex-center bg-white rounded-full gap-2 disabled:pointer-events-none",
                type == "icon" ? "size-8" : "text-secondary",
                className,
            )}>
            <span className="size-7 flex-center">
                {isLoading ? (
                    <OvalSpinner size={20} color={isExist ? "var(--color-red)" : "var(--color-secondary)"} />
                ) : (
                    <Icon
                        name="heart"
                        className={classNames(
                            `group-hover/wishlist:text-red size-7`,
                            isExist ? "text-red fill-red" : "fill-none text-secondary",
                        )}
                    />
                )}
            </span>
            {type == "text" && (
                <span
                    className={classNames("group-hover/wishlist:text-red leading-120 text-sm", isExist && "text-red")}>
                    {isExist ? text("В избранном") : text("В избранное")}
                </span>
            )}
        </button>
    );
}

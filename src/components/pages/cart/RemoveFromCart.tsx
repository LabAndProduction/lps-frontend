"use client";

import { useState } from "react";
import { useCart } from "@/context/cart.context";
import OvalSpinner from "@/components/ui/OvalSpinner";
import Icon from "@/components/ui/Icon";
import { IRemoveFromCartProps } from "@/types/props/pages.types";

export default function RemoveFromCart({ product }: IRemoveFromCartProps) {
    const { removeProduct: removeFromCart } = useCart();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleRemove = () => {
        removeFromCart({ productId: product.id, setIsLoading });
    };
    return (
        <button className="group size-7 flex-center" type="button" onClick={handleRemove}>
            {isLoading ? (
                <OvalSpinner size={20} />
            ) : (
                <Icon name="trash" className="text-primary group-hover:text-red size-4" />
            )}
        </button>
    );
}

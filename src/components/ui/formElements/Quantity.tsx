"use client";

import { IQuantityProps } from "@/types/props/ui.types";
import Icon from "../Icon";
import OvalSpinner from "../OvalSpinner";
import useQuantity from "@/hooks/useQuantity";

export default function Quantity({ productQuantity, product, setQuantity }: IQuantityProps) {
    const { handleMinus, handlePlus, isLoading } = useQuantity({
        productQuantity,
        setQuantity,
        product,
    });

    const commonBtnClass =
        "size-8 flex-center bg-gray rounded-main hover:opacity-80 disabled:pointer-events-none disabled:text-secondary3";
    const commonIconClass = "size-4";

    return (
        <div className="flex items-center gap-3 w-max">
            <button
                type="button"
                disabled={isLoading.minus || isLoading.plus || productQuantity === 1 || productQuantity === 0}
                className={commonBtnClass}
                onClick={handleMinus}>
                {isLoading.minus ? <OvalSpinner size={16} /> : <Icon name="minus" className={commonIconClass} />}
            </button>
            <span className="text-sm font-medium select-none">{productQuantity}</span>
            <button
                type="button"
                disabled={
                    isLoading.minus || isLoading.plus || productQuantity === 0 || productQuantity === product.in_stock
                }
                className={commonBtnClass}
                onClick={handlePlus}>
                {isLoading.plus ? <OvalSpinner size={16} /> : <Icon name="plus" className={commonIconClass} />}
            </button>
        </div>
    );
}

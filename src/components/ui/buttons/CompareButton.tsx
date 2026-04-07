"use client";

import { useEffect, useState } from "react";
import { useCompare } from "@/context/compare.context";
import OvalSpinner from "../OvalSpinner";
import Icon from "../Icon";
import classNames from "classnames";
import { useText } from "@/context/text.context";
import { ICompareButtonProps } from "@/types/props/ui.types";

export default function CompareButton({ product, className, type = "icon" }: ICompareButtonProps) {
    const { checkExist, toggleCompare } = useCompare();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExist, setIsExist] = useState<boolean>(false);
    const { text } = useText();
    useEffect(() => {
        setIsExist(checkExist(product.id));
    }, [checkExist]);
    return (
        <button
            title={text("Сравнить")}
            disabled={isLoading}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare({ product, setIsLoading });
            }}
            className={classNames(
                `group/compare flex-center bg-white rounded-full text-secondary disabled:pointer-events-none gap-2`,
                type == "icon" ? "size-8" : "",
                className,
            )}
            type="button">
            <span className="size-7 flex-center">
                {isLoading ? (
                    <OvalSpinner size={20} />
                ) : isExist ? (
                    <Icon name="check" className={`group-hover/compare:text-main size-6`} />
                ) : (
                    <Icon name="compare" className={`group-hover/compare:text-main size-7`} />
                )}
            </span>
            {type == "text" && (
                <span className="group-hover/compare:text-main leading-120 text-sm">
                    {isExist ? text("В сравнении") : text("Сравнить")}
                </span>
            )}
        </button>
    );
}

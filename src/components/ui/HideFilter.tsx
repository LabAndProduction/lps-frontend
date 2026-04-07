"use client";

import { IHideFilterProps } from "@/types/props/ui.types";
import Icon from "./Icon";
import classNames from "classnames";

export default function HideFilter({ setIsOpen, isOpen, title }: IHideFilterProps) {
    return (
        <button
            className={classNames(`group flex justify-between items-center w-full text-start`, isOpen && "mb-5")}
            type="button"
            onClick={() => setIsOpen(!isOpen)}>
            <span className="font-medium group-hover:text-main leading-150">{title}</span>
            <Icon
                name="chevron"
                className={classNames(
                    `text-primary group-hover:text-main !size-5`,
                    isOpen ? "-rotate-90" : "rotate-90",
                )}
            />
        </button>
    );
}

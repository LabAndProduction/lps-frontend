"use client";

import Icon from "../Icon";
import classNames from "classnames";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ISelectWrapperProps } from "@/types/props/ui.types";

export default function SelectWrapper<Option, T extends { id: number; title: string; option: Option }>({
    selected,
    setSelected,
    items,
    label,
    btnClassName,
    btnIconClassName,
    btnTextClassName,
}: ISelectWrapperProps<T>) {
    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <MenuButton
                        as="button"
                        type="button"
                        className={classNames("group flex text-sm items-center gap-2", btnClassName)}>
                        <span className={classNames("group-hover:text-main", btnTextClassName)}>
                            {label ? label : selected.title}
                        </span>
                        <Icon
                            name="chevron"
                            className={classNames(
                                `group-hover:text-main size-4 ${open ? "-rotate-90" : "rotate-90"}`,
                                btnIconClassName,
                            )}
                        />
                    </MenuButton>
                    <MenuItems
                        transition
                        modal={false}
                        className="absolute top-[calc(100%+0.25rem)] right-0 bg-white flex flex-col transition-300 min-w-[10rem] xl:!max-h-[21.875rem] md:!max-h-[18.75rem] !max-h-[15.625rem] overflow-y-auto shadow-[0_0_0.625rem_-0.3125rem_rgba(0,0,0,0.5)] ease-out translate-y-0 data-[closed]:translate-y-[0.625rem] data-[closed]:opacity-0 z-[89] rounded-main">
                        {items.map((item) => (
                            <MenuItem as="div" key={item.id} className="text-center">
                                <button
                                    onClick={() => setSelected(item)}
                                    className={classNames(
                                        `py-2 px-4 hover:bg-main-5 text-sm w-full`,
                                        selected.id == item.id && "bg-main-5 text-main pointer-events-none",
                                    )}
                                    type="button">
                                    {item.title}
                                </button>
                            </MenuItem>
                        ))}
                    </MenuItems>
                </>
            )}
        </Menu>
    );
}

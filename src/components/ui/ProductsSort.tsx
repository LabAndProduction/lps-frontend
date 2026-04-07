"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";
import Icon from "./Icon";
import { useText } from "@/context/text.context";
import { ISortBtn } from "@/types/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "@/i18n/routing";

export default function ProductsSort() {
    const { text } = useText();
    const options: ISortBtn[] = [
        {
            id: 0,
            option: "created_at",
            title: text("По умолчанию"),
            direction: "desc",
        },
        {
            id: 1,
            option: "price",
            title: text("Сначала дороже"),
            direction: "desc",
        },
        {
            id: 2,
            option: "price",
            title: text("Сначала дешевле"),
            direction: "asc",
        },
        {
            id: 3,
            option: "views",
            title: text("Популярные"),
            direction: "desc",
        },
        {
            id: 4,
            option: "created_at",
            title: text("Новинки"),
            direction: "desc",
        },
        {
            id: 5,
            option: "discount",
            title: text("По скидке"),
            direction: "desc",
        },
    ];
    const [selected, setSelected] = useState<ISortBtn | null>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        if (selected) {
            const params = new URLSearchParams(searchParams);
            params.set("direction", selected.direction);
            params.set("sort", selected.option);
            replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [selected, pathname, searchParams]);

    useEffect(() => {
        const dirParam = searchParams.get("direction");
        const sortParam = searchParams.get("sort");

        if (sortParam && dirParam) {
            const finded = options.find((el) => {
                if (el.option == sortParam && dirParam == el.direction) {
                    return el;
                }
            });
            if (finded) setSelected(finded);
        }
    }, []);

    return (
        <Menu as="div" className="relative">
            {({ open }) => (
                <>
                    <MenuButton as="button" type="button" className={"group flex text-sm items-center gap-2"}>
                        <span className={"group-hover:text-main"}>
                            {selected ? selected.title : text("Сортировать по")}
                        </span>
                        <Icon
                            name="chevron"
                            className={`group-hover:text-main size-4 ${open ? "-rotate-90" : "rotate-90"}`}
                        />
                    </MenuButton>
                    <MenuItems
                        transition
                        modal={false}
                        className="absolute top-[calc(100%+0.25rem)] right-0 bg-white flex flex-col transition-300 min-w-[10rem] xl:!max-h-[21.875rem] md:!max-h-[18.75rem] !max-h-[15.625rem] overflow-y-auto shadow-[0_0_0.625rem_-0.3125rem_rgba(0,0,0,0.5)] ease-out translate-y-0 data-[closed]:translate-y-[0.625rem] data-[closed]:opacity-0 z-[89] rounded-main">
                        {options.map((item) => (
                            <MenuItem as="div" key={item.id} className="text-center">
                                <button
                                    onClick={() => setSelected(item)}
                                    className={classNames(
                                        `py-2 px-4 hover:bg-main-5 text-sm w-full`,
                                        selected && selected.id == item.id && "bg-main-5 text-main pointer-events-none",
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

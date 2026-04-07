"use client";

import { IFiltersMenuProps } from "@/types/props/ui.types";
import SideMenuWrapper from "../headless/SideMenuWrapper";
import Icon from "../Icon";
import { useText } from "@/context/text.context";

export default function FiltersMenu({ filters, closeModal, openModal, isOpen }: IFiltersMenuProps) {
    const { text } = useText();
    return (
        <SideMenuWrapper
            closeModal={closeModal}
            isOpen={isOpen}
            position="left"
            btn={
                <button type="button" className={"main-btn"} onClick={openModal}>
                    <Icon name="filter" className="size-4 fill-primary" />

                    {text("Фильтры")}
                </button>
            }
            content={
                <div className="flex flex-col gap-4 justify-between">
                    <div className="flex items-center justify-end">
                        <button onClick={closeModal} className="py-2 hover:opacity-60">
                            <Icon name="x" className="text-primary size-6" />
                        </button>
                    </div>
                    {filters}
                </div>
            }
            className="!w-[18.75rem]"
        />
    );
}

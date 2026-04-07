"use client";

import { useState } from "react";
import SearchFilters from "../searchFilters/SearchFilters";
import { ISearchFiltersMenuProps } from "@/types/props/pages.types";
import FiltersMenu from "@/components/ui/filters/FiltersMenu";

export default function SearchFiltersMenu({ price, keyword }: ISearchFiltersMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }
    return (
        <FiltersMenu
            closeModal={closeModal}
            isOpen={isOpen}
            openModal={openModal}
            filters={<SearchFilters keyword={keyword} price={price} closeModal={closeModal} />}
        />
    );
}

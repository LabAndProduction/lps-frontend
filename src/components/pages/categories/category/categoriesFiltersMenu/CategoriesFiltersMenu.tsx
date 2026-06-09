"use client";

import { useState } from "react";
import { ICategoriesFiltersMenuProps } from "@/types/props/pages.types";
import CategoriesFilters from "../categoriesFilters/CategoriesFilters";
import FiltersMenu from "@/components/ui/filters/FiltersMenu";

export default function CategoriesFiltersMenu({ attributes, price, brands }: ICategoriesFiltersMenuProps) {
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
            filters={
                <CategoriesFilters attributes={attributes} price={price} closeModal={closeModal} brands={brands} />
            }
        />
    );
}

"use client";

import ClearFilters from "@/components/ui/filters/clearFilters/ClearFilters";
import FilterAttributes from "@/components/ui/filters/filterAttributes/FilterAttributes";
import FilterPrice from "@/components/ui/filters/filterPrice/FilterPrice";
import { ICategoriesFiltersProps } from "@/types/props/pages.types";
import { useState } from "react";

export default function CategoriesFilters({ attributes, price, closeModal }: ICategoriesFiltersProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-6 h-fit">
            {attributes && attributes.data && attributes.data.length > 0 && (
                <FilterAttributes
                    attributes={attributes}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {price && price.max > 0 && (
                <FilterPrice
                    price={price}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {((price && price.max > 0) || (attributes && attributes.data && attributes.data.length > 0)) && (
                <ClearFilters
                    price={price}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

"use client";

import ClearFilters from "@/components/ui/filters/clearFilters/ClearFilters";
import FilterAttributes from "@/components/ui/filters/filterAttributes/FilterAttributes";
import FilterBrands from "@/components/ui/filters/filterBrands/FilterBrands";
import FilterPrice from "@/components/ui/filters/filterPrice/FilterPrice";
import { ICategoriesFiltersProps } from "@/types/props/pages.types";
import { useState } from "react";
import { useSettings } from "@/context/settings.context";
import classNames from "classnames";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";

export default function CategoriesFilters({ attributes, price, closeModal, brands, isSticky }: ICategoriesFiltersProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const { headerTopHeight, headerHeight } = useSettings();
    // the price slider shows the cheapest and the dearest price, so guests do not get it
    const hasPrice = useIsLoggedIn() && price && price.max > 0;
    return (
        <div
            className={classNames("flex flex-col gap-6 h-fit", isSticky && "sticky")}
            style={isSticky ? { top: `${headerTopHeight + headerHeight + 20}px` } : undefined}>
            {brands && brands.data && brands.data.length > 0 && (
                <FilterBrands
                    brands={brands.data}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {attributes && attributes.data && attributes.data.length > 0 && (
                <FilterAttributes
                    attributes={attributes}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {hasPrice && (
                <FilterPrice
                    price={price}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {(hasPrice ||
                (attributes && attributes.data && attributes.data.length > 0) ||
                (brands && brands.data && brands.data.length > 0)) && (
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

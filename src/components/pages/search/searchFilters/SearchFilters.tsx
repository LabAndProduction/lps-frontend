"use client";

import ClearFilters from "@/components/ui/filters/clearFilters/ClearFilters";
import FilterPrice from "@/components/ui/filters/filterPrice/FilterPrice";
import { ISearchFiltersProps } from "@/types/props/pages.types";
import { useState } from "react";
import SearchForm from "../searchForm/SearchForm";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";

export default function SearchFilters({ price, closeModal, keyword }: ISearchFiltersProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    // the price slider shows the cheapest and the dearest price, so guests do not get it
    const hasPrice = useIsLoggedIn() && price && price.max > 0;
    return (
        <div className="flex flex-col gap-6 h-fit">
            <div className="lg:block hidden w-full">
                <SearchForm keyword={keyword} isSearchPage={true} />
            </div>
            {hasPrice && (
                <FilterPrice
                    price={price}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {hasPrice && (
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

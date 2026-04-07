"use client";

import ClearFilters from "@/components/ui/filters/clearFilters/ClearFilters";
import FilterPrice from "@/components/ui/filters/filterPrice/FilterPrice";
import { ISearchFiltersProps } from "@/types/props/pages.types";
import { useState } from "react";
import SearchForm from "../searchForm/SearchForm";

export default function SearchFilters({ price, closeModal, keyword }: ISearchFiltersProps) {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-6 h-fit">
            <div className="lg:block hidden w-full">
                <SearchForm keyword={keyword} isSearchPage={true} />
            </div>
            {price && price.max > 0 && (
                <FilterPrice
                    price={price}
                    isDisabled={isDisabled}
                    setIsDisabled={setIsDisabled}
                    closeModal={closeModal}
                />
            )}
            {price && price.max > 0 && (
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

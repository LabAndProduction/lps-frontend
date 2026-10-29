"use client";

import { useEffect, useState } from "react";
import BrandCheckbox from "./brandCheckbox/BrandCheckbox";
import { useText } from "@/context/text.context";
import { IFilterBrandsProps } from "@/types/props/pages.types";
import FilterWrapper from "../FilterWrapper";
import { SingleBrand } from "@/types/api/brand.types";
import Icon from "../../Icon";

export default function FilterBrands({ brands, isDisabled, setIsDisabled }: IFilterBrandsProps) {
    const { text } = useText();
    const [isOpen, setIsOpen] = useState<boolean>(true);
    // const [searchBrand, setSearchBrand] = useState<string>("");
    // const [filteredBrands, setFilteredBrands] = useState<SingleBrand[]>([]);

    // useEffect(() => {
    //     setFilteredBrands(brands);
    // }, []);
    // useEffect(() => {
    //     setFilteredBrands(brands.filter((brand) => brand.name.toLowerCase().includes(searchBrand.toLowerCase())));
    // }, [searchBrand]);

    return (
        <FilterWrapper
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={text("Бренды")}
            contentWrapperClassname="overflow-y-none"
            content={
                <>
                    {/* <label className="relative">
                        <Icon name="search" className="text-secondary3 absolute-center-y !size-6 left-[0.625rem]" />

                        <input
                            className="!bg-white !border-gray3 !pl-10"
                            type="text"
                            value={searchBrand}
                            onChange={(e) => setSearchBrand(e.target.value)}
                            placeholder={text("Поиск")}
                        />
                    </label> */}

                    <div className="flex flex-col gap-3">
                        {brands.map((brand) => {
                            return (
                                <BrandCheckbox
                                    key={brand.id}
                                    brand={brand}
                                    isDisabled={isDisabled}
                                    setIsDisabled={setIsDisabled}
                                />
                            );
                        })}
                    </div>
                </>
            }
        />
    );
}

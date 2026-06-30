"use client";

import Icon from "@/components/ui/Icon";
import SideMenuWrapper from "@/components/ui/headless/SideMenuWrapper";
import { useText } from "@/context/text.context";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import BrandCategories from "../brandCategories/BrandCategories";
import { IBrandCategories, ISingleBrand } from "@/types/api/brand.types";

export interface IBrandCategoriesMenuProps {
    brandCategoriesTree: IBrandCategories;
    brand: ISingleBrand;
}

export default function BrandCategoriesMenu({ brand, brandCategoriesTree }: IBrandCategoriesMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { text } = useText();
    function closeModal(): void {
        setIsOpen(false);
    }

    function openModal(): void {
        setIsOpen(true);
    }
    return (
        <SideMenuWrapper
            closeModal={closeModal}
            isOpen={isOpen}
            position="left"
            btn={
                <button type="button" className={"main-btn"} onClick={openModal}>
                    <Icon name="menu" className="size-4 fill-primary" />

                    {text("Категории")}
                </button>
            }
            content={
                <div className="flex flex-col gap-4 justify-between h-screen">
                    <div className="flex items-center justify-end">
                        <button onClick={closeModal} className="py-2 hover:opacity-60">
                            <Icon name="x" className="text-primary size-6" />
                        </button>
                    </div>

                    <div className="flex flex-col grow">
                        <SimpleBar className="max-h-[calc(100vh-4.125rem)]">
                            <div className="flex flex-col w-full">
                                <BrandCategories brand={brand} brandCategoriesTree={brandCategoriesTree} />
                            </div>
                        </SimpleBar>
                    </div>
                </div>
            }
            className="!w-[18.75rem]"
        />
    );
}

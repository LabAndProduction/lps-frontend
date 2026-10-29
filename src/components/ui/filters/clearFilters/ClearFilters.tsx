"use client";

import { useText } from "@/context/text.context";
import { usePathname, useRouter } from "@/i18n/routing";
import { IClearFiltersProps } from "@/types/props/pages.types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ClearFilters({ price, isDisabled, setIsDisabled, closeModal }: IClearFiltersProps) {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { text } = useText();

    useEffect(() => {
        const prices = params.get("price");
        const brands = params.get("brands");
        const attributes = params.get("attributes");

        if ((!prices || prices == `${price.min}-${price.max}`) && !brands && !attributes) {
            setIsDisabled(false);
        }
    }, [params]);

    return (
        <button
            type="button"
            onClick={() => {
                const params = new URLSearchParams(searchParams);
                setIsDisabled(true);
                params.delete("brands");
                params.delete("attributes");
                params.delete("price");
                params.delete("page");
                replace(`${pathname}?${params.toString()}`, { scroll: false });
                if (closeModal) closeModal();
            }}
            disabled={isDisabled}
            className="main-btn w-full">
            {text("Сбросить фильтры")}
        </button>
    );
}

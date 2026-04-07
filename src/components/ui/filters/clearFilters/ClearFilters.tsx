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
        const page = params.get("page");

        if (prices == `${price.min}-${price.max}` && !brands && !attributes && page == "1") {
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
                params.set("price", `${price.min}-${price.max}`);
                params.set("page", "1");
                replace(`${pathname}?${params.toString()}`, { scroll: false });
                if (closeModal) closeModal();
            }}
            disabled={isDisabled}
            className="main-btn w-full">
            {text("Сбросить фильтры")}
        </button>
    );
}

"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { useSearchParams } from "next/navigation";
import { IFilterPriceProps } from "@/types/props/pages.types";
import { useText } from "@/context/text.context";
import { usePathname, useRouter } from "@/i18n/routing";
import FilterWrapper from "../FilterWrapper";
export default function FilterPrice({ price, isDisabled, setIsDisabled, step = 500 }: IFilterPriceProps) {
    const MIN = price.min;
    const MAX = price.max;
    const [value, setValue] = useState<number[]>([MIN, MAX]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const priceParams = searchParams.get("price");
    const params = new URLSearchParams(searchParams);
    const { text } = useText();

    useEffect(() => {
        const prices = params.get("price")?.split("-").map(Number);
        if (prices) {
            if (prices[0] == value[0] && prices[1] == value[1]) {
                setIsDisabled(false);
            }
        }
    }, [value]);

    useEffect(() => {
        params.set("price", `${value[0]}-${value[1]}`);
        params.set("page", `1`);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [value]);

    useEffect(() => {
        if (priceParams) {
            const priceParamsArr = priceParams.split("-").map(Number);
            setValue([priceParamsArr[0], priceParamsArr[1]]);
        }
    }, [priceParams]);

    return (
        <FilterWrapper
            title={text("Цена")}
            content={
                <>
                    <Slider
                        range
                        allowCross={false}
                        className="price-slider"
                        step={step}
                        value={value}
                        min={MIN}
                        max={MAX}
                        onChangeComplete={() => {
                            setIsDisabled(true);
                        }}
                        onChange={(value) => {
                            if (Array.isArray(value)) {
                                setValue(value);
                            }
                        }}
                        disabled={isDisabled}
                    />
                    <div className="flex items-center justify-between gap-4 leading-120 text-sm lowercase">
                        <p>
                            <span className="text-secondary">{text("От")}: </span>
                            <span className="font-medium">{new Intl.NumberFormat("fr-FR").format(value[0])}</span>
                        </p>
                        <p>
                            <span className="text-secondary">{text("До")}: </span>
                            <span className="font-medium">{new Intl.NumberFormat("fr-FR").format(value[1])}</span>
                        </p>
                    </div>
                </>
            }
            contentWrapperClassname={"gap-5 max-h-none overflow-y-visible"}
        />
    );
}

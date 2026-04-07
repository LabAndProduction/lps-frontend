"use client";

import NextImage from "@/components/ui/NextImage";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { IProductInstallmentProps } from "@/types/props/pages.types";
import Slider from "rc-slider";
import React, { useMemo, useState } from "react";

function ProductInstallment({ product }: IProductInstallmentProps) {
    const { h1_name, body, seo_title, meta_description, meta_keywords, book, ...productItem } = product.data;
    const [currentMonth, setCurrentMonth] = useState<number>(product.data.installment_prices[0].prices[0].duration);
    const { text } = useText();
    const { addProduct } = useCart();

    const { months, marks } = useMemo(() => {
        const allMonths = Array.from(
            new Set(product.data.installment_prices.flatMap((instl) => instl.prices.map((price) => price.duration))),
        ).sort((a, b) => a - b);

        const newMarks: Record<string | number, string | number> = {};
        for (let i = 0; i < allMonths.length; i++) {
            newMarks[i] = allMonths[i];
        }

        return { months: allMonths, marks: newMarks };
    }, [product.data.installment_prices]);

    return (
        <div className="custom-block-with-padding flex-col gap-6">
            <h4 className="text-lg font-semibold">{text("Купить в рассрочку")}</h4>

            <div className="px-2">
                <Slider
                    className="installment-slider"
                    min={0}
                    max={months.length - 1}
                    marks={marks}
                    step={null}
                    defaultValue={0}
                    onChangeComplete={(value) => typeof value === "number" && setCurrentMonth(months[value])}
                />
            </div>
            <div className="flex flex-col gap-3">
                {product.data.installment_prices.map((instl) => {
                    return instl.prices.map((price) => {
                        if (price.duration == currentMonth) {
                            return (
                                <Link
                                    href={`/checkout?installment=${instl.code}&duration=${currentMonth}`}
                                    key={instl.id}
                                    onClick={() => addProduct({ product: productItem, quantity: 1 })}
                                    className="flex items-center justify-between p-4 rounded-btn border border-gray bg-gray hover:bg-transparent hover:border-main leading-120 text-sm font-medium text-right">
                                    <NextImage
                                        src={instl.image}
                                        alt={instl.name}
                                        width={100}
                                        height={24}
                                        className="w-auto h-6 object-contain max-w-[6.25rem]"
                                    />
                                    {text("от {number} сум").replace(
                                        "{number}",
                                        new Intl.NumberFormat("fr-FR").format(price.price_per_month),
                                    )}
                                </Link>
                            );
                        }
                    });
                })}
            </div>
        </div>
    );
}

export default React.memo(ProductInstallment);

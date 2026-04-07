"use client";

import Empty from "@/components/ui/Empty";
import OvalSpinner from "@/components/ui/OvalSpinner";
import { useCompare } from "@/context/compare.context";
import { useText } from "@/context/text.context";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import CompareProducts from "./compareProducts/CompareProducts";

export default function Compare() {
    const { compareList, apiCompareList, clearCompare, isCompareEmpty } = useCompare();
    const cookies = useCookies();
    const { text } = useText();
    const token = cookies.get("token");
    const apiProducts = apiCompareList.items.map((el) => el.product);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <SectionWrapper className="mt-10">
            {isCompareEmpty ? (
                <Empty
                    img="/images/compare-empty.png"
                    title={text("Сравнение товаров")}
                    text={text(
                        "Вы еще не добавили товары для сравнения. Выберите понравившиеся модели и сравните их характеристики, чтобы сделать лучший выбор!",
                    )}
                    linkText={text("Перейти в каталог")}
                    link="/"
                />
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                        <p className="text-sm sm:ml-4">
                            {token ? apiCompareList.quantity : compareList.length} {text("шт.")}
                        </p>

                        <button
                            disabled={isLoading}
                            className="main-btn rounded-round-btn"
                            type="button"
                            onClick={() => clearCompare({ setIsLoading })}>
                            {isLoading && <OvalSpinner size={16} color="var(--color-white)" />}
                            {text("Очистить сравнение")}
                        </button>
                    </div>
                    {token ? <CompareProducts products={apiProducts} /> : <CompareProducts products={compareList} />}
                </div>
            )}
        </SectionWrapper>
    );
}

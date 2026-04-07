"use client";

import Icon from "@/components/ui/Icon";
import { useText } from "@/context/text.context";
import { ISearchFormProps } from "@/types/props/pages.types";
import classNames from "classnames";
import { useRouter } from "@/i18n/routing";
import { FormEventHandler, useEffect, useState } from "react";

export default function SearchForm({ keyword = "", isSearchPage = false }: ISearchFormProps) {
    const { push } = useRouter();
    const params = new URLSearchParams("");
    const [value, setValue] = useState<string>(keyword);
    const { text } = useText();
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        params.set("keyword", value);

        push(`/search?${params.toString()}`);
        setValue("");
    };
    useEffect(() => {
        setValue(keyword);
    }, [keyword]);
    return (
        <form onSubmit={handleSubmit} className="relative flex items-center grow">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                minLength={3}
                maxLength={255}
                required
                type="search"
                placeholder={text("Поиск товаров")}
                className={classNames(
                    `pl-4 !pr-[calc(var(--btn-height)+0.5rem)]`,
                    isSearchPage
                        ? "!bg-white !min-h-[var(--input-height)] !h-[var(--input-height)]"
                        : "lg:!min-h-[var(--input-height)] lg:!h-[var(--input-height)] !min-h-10 !h-10",
                )}
            />
            <button
                type="submit"
                className="absolute-center-y right-0 group flex-center bg-main hover:bg-main-90 h-full rounded-e-main w-[var(--btn-height)] text-white">
                <Icon name="search" className="lg:size-6 size-5" />
            </button>
        </form>
    );
}

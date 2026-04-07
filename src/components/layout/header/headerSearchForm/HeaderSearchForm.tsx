"use client";

import Icon from "@/components/ui/Icon";
import { useText } from "@/context/text.context";
import classNames from "classnames";
import { useRouter } from "@/i18n/routing";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import SearchResults from "./HeaderSearchResults";
import { getProducts } from "@/api/productsApi";
import { IProducts } from "@/types/api/products.types";
import lodash from "lodash";
import { IHeaderSearchFormProps } from "@/types/props/types";
import { useLocaleTS } from "@/hooks/useLocaleTS";

export default function HeaderSearchForm({ className, keyword = "", setIsSearchOpen }: IHeaderSearchFormProps) {
    const { push } = useRouter();
    const params = new URLSearchParams("");
    const [value, setValue] = useState<string>(keyword);
    const { text } = useText();
    const [isResultsShow, setIsResultsShow] = useState<boolean>(false);
    const [products, setProducts] = useState<IProducts>();
    const ref = useRef<HTMLDivElement>(null);
    const locale = useLocaleTS();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        params.set("keyword", value);

        push(`/search?${params.toString()}`, { scroll: false });
        setValue("");
        setIsResultsShow(false);
        setIsSearchOpen(false);
    };

    const fetchResults = async (searchKeyword: string) => {
        const result = await getProducts({ search: searchKeyword, clientLocale: locale });
        setProducts(result);
    };

    const debouncedFetchResults = lodash.debounce((searchKeyword: string) => {
        fetchResults(searchKeyword);
        setIsResultsShow(true);
    }, 500);

    useEffect(() => {
        setValue(keyword);
    }, [keyword]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsResultsShow(false);
                setIsSearchOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);

    return (
        <div
            ref={ref}
            className={classNames(
                "grow sm:relative absolute left-0 top-full sm:w-auto w-full bg-white sm:px-0 sm:py-0 py-2 px-4 flex items-center",
                className,
            )}>
            <form onSubmit={handleSubmit} className="relative flex items-center grow">
                <input
                    value={value}
                    onChange={(e) => {
                        if (e.target.value.length < 3) setIsResultsShow(false);
                        else if (e.target.value.length > 2) {
                            debouncedFetchResults(e.target.value);
                        }

                        setValue(e.target.value);
                    }}
                    minLength={3}
                    maxLength={255}
                    required
                    type="search"
                    placeholder={text("Поиск товаров")}
                    className="pl-4 lg:!min-h-[var(--input-height)] lg:!h-[var(--input-height)] !min-h-10 !h-10 !pr-[4.5rem]"
                    autoFocus
                />
                <button
                    type="submit"
                    className="absolute-center-y right-0 group flex-center bg-main hover:bg-main-90 h-full rounded-e-main lg:w-[4.5rem] w-[3.5rem] text-white">
                    <Icon name="search" className="lg:size-6 size-5" />
                </button>
            </form>

            <SearchResults
                setValue={setValue}
                value={value}
                products={products}
                setIsOpen={setIsResultsShow}
                isOpen={isResultsShow}
            />
        </div>
    );
}

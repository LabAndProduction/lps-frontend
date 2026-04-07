"use client";

import { ListboxButton, ListboxOption, ListboxOptions, Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ILangOption } from "@/types/types";
import Icon from "@/components/ui/Icon";
import { Link, usePathname } from "@/i18n/routing";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { useLangUrl } from "@/context/lang.context";
import NextImage from "@/components/ui/NextImage";
import classNames from "classnames";

const langs: ILangOption[] = [
    { id: 0, locale: "ru", label: "Ru", src: "/images/ru.svg" },
    { id: 1, locale: "uz", label: "Uz", src: "/images/uz.svg" },
];

export default function LangSelect() {
    const pathname = usePathname();
    const { langUrl } = useLangUrl();

    const locale = useLocaleTS();
    const [selectedLang, setSelectedLang] = useState<ILangOption>(
        langs.find((item) => item.locale == locale) ?? langs[0],
    );
    return (
        <Listbox
            value={selectedLang}
            onChange={(value) => setSelectedLang(value)}
            as="div"
            className="relative z-92 h-full">
            <ListboxButton
                type="button"
                className="relative group flex-center gap-1 hover:text-main min-h-6 font-medium leading-100 h-full lg:px-0 px-2">
                {({ open }) => (
                    <>
                        <span className="border-2 border-gray2 rounded-full flex-center">
                            <NextImage
                                width={18}
                                height={18}
                                alt={selectedLang.label}
                                src={selectedLang.src}
                                className="lg:size-[1.125rem] lg:min-w-[1.125rem] lg:min-h-[1.125rem] min-w-6 size-6 min-h-6"
                            />
                        </span>
                        <span className="lg:inline-block hidden">{selectedLang.label}</span>
                        <Icon
                            name="chevron"
                            className={classNames(`lg:inline-block hidden size-4`, open ? "-rotate-90" : "rotate-90")}
                        />
                    </>
                )}
            </ListboxButton>
            <ListboxOptions
                modal={false}
                as="div"
                transition
                className="absolute-center-x bg-white shadow-[0_0_0.25rem_var(--color-black-50)] rounded-main lg:top-[calc(100%+0.625rem)] top-[calc(100%-0.625rem)] origin-top transition-300 data-[closed]:translate-y-[0.625rem] data-[closed]:opacity-0 overflow-hidden w-auto">
                {langs.map((locale) => (
                    <ListboxOption key={locale.id} value={locale} as={Fragment}>
                        {({ selected }) =>
                            !selected ? (
                                <Link
                                    href={langUrl ? langUrl : pathname}
                                    locale={locale.locale}
                                    className={
                                        "flex gap-1 items-center py-2 px-3 font-medium text-primary hover:text-main w-full"
                                    }>
                                    <span className="flex-center border border-gray2 rounded-full">
                                        <NextImage
                                            src={locale.src}
                                            alt={locale.label}
                                            width={18}
                                            height={18}
                                            className="min-w-[1.125rem] min-h-[1.125rem] w-[1.125rem] h-[1.125rem]"
                                        />
                                    </span>
                                    {locale.label}
                                </Link>
                            ) : (
                                <p
                                    className={
                                        "flex gap-1 items-center py-2 px-3 font-medium text-white bg-main w-full"
                                    }>
                                    <span className="flex-center rounded-full">
                                        <NextImage src={locale.src} alt={locale.label} width={18} height={18} />
                                    </span>
                                    {locale.label}
                                </p>
                            )
                        }
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    );
}

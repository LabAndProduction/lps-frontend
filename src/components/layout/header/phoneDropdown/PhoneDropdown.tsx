"use client";

import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import { IPhoneDropdownProps } from "@/types/props/types";
import { formatPhoneWithSpaces } from "@/utils/formatPhoneWithSpaces";
import { Listbox, ListboxButton, ListboxOptions } from "@headlessui/react";

export default function PhoneDropdown({ settings }: IPhoneDropdownProps) {
    const phones = [
        { id: 0, phone: settings.phone },
        { id: 1, phone: settings.phone2 },
    ];

    return (
        <Listbox as="div" className="relative z-92 h-full">
            <ListboxButton
                type="button"
                className="flex-center gap-1 font-semibold text-sm text-main h-full px-1 min-w-10">
                <Icon name="phone" className="size-6" />
            </ListboxButton>
            <ListboxOptions
                modal={false}
                as="div"
                transition
                className="absolute right-0 bg-white shadow-[0_0_0.25rem_var(--color-black-50)] rounded-main lg:top-[calc(100%+0.625rem)] top-[calc(100%-0.625rem)] origin-top transition-300 data-[closed]:translate-y-[0.625rem] data-[closed]:opacity-0 overflow-hidden w-auto">
                {phones.map((item) => (
                    <Link
                        key={item.id}
                        href={`tel:${item.phone}`}
                        className="group flex items-center font-semibold text-sm hover:text-main py-2 px-2 whitespace-nowrap">
                        {item.phone}
                    </Link>
                ))}
            </ListboxOptions>
        </Listbox>
    );
}

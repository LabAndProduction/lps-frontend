"use client";

import { ISectionHeadingProps } from "@/types/props/ui.types";
import { Link } from "@/i18n/routing";
import Icon from "./Icon";
import { useText } from "@/context/text.context";

export default function SectionHeading({ label, link }: ISectionHeadingProps) {
    const { text } = useText();
    return (
        <div className="flex sm:flex-row flex-col sm:items-center justify-between sm:gap-5 gap-3 flex-wrap mb-5">
            <h3 className="font-semibold leading-140 lg:text-2xl text-xl">{label}</h3>
            {link && link.length > 0 && (
                <Link href={link} className="flex items-center gap-2 sm:text-base text-sm text-main hover:opacity-60">
                    {text("Смотреть все")} <Icon name="arrow" />
                </Link>
            )}
        </div>
    );
}

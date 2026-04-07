"use client";

import { useLangUrl } from "@/context/lang.context";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { ILocalizationComponentProps } from "@/types/props/types";
import { useEffect } from "react";

export default function LocalizationComponent({ startPath, localization, id }: ILocalizationComponentProps) {
    const { setLangUrl } = useLangUrl();
    const locale = useLocaleTS();

    useEffect(() => {
        setTimeout(() => {
            if (locale === "ru") {
                setLangUrl(`${startPath}/${id}-${localization["uz"].slug}`);
            } else if (locale === "uz") {
                setLangUrl(`${startPath}/${id}-${localization["ru"].slug}`);
            }
        }, 0);
    }, [localization, startPath, id, locale]);

    return <></>;
}

import { Locale } from "@/types/api/api.types";
import { useLocale } from "next-intl";

export function useLocaleTS() {
    const locale = useLocale() as Locale;

    return locale;
}

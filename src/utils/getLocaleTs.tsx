import { Locale } from "@/types/api/api.types";
import { getLocale } from "next-intl/server";

export async function getLocaleTs() {
    const locale = (await getLocale()) as Locale;
    return locale;
}

import { headers } from "next/headers";
import { routing } from "@/i18n/routing";

export async function getFullUrl(pathname: string = "", withLocale: boolean = true): Promise<string> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = "https";
    const locale = headersList.get("x-next-intl-locale") || "ru";

    const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

    // Russian, the default language, has no prefix in its addresses (localePrefix "as-needed")
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    const fullPath = withLocale && prefix && !cleanPath.startsWith(prefix) ? `${prefix}${cleanPath}` : cleanPath;

    return `${protocol}://${host}${fullPath}`;
}

import { headers } from "next/headers";

export async function getFullUrl(pathname: string = "", withLocale: boolean = true): Promise<string> {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = "https";
    const locale = headersList.get("x-next-intl-locale") || "ru";

    const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

    const fullPath = withLocale && !cleanPath.startsWith(`/${locale}`) ? `/${locale}${cleanPath}` : cleanPath;

    return `${protocol}://${host}${fullPath}`;
}

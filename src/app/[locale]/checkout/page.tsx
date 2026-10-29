import { seoMeta } from "@webnumseoagent/next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";
import Checkout from "@/components/pages/checkout/Checkout";
import { getFullUrl } from "@/utils/getFullUrl";
import { getCookies } from "next-client-cookies/server";
import { getProfile } from "@/api/profileApi";
import { NOINDEX } from "@/lib/seo";
import { getSettings } from "@/api/settingsApi";

export default async function CheckoutPage() {
    const { text } = await getTexts();
    const cookies = await getCookies();
    const profile = await getProfile({ token: cookies.get("token") });
    const settings = await getSettings().catch(() => null);

    return (
        <>
            <PageHeader
                title={text("Оформление заказа")}
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Оформление заказа"),
                }}
            />
            <Checkout profile={typeof profile !== "string" ? profile : null} storePhone={settings?.phone} />
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/checkout");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return seoMeta({
        route: "/checkout",
        locale: (await params).locale,

        fallback: {
            robots: NOINDEX,
            title: text("Оформление заказа"),
            description: text("Оформление заказа"),
            keywords: text("Оформление заказа"),
            openGraph: {
                title: text("Оформление заказа"),
                url: pageUrl,
                images: [
                    {
                        url: imageUrl,
                    },
                ],
                type: "website",
            },
        }
    });
}

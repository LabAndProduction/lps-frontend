import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import DashboardWrapper from "@/components/pages/dashboard/DashboardWrapper";
import Orders from "@/components/pages/orders/Orders";
import { getCookies } from "next-client-cookies/server";
import { getOrders } from "@/api/orderApi";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function ProfilePage() {
    const { text } = await getTexts();
    const cookies = await getCookies();
    const orders = await getOrders({ token: cookies.get("token") });

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Мои заказы"),
                }}
                title={text("Мои заказы")}
            />

            <DashboardWrapper activeRoute="orders">
                {typeof orders !== "string" && <Orders orders={orders} />}
            </DashboardWrapper>
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/dashboard/orders");
    const imageUrl = await getFullUrl("/images/lg.svg", false);
    return {
        title: text("Мои заказы"),
        description: text("Мои заказы"),
        keywords: text("Мои заказы"),
        openGraph: {
            title: text("Мои заказы"),
            url: pageUrl,
            images: [
                {
                    url: imageUrl,
                },
            ],
            type: "website",
        },
    };
}

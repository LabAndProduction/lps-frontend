import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import Order from "@/components/pages/order/Order";
import PageHeader from "@/components/ui/PageHeader";
import { getOrder } from "@/api/orderApi";
import { getCookies } from "next-client-cookies/server";
import { IPageParamsWithId } from "@/types/pageParams.types";
import { NOINDEX } from "@/lib/seo";

export default async function HomePage({ params }: IPageParamsWithId) {
    const { id } = await params;

    const orderId = Number(id);
    const cookies = await getCookies();
    const token = cookies.get("token");

    const { text } = await getTexts();
    const order = await getOrder({ orderId, token });

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Ваш заказ"),
                }}
                title={text("Ваш заказ")}
            />

            {typeof order !== "string" && <Order order={order} />}
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    return {
        robots: NOINDEX,
        title: text("Ваш заказ"),
        description: text("Ваш заказ"),
        keywords: text("Ваш заказ"),
    };
}

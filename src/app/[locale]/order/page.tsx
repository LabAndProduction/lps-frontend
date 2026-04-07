import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import Order from "@/components/pages/order/Order";
import PageHeader from "@/components/ui/PageHeader";

export default async function HomePage() {
    const { text } = await getTexts();
    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Ваш заказ"),
                }}
                title={text("Ваш заказ")}
            />

            <Order />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    return {
        title: text("Ваш заказ"),
        description: text("Ваш заказ"),
        keywords: text("Ваш заказ"),
    };
}

import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";
import Checkout from "@/components/pages/checkout/Checkout";
import { getPartners } from "@/api/partnersApi";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function CheckoutPage() {
    const { text } = await getTexts();
    const installments = await getPartners();
    return (
        <>
            <PageHeader
                title={text("Оформление заказа")}
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Оформление заказа"),
                }}
            />

            <Checkout apiInstallments={installments} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();

    const pageUrl = await getFullUrl("/checkout");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return {
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
    };
}

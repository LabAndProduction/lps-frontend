import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import DashboardWrapper from "@/components/pages/dashboard/DashboardWrapper";
import Profile from "@/components/pages/profile/Profile";
import { getFullUrl } from "@/utils/getFullUrl";
import { NOINDEX } from "@/lib/seo";

export default async function ProfilePage() {
    const { text } = await getTexts();

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: text("Профиль"),
                }}
                title={text("Профиль")}
            />

            <DashboardWrapper activeRoute="profile">
                <Profile />
            </DashboardWrapper>
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const { text } = await getTexts();
    const pageUrl = await getFullUrl("/dashboard/profile");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return {
        robots: NOINDEX,
        title: text("Профиль"),
        description: text("Профиль"),
        keywords: text("Профиль"),
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

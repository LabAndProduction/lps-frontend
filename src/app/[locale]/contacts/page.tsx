import { seoMeta } from "@webnumseoagent/next";
import { Metadata } from "next";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { getPage } from "@/api/pagesApi";
import Contacts from "@/components/pages/contacts/Contacts";
import { getSettings } from "@/api/settingsApi";
import { getFullUrl } from "@/utils/getFullUrl";
import { pageAlternates, samePaths } from "@/lib/seo";
import { getLocaleTs } from "@/utils/getLocaleTs";

export default async function ContactsPage() {
    const { text } = await getTexts();
    const page = await getPage({ pageId: 3 });
    const settings = await getSettings();

    return (
        <>
            <PageHeader
                breadcrumbs={{
                    links: [{ href: "/", title: text("Главная") }],
                    current: page.data.seo_title,
                }}
                title={page.data.seo_title}
            />

            <Contacts settings={settings} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocaleTs();
    const page = await getPage({ pageId: 2 });

    const pageUrl = await getFullUrl("/contacts");
    const imageUrl = await getFullUrl("/images/logo.png", false);
    return seoMeta({
        route: "/contacts",
        locale,

        fallback: {
            alternates: pageAlternates(locale, samePaths("/contacts")),
            title: page.data.seo_title,
            description: page.data.meta_description,
            keywords: page.data.meta_keywords,
            openGraph: {
                title: page.data.seo_title,
                description: page.data.meta_description,
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

import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "rc-slider/assets/index.css";
import "simplebar-react/dist/simplebar.min.css";
import "./globals.scss";
import { notFound } from "next/navigation";
import ScrollUp from "@/components/ui/buttons/ScrollUp";
import Scripts from "@/components/layout/Scripts";
import { IRootLayoutProps } from "@/types/props/types";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import classNames from "classnames";
import FixedFooterMenu from "@/components/layout/fixedFooterMenu/FixedFooterMenu";
import { getCategoriesTree } from "@/api/categoriesApi";
import { getMenu } from "@/api/menusApi";
import Head from "./head";
import Providers from "@/components/layout/Providers";
import { NextIntlClientProvider } from "next-intl";
import { CookiesProvider } from "next-client-cookies/server";
import { ContextProviders } from "@/components/layout/ContextProviders";
import { Locale } from "@/types/api/api.types";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    preload: true,
    display: "swap",
    fallback: ["sans-serif"],
});

export default async function RootLayout({ children, params }: Readonly<IRootLayoutProps>) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }
    const messages = await getMessages();
    const categoriesTree = await getCategoriesTree();
    const headerMenu = await getMenu({ menuId: 2 });

    return (
        <html className={classNames(montserrat.className)} lang={locale}>
            <Head />
            <body>
                <Toaster position="top-right" />
                <NextIntlClientProvider messages={messages}>
                    <CookiesProvider>
                        <ContextProviders>
                            <Providers>
                                <div className="min-h-screen h-full flex flex-col justify-between">
                                    <Header categoriesTree={categoriesTree} menu={headerMenu} />

                                    <main className="grow h-full transition-all duration-500">{children}</main>

                                    <Footer />

                                    <ScrollUp />

                                    <FixedFooterMenu categoriesTree={categoriesTree} menu={headerMenu} />
                                </div>
                            </Providers>
                        </ContextProviders>
                    </CookiesProvider>
                </NextIntlClientProvider>
                <Scripts />
            </body>
        </html>
    );
}

import { getMenu } from "@/api/menusApi";
import FooterMenu from "./footerMenu/FooterMenu";
import { getSettings } from "@/api/settingsApi";
import { getTexts } from "@/api/textsApi";
import Link from "next/link";
import SiteLogo from "@/components/ui/SiteLogo";
import Socials from "@/components/ui/Socials";
import RatingCard from "@/components/reviews/RatingCard";
import { phoneFormatter } from "@/utils/phoneFormatter";
import { getLocaleTs } from "@/utils/getLocaleTs";
import { BLOG_PATH, blogLabel } from "@/lib/blogLink";

export default async function FooterTop() {
    const menu5 = await getMenu({ menuId: 5 });
    const menu3 = await getMenu({ menuId: 3 });
    const menu4 = await getMenu({ menuId: 4 });
    const settings = await getSettings();
    const { text } = await getTexts();
    const locale = await getLocaleTs();

    return (
        <div className="bg-white py-[3.75rem]">
            <div className="container lg:grid lg:grid-cols-[23.875rem_minmax(0,1fr)] flex flex-col sm:items-start items-center gap-x-[6.25rem] gap-y-10">
                <div className="flex flex-col sm:items-start items-center gap-6 lg:w-full">
                    <Link href={"/"} className="py-3">
                        <SiteLogo locale={locale} size="footer" />
                    </Link>

                    <p className="max-w-[23.875rem] text-sm leading-150 text-secondary2 sm:text-start text-center">
                        {locale == "en"
                            ? "Laboratory and analytical equipment, glassware, reagents and consumables from leading manufacturers. Office in Tashkent, delivery across Uzbekistan."
                            : "Лабораторное и аналитическое оборудование, посуда, реактивы и расходные материалы ведущих производителей. Офис в Ташкенте, доставка по Узбекистану."}
                    </p>

                    <Link href={`${locale == "ru" ? "" : `/${locale}`}/contacts`} className="main-btn">
                        {locale == "en" ? "Send a request" : "Оставить заявку"}
                    </Link>
                </div>

                {/* <div className="grid grid-cols-5 gap-4"> */}
                <div className="flex sm:flex-row flex-col sm:items-start items-center flex-wrap justify-between gap-x-12 gap-y-6 w-full">
                    <FooterMenu menu={menu3} extraLinks={[{ href: BLOG_PATH, title: blogLabel(locale) }]} />
                    <FooterMenu menu={menu4} />
                    <FooterMenu menu={menu5} />
                    <div className="footer-menu sm:w-[17.5rem]">
                        <h4 className="title">{text("Контакты")}</h4>
                        <ul className="list">
                            <li>
                                <Link href={`tel:${settings.phone}`} className="link">
                                    {phoneFormatter(settings.phone)}
                                </Link>
                            </li>
                            <li>
                                <Link href={`tel:${settings.phone2}`} className="link">
                                    {phoneFormatter(settings.phone2)}
                                </Link>
                            </li>
                            {/* <li>
                                <Link href={`mailto:${settings.email}`} className="link">
                                    {text("E-mail")}: {settings.email}
                                </Link>
                            </li> */}
                        </ul>
                        <Socials settings={settings} />
                        <RatingCard locale={locale} className="!max-w-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

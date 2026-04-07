import { getMenu } from "@/api/menusApi";
import FooterMenu from "./footerMenu/FooterMenu";
import { getSettings } from "@/api/settingsApi";
import { getTexts } from "@/api/textsApi";
import Link from "next/link";
import NextImage from "@/components/ui/NextImage";
import Socials from "@/components/ui/Socials";
import { formatPhoneWithSpaces } from "@/utils/formatPhoneWithSpaces";

export default async function FooterTop() {
    const menu5 = await getMenu({ menuId: 5 });
    const menu3 = await getMenu({ menuId: 3 });
    const menu4 = await getMenu({ menuId: 4 });
    const settings = await getSettings();
    const { text } = await getTexts();

    return (
        <div className="bg-white py-[3.75rem]">
            <div className="container flex lg:flex-row flex-col sm:items-start items-center gap-x-30 gap-y-10">
                <div className="flex flex-col sm:items-start items-center gap-6">
                    <Link href={"/"} className="py-3">
                        <NextImage
                            src={"/images/logo.svg"}
                            alt="LG"
                            width={120}
                            height={56}
                            className="w-[7.5rem] h-auto object-contain"
                        />
                    </Link>

                    <Socials settings={settings} />
                </div>

                {/* <div className="grid grid-cols-5 gap-4"> */}
                <div className="flex sm:flex-row flex-col sm:items-start items-center flex-wrap justify-between gap-6 w-full">
                    <FooterMenu menu={menu3} />
                    <FooterMenu menu={menu4} />
                    <FooterMenu menu={menu5} />
                    <div className="footer-menu">
                        <h4 className="title">{text("Контакты")}</h4>
                        <ul className="list">
                            <li>
                                <div className="flex sm:flex-row flex-col gap-x-2 gap-y-3 text-secondary2 font-medium py-2 sm:text-start text-center">
                                    {text("Телефон")}:{" "}
                                    <div className="flex flex-col gap-x-2 gap-y-3">
                                        <Link href={`tel:${settings.phone}`} className="link !p-0">
                                            {formatPhoneWithSpaces(settings.phone)}
                                        </Link>
                                        <Link href={`tel:${settings.phone2}`} className="link !p-0">
                                            {formatPhoneWithSpaces(settings.phone2)}
                                        </Link>
                                    </div>
                                </div>
                            </li>
                            {/* <li>
                                <Link href={`mailto:${settings.email}`} className="link">
                                    {text("E-mail")}: {settings.email}
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                    <div className="footer-menu">
                        <h4 className="title">{text("Обратная связь")}</h4>
                        <div className="list">
                            <Link href="/contacts" className="main-transparent-btn rounded-btn">
                                {text("Оставить сообщение")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

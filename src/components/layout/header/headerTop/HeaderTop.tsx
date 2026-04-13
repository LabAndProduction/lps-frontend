import { Link } from "@/i18n/routing";

import Icon from "@/components/ui/Icon";
import HeaderTopLinks from "./headerTopLinks/HeaderTopLinks";
import { getSettings } from "@/api/settingsApi";
import LangSelect from "../langSelect/LangSelect";
import { formatPhoneWithSpaces } from "@/utils/formatPhoneWithSpaces";

export default async function HeaderTop() {
    const settings = await getSettings();

    return (
        <div className="header-top lg:block hidden sticky top-0 bg-gray py-[0.625rem] z-91">
            <div className="container flex justify-between">
                <HeaderTopLinks />

                <div className="flex items-center gap-10">
                    <LangSelect />

                    <div className="flex items-center gap-2">
                        <Icon name="phone" className="size-[1.125rem] group-hover:text-main" />
                        <div className="flex items-center gap-4">
                            <Link href={`tel:${settings.phone}`} className="flex font-semibold text-sm hover:text-main">
                                {settings.phone}
                            </Link>
                            <Link
                                href={`tel:${settings.phone2}`}
                                className="flex font-semibold text-sm hover:text-main">
                                {settings.phone2}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

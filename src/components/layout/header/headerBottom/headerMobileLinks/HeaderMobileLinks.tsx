import Icon from "@/components/ui/Icon";
import classNames from "classnames";
import LangSelect from "../../langSelect/LangSelect";
import PhoneDropdown from "../../phoneDropdown/PhoneDropdown";
import { ISettings } from "@/types/api/settings.types";

export interface IHeaderMobileLinksProps {
    settings: ISettings;
}

export default function HeaderMobileLinks({ settings }: IHeaderMobileLinksProps) {
    return (
        <div className="lg:hidden flex items-center gap-1">
            <PhoneDropdown settings={settings} />

            <LangSelect />
        </div>
    );
}

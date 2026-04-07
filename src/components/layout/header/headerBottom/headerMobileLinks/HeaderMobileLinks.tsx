import Icon from "@/components/ui/Icon";
import classNames from "classnames";
import { IHeaderMobileLinksProps } from "@/types/props/types";
import LangSelect from "../../langSelect/LangSelect";
import PhoneDropdown from "../../phoneDropdown/PhoneDropdown";

export default function HeaderMobileLinks({ settings, setIsSearchOpen, isSearchOpen }: IHeaderMobileLinksProps) {
    return (
        <div className="lg:hidden flex items-center gap-1">
            <button
                type="button"
                className={classNames(
                    `flex text-secondary3 p-[0.625rem] rounded-main bg-gray`,
                    isSearchOpen && "sm:hidden",
                )}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsSearchOpen((prev) => !prev);
                }}>
                <Icon name="search" className="size-5" />
            </button>

            <PhoneDropdown settings={settings} />
            {/* <Link
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 font-semibold text-sm text-main px-2">
                <Icon name="phone" className="size-6" />
            </Link> */}
            <LangSelect />
        </div>
    );
}

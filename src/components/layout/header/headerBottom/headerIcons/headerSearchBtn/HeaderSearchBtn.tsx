import Icon from "@/components/ui/Icon";
import { IHeaderSearchBtnProps } from "@/types/props/types";
import classNames from "classnames";

export default function HeaderSearchBtn({ isSearchOpen, setIsSearchOpen }: IHeaderSearchBtnProps) {
    return (
        <button
            type="button"
            className={classNames(`flex text-secondary3 p-[0.625rem] rounded-main bg-gray`, isSearchOpen && "hidden")}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSearchOpen((prev) => !prev);
            }}>
            <Icon name="search" className="size-6" />
        </button>
    );
}

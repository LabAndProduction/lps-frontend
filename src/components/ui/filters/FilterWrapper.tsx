import HideFilter from "../HideFilter";
import classNames from "classnames";
import { IFilterWrapperProps } from "@/types/props/ui.types";

export default function FilterWrapper({
    isOpen,
    setIsOpen,
    title,
    content,
    contentWrapperClassname = "",
}: IFilterWrapperProps) {
    return (
        <div className="pb-7 border-b border-black-10">
            {typeof isOpen !== "undefined" && typeof setIsOpen !== "undefined" ? (
                <HideFilter isOpen={isOpen} setIsOpen={setIsOpen} title={title} />
            ) : (
                <h4 className="font-medium group-hover:text-main leading-150 mb-5">{title}</h4>
            )}

            <div
                className={classNames(
                    typeof isOpen !== "undefined" && typeof setIsOpen !== "undefined"
                        ? isOpen
                            ? "flex"
                            : "hidden"
                        : "flex",
                    "flex-col gap-3",
                    contentWrapperClassname,
                )}>
                {content}
            </div>
        </div>
    );
}

import NextImage from "./NextImage";
import classNames from "classnames";

// The logo as a row: the molecule mark on the left, the company name and a short line
// about what it sells on the right. "footer" is the larger variant.
export default function SiteLogo({ locale, size = "header" }: { locale: string; size?: "header" | "footer" }) {
    const isFooter = size == "footer";
    return (
        <span className="flex items-center gap-3">
            <NextImage
                src="/images/logo-mark.png"
                alt="LPS"
                width={64}
                height={64}
                className={classNames(
                    "object-contain shrink-0",
                    isFooter ? "sm:size-16 size-12" : "lg:size-12 sm:size-11 size-10",
                )}
                unoptimized
            />
            <span className="flex flex-col gap-1 text-[#242c4f]">
                <span
                    className={classNames(
                        "font-semibold leading-110",
                        // in a phone header the name takes two lines, so the icons beside it still fit
                        isFooter ? "sm:text-xl text-base whitespace-nowrap" : "lg:text-lg sm:text-base text-sm sm:whitespace-nowrap max-sm:max-w-[8.5rem]",
                    )}>
                    Lab & Production Solutions
                </span>
                <span
                    className={classNames(
                        "uppercase tracking-[0.12em] text-secondary leading-110 whitespace-nowrap",
                        isFooter ? "sm:text-xs text-[0.625rem]" : "text-[0.6875rem] max-sm:hidden",
                    )}>
                    {locale == "en" ? "Laboratory equipment" : "Лабораторное оборудование"}
                </span>
            </span>
        </span>
    );
}

import NextImage from "./NextImage";
import classNames from "classnames";

// The logo as a row: the molecule mark on the left, text on the right. The header gets the
// compact form - the company name on two lines; the footer shows it on one line with a
// short line about what the company sells.
export default function SiteLogo({ locale, size = "header" }: { locale: string; size?: "header" | "footer" }) {
    if (size == "header") {
        return (
            <span className="flex items-center sm:gap-3 gap-2.5">
                <NextImage
                    src="/images/logo-mark.png"
                    alt="LPS"
                    width={64}
                    height={64}
                    className="object-contain shrink-0 lg:size-12 size-10"
                    unoptimized
                />
                <span className="flex flex-col font-semibold leading-120 text-[#242c4f] lg:text-lg text-base">
                    <span className="whitespace-nowrap">Lab & Production</span>
                    <span>Solutions</span>
                </span>
            </span>
        );
    }

    return (
        <span className="flex items-center gap-3">
            <NextImage
                src="/images/logo-mark.png"
                alt="LPS"
                width={64}
                height={64}
                className="object-contain shrink-0 sm:size-16 size-12"
                unoptimized
            />
            <span className="flex flex-col gap-1 text-[#242c4f]">
                <span className="font-semibold leading-110 sm:text-xl text-base whitespace-nowrap">
                    Lab & Production Solutions
                </span>
                <span className="uppercase tracking-[0.12em] text-secondary leading-110 whitespace-nowrap sm:text-xs text-[0.625rem]">
                    {locale == "en" ? "Laboratory equipment" : "Лабораторное оборудование"}
                </span>
            </span>
        </span>
    );
}

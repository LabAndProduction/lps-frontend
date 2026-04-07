import { IProductBadgeProps } from "@/types/props/ui.types";

export default function ProductBadge({ text, bgColor = "var(--color-red)" }: IProductBadgeProps) {
    return (
        <span
            className="flex-center md:w-[3.75rem] md:min-w-[3.75rem] w-[3rem] min-w-[3rem] md:h-[1.625rem] md:min-h-[1.625rem] h-5 min-h-5 rounded-full md:text-sm text-xs font-semibold text-center text-white"
            style={{ backgroundColor: bgColor }}>
            {text}
        </span>
    );
}

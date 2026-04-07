import Icon from "@/components/ui/Icon";
import { IHeaderBannerProps } from "@/types/props/types";
import Link from "next/link";

export default function HeaderBanner({ item }: IHeaderBannerProps) {
    return (
        <Link
            prefetch={false}
            href={item.url}
            className="group flex h-[10rem] rounded-card relative bg-img"
            style={{ backgroundImage: item.img }}>
            <span className="absolute left-3 bottom-3 size-10 rounded-full flex-center bg-main group-hover:bg-white-20">
                <Icon name="chevron" className="size-3 text-white" />
            </span>
        </Link>
    );
}

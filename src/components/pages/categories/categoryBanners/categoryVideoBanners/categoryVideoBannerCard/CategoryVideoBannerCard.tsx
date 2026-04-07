import NextImage from "@/components/ui/NextImage";
import { ICategoryVideoBannerCardProps } from "@/types/props/pages.types";
import Link from "next/link";

export default function CategoryVideoBannerCard({ item }: ICategoryVideoBannerCardProps) {
    return (
        <>
            {item.img && (
                <Link key={item.id} href={item.url} className="@container group flex flex-col gap-3">
                    <NextImage
                        src={item.img}
                        alt={item.name ? item.name : ""}
                        height={330}
                        width={500}
                        className="2xl:h-[20.625rem] xl:h-[18.75rem] md:h-[16.25rem] sm:h-[12.5rem] h-auto w-full object-cover rounded-card2"
                        // @[480px]:h-[330px] @[380px]:h-[300px] @[280px]:h-[220px]
                    />

                    <div className="flex flex-col gap-2">
                        {item.name.length > 0 && (
                            <h5 className="font-medium text-secondary2 @[23.75rem]:text-base text-sm">{item.name}</h5>
                        )}

                        {item.description.length > 0 && (
                            <h4 className="@[30rem]:text-xl @[23.75rem]:text-lg font-medium line-clamp-2 group-hover:text-main transition-300 leading-120">
                                {item.description}
                            </h4>
                        )}
                    </div>
                </Link>
            )}
        </>
    );
}

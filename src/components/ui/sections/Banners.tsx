import SectionWrapper from "@/components/layout/SectionWrapper";
import NextImage from "../NextImage";
import { getBanners } from "@/api/bannersApi";
import Link from "next/link";

export default async function Banners() {
    const banners = await getBanners({ type: "home_2" });
    return (
        <>
            {banners && banners.data && banners.data.length > 0 && (
                // <SectionWrapper className="section-padding">
                <SectionWrapper className="sm:pt-5 pt-18">
                    <div className="sm:grid flex flex-col lg:grid-cols-3 grid-cols-2 gap-5">
                        {banners.data.map((banner) => (
                            <Link
                                href={banner.url}
                                key={banner.id}
                                className="custom-block overflow-hidden relative group lg:last:col-span-1 last:col-span-2 lg:max-h-none sm:max-h-[28.125rem]">
                                <div className="bg-black-20 absolute left-0 top-0 size-full opacity-0 group-hover:opacity-100 transition-300"></div>
                                <NextImage
                                    src={banner.img}
                                    alt={banner.name ? banner.name : ""}
                                    height={600}
                                    width={520}
                                    className="w-full lg:object-contain object-cover"
                                />
                                <div className="absolute-center-x bottom-0 w-full flex flex-col items-center lg:gap-4 gap-2 2xl:px-8 lg:px-6 px-4 2xl:py-10 xl:py-8 py-6 bg-[linear-gradient(to_bottom,transparent_5%,var(--color-black-40)_50%,var(--color-black-80)_100%)]">
                                    <p className="leading-140 xl:text-xl lg:text-lg text-center text-white">
                                        {banner.description}
                                    </p>
                                    <p className="white-btn transition-300">{banner.button_text}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </SectionWrapper>
            )}
        </>
    );
}

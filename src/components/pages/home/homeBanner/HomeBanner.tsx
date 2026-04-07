"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "@/components/ui/Icon";
import { CSSProperties, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import classNames from "classnames";
import { IHomeBannerProps } from "@/types/props/pages.types";
import NextImage from "@/components/ui/NextImage";
import Link from "next/link";

export default function HomeBanner({ banners }: IHomeBannerProps) {
    const btnClassname = "flex-center size-6 min-w-6 min-h-6";
    const iconClassname = "size-3 min-w-3 min-h-3";
    const swiperRef = useRef<SwiperType | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const SWIPER_AUTOPLAY_TIME = 15000;

    const toggleAutoplay = () => {
        if (!swiperRef.current) return;

        if (isPlaying) {
            swiperRef.current.autoplay.stop();
        } else {
            swiperRef.current.autoplay.start();
        }

        setIsPlaying((prev) => !prev);
    };

    return (
        <section className="home-banner">
            <div className="max-w-[96rem] mx-auto relative">
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={1}
                    speed={600}
                    loop={true}
                    autoplay={{ delay: SWIPER_AUTOPLAY_TIME }}
                    pagination={{ el: ".home-banner .pagination" }}
                    navigation={{ nextEl: ".home-banner .swiper-next", prevEl: ".home-banner .swiper-prev" }}
                    modules={[Autoplay, Navigation, Pagination]}
                    className="">
                    {banners.data.map((banner) => {
                        const { button_text, description, id, img, name, text_position, url, text_color } = banner;
                        return (
                            <SwiperSlide key={id} className="relative">
                                <NextImage
                                    alt={name ? name : ""}
                                    height={720}
                                    width={1536}
                                    src={img}
                                    className="w-full h-full object-cover sm:min-h-0 min-h-[25rem] sm:brightness-[100%] brightness-[60%]"
                                />
                                {(name || description || button_text) && (
                                    <div
                                        className={classNames(
                                            "absolute flex flex-col lg:gap-6 gap-4 z-[1] text-white xl:px-20 md:px-10 sm:px-6 px-4 md:py-10 py-6 max-w-[37.5rem]",

                                            text_position === "top-left" && "top-0 left-0",
                                            text_position === "top-center" && "top-0 absolute-center-x",
                                            text_position === "top-right" && "top-0 right-0",

                                            text_position === "middle-left" && "absolute-center-y left-0",
                                            text_position === "middle-center" && "absolute-center",
                                            text_position === "middle-right" && "absolute-center-y right-0",

                                            text_position === "bottom-left" && "bottom-0 left-0",
                                            text_position === "bottom-center" && "bottom-0 absolute-center-x",
                                            text_position === "bottom-right" && "bottom-0 right-0",
                                        )}
                                        style={text_color ? { color: text_color } : { color: "var(--color-white)" }}>
                                        <div className="flex flex-col lg:gap-4 gap-2">
                                            {name && (
                                                <h3 className="xl:text-[2.5rem] lg:text-[2rem] md:text-[1.75rem] text-[1.5rem] font-semibold leading-100">
                                                    {name}
                                                </h3>
                                            )}

                                            {description && <p className="leading-140 lg:text-lg">{description}</p>}
                                        </div>
                                        {button_text && url && (
                                            <Link href={url} className="white-btn">
                                                {button_text}
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    })}
                    <div className="absolute xl:bottom-10 md:bottom-6 sm:bottom-4 bottom-2 lg:right-6 right-4 lg:left-6 left-4 flex 2xl:gap-[20rem] xl:gap-[15rem] lg:gap-[10rem] md:gap-[5rem] gap-10 gap-5 z-[1]">
                        <div
                            className="pagination static grow w-full flex items-center sm:gap-3 gap-1"
                            style={
                                {
                                    "--swiper-autoplay-time": `${SWIPER_AUTOPLAY_TIME}ms`,
                                    "--autoplay-state": isPlaying ? "running" : "paused",
                                } as CSSProperties
                            }></div>
                        <div className="flex text-white rounded-full overflow-hidden min-w-fit">
                            <button type="button" className={classNames("swiper-prev outline-none", btnClassname)}>
                                <Icon name="chevron" className={classNames(iconClassname, "rotate-180")} />
                            </button>
                            <button
                                type="button"
                                onClick={toggleAutoplay}
                                className={classNames("outline-none", btnClassname)}>
                                <Icon name={isPlaying ? "pause" : "play"} className={iconClassname} />
                            </button>
                            <button type="button" className={classNames("swiper-next outline-none", btnClassname)}>
                                <Icon name="chevron" className={iconClassname} />
                            </button>
                        </div>
                    </div>
                </Swiper>
            </div>
        </section>
    );
}

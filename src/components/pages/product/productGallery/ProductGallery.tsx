"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import NextImage from "@/components/ui/NextImage";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Fancybox from "@/components/ui/fancybox/Fancybox";
import { IProductGalleryProps } from "@/types/props/pages.types";
import Icon from "@/components/ui/Icon";
import { autoplay, IProductVideo, productVideo } from "@/lib/productVideo";

export default function ProductGallery({ product }: IProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { gallery, name, video_links } = product.data;

    // YouTube videos play inside the gallery, after the photos; any other link opens in a new tab
    const links = (video_links || []).filter((link): link is string => !!link && link.length > 0);
    const videos = links.map(productVideo).filter((video): video is IProductVideo => !!video);
    const outsideLinks = links.filter((link) => !productVideo(link));

    return (
        <div className="lg:grid flex flex-col-reverse grid-cols-[5rem_1fr] gap-5 product-gallery-wrapper relative overflow-hidden">
            <div className="min-w-0 flex flex-col gap-2.5">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    // previews drive the big slider by hand: swiper's Thumbs link did not switch it
                    onClick={(swiper) => {
                        const index = swiper.clickedIndex;
                        if (typeof index == "number" && index < gallery.length + videos.length) mainSwiper?.slideTo(index);
                    }}
                    spaceBetween={10}
                    slidesPerView="auto"
                    watchSlidesProgress={true}
                    direction="horizontal"
                    breakpoints={{
                        1024: {
                            direction: "vertical",
                        },
                    }}
                    className="lg:min-w-[5rem] thumbs min-w-full min-h-0!">
                    {gallery.map((item, id) => (
                        <SwiperSlide
                            key={id}
                            className={`transition-300 flex-center cursor-pointer ${activeIndex == id ? "is-active" : ""}`}>
                            <NextImage
                                width={100}
                                height={100}
                                src={item.small}
                                alt={name}
                                className="size-full object-contain"
                            />
                        </SwiperSlide>
                    ))}
                    {videos.map((video, id) => (
                        <SwiperSlide
                            key={`video-${id}`}
                            className={`transition-300 flex-center p-0! cursor-pointer ${activeIndex == gallery.length + id ? "is-active" : ""}`}>
                            <span className="flex-center relative rounded-main overflow-hidden bg-placeholder aspect-square size-full">
                                {video.poster && (
                                    <NextImage
                                        width={100}
                                        height={100}
                                        src={video.poster}
                                        alt={`${name} - видео`}
                                        className="absolute inset-0 size-full object-cover"
                                        unoptimized
                                    />
                                )}
                                <span className="relative flex-center size-8 rounded-full bg-black-40">
                                    <Icon name="play" className="text-white size-4!" />
                                </span>
                            </span>
                        </SwiperSlide>
                    ))}
                    {outsideLinks.map((link, id) => (
                        <SwiperSlide key={`link-${id}`} className="transition-300 flex-center p-0!">
                            <Link
                                href={link}
                                className="transition-300 flex-center relative rounded-main overflow-hidden bg-placeholder aspect-square"
                                target="_blank"
                                rel="nofollow">
                                <Icon name="play" className="text-white size-5!" />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}>
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    onSwiper={setMainSwiper}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.activeIndex);
                        if (thumbsSwiper && !thumbsSwiper.destroyed) thumbsSwiper.slideTo(swiper.activeIndex);
                    }}
                    modules={[Navigation]}
                    className="swiper-with-grid product-gallery bg-white">
                    {gallery.map((item, id) => (
                        <SwiperSlide key={id} className="h-auto flex">
                            <Link
                                data-fancybox="gallery"
                                href={item.original}
                                className="flex-center grow min-h-0 h-full lg:p-6 p-2 outline-none">
                                <NextImage
                                    width={480}
                                    height={480}
                                    src={item.original}
                                    alt={name}
                                    className="size-full object-contain"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                    {videos.map((video, id) => (
                        <SwiperSlide key={`video-${id}`} className="h-auto flex">
                            <VideoSlide
                                video={video}
                                title={name}
                                isActive={activeIndex == gallery.length + id}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Fancybox>
        </div>
    );
}

// The preview frame with a play button; the YouTube player loads only after the click and
// is removed when the visitor moves to another slide, so the sound stops.
function VideoSlide({ video, title, isActive }: { video: IProductVideo; title: string; isActive: boolean }) {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const playing = isPlaying && isActive;

    useEffect(() => {
        if (!isActive) setIsPlaying(false);
    }, [isActive]);

    return (
        <div className="flex-center grow min-h-0 h-full lg:p-6 p-2">
            <div className="relative w-full aspect-video max-h-full rounded-main overflow-hidden bg-black">
                {playing ? (
                    <iframe
                        src={autoplay(video.embed)}
                        title={title}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 size-full border-0"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setIsPlaying(true)}
                        aria-label={`Смотреть видео - ${title}`}
                        className="group absolute inset-0 flex-center size-full">
                        {video.poster && (
                            <NextImage
                                width={480}
                                height={360}
                                src={video.poster}
                                alt={`${title} - видео`}
                                className="absolute inset-0 size-full object-cover"
                                unoptimized
                            />
                        )}
                        <span className="relative flex-center size-16 rounded-full bg-main transition-300 group-hover:scale-110">
                            <Icon name="play" className="text-white size-7!" />
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

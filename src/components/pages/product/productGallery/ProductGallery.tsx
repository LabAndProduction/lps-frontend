"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import NextImage from "@/components/ui/NextImage";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import Fancybox from "@/components/ui/fancybox/Fancybox";
import { IProductGalleryProps } from "@/types/props/pages.types";

export default function ProductGallery({ product }: IProductGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    return (
        <div className="lg:grid flex flex-col-reverse grid-cols-[5rem_1fr] gap-5 product-gallery-wrapper relative overflow-hidden">
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView="auto"
                modules={[Thumbs]}
                watchSlidesProgress={true}
                direction="horizontal"
                breakpoints={{
                    1024: {
                        direction: "vertical",
                    },
                }}
                className="lg:min-w-[5rem] thumbs min-w-full">
                {product.data.gallery.map((item, id) => (
                    <SwiperSlide key={id} className="transition-300 flex-center">
                        <NextImage
                            width={100}
                            height={100}
                            src={item.small}
                            alt={product.data.name}
                            className="size-full object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}>
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[Navigation, Thumbs]}
                    className="swiper-with-grid product-gallery bg-white">
                    {product.data.gallery.map((item, id) => (
                        <SwiperSlide key={id} className="h-auto flex">
                            <Link
                                data-fancybox="gallery"
                                href={item.original}
                                className="flex-center grow lg:p-6  p-2 outline-none">
                                <NextImage
                                    width={480}
                                    height={480}
                                    src={item.original}
                                    alt={product.data.name}
                                    className="size-full object-contain"
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Fancybox>
        </div>
    );
}

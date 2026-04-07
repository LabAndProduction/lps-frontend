"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Icon from "../Icon";
import CategoryCard from "../cards/CategoryCard";
import { ICategoriesSwiperProps } from "@/types/props/ui.types";
import React from "react";

function CategoriesSwiper({ categories }: ICategoriesSwiperProps) {
    return (
        <div className={`relative swiper-with-navigation categories-swiper`}>
            <Swiper
                slidesPerView={2}
                speed={600}
                spaceBetween={16}
                autoplay={{ delay: 15000 }}
                navigation={{
                    nextEl: `.categories-swiper .swiper-next`,
                    prevEl: `.categories-swiper .swiper-prev`,
                }}
                breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                    1536: { slidesPerView: 7 },
                }}
                className="swiper-with-grid"
                modules={[Autoplay, Navigation]}>
                {categories.data.map((category) => (
                    <SwiperSlide
                        key={category.id}
                        className="!h-auto 2xl:max-w-[12.625rem] xl:max-w-[12.25rem] lg:max-w-[11.625rem] md:max-w-[10.75rem] sm:max-w-[12rem] max-w-[18rem]">
                        <CategoryCard category={category} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button type="button" className="swiper-prev">
                <Icon name="chevron" />
            </button>
            <button type="button" className="swiper-next">
                <Icon name="chevron" />
            </button>
        </div>
    );
}

export default React.memo(CategoriesSwiper);

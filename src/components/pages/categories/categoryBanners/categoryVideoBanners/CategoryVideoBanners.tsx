"use client";

import { ICategoryVideoBannersProps } from "@/types/props/pages.types";
import CategoryVideoBannerCard from "./categoryVideoBannerCard/CategoryVideoBannerCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

export default function CategoryVideoBanners({ currentCategoryBanners }: ICategoryVideoBannersProps) {
    // const BANNERS_LENGTH = 3;

    return (
        // <div className="md:grid flex flex-col grid-cols-3 gap-x-5 gap-y-6">
        //     {currentCategoryBanners.data.map((item) => (
        //         <CategoryVideoBannerCard item={item} key={item.id} />
        //     ))}

        //     {currentCategoryBanners.data.length == BANNERS_LENGTH
        //         ? currentCategoryBanners.data.map((item) => <CategoryVideoBannerCard item={item} key={item.id} />)
        //         : [
        //               ...currentCategoryBanners.data,
        //               ...categoryBanners.data.slice(0, BANNERS_LENGTH - currentCategoryBanners.data.length),
        //           ].map((item) => <CategoryVideoBannerCard item={item} key={item.id} />)}
        // </div>

        <Swiper
            slidesPerView={1}
            speed={600}
            spaceBetween={20}
            autoplay={{ delay: 15000 }}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            className="swiper-with-grid"
            modules={[Autoplay]}>
            {currentCategoryBanners.data.map((item) => (
                <SwiperSlide
                    key={item.id}
                    className="!h-auto 2xl:max-w-[31rem] xl:max-w-[25.75rem] lg:max-w-[20.375rem] md:max-w-[22.75rem] sm:max-w-[18.75rem]">
                    <CategoryVideoBannerCard item={item} key={item.id} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import Icon from "@/components/ui/Icon";
import NextImage from "@/components/ui/NextImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { useText } from "@/context/text.context";
import { IBrands } from "@/types/api/brand.types";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function BrandsSwiper({ brands }: { brands: IBrands }) {
    const { text } = useText();
    return (
        <>
            {brands && brands.data && brands.data.length > 0 && (
                <SectionWrapper className="section-padding">
                    <SectionHeading label={text("Бренды")} />

                    <div className={`relative swiper-with-navigation brands-swiper`}>
                        <Swiper
                            slidesPerView={"auto"}
                            speed={600}
                            resistanceRatio={0}
                            spaceBetween={16}
                            autoplay={{ delay: 15000 }}
                            navigation={{
                                nextEl: `.brands-swiper .swiper-next`,
                                prevEl: `.brands-swiper .swiper-prev`,
                            }}
                            className="swiper-with-grid max-sm:overflow-visible!"
                            modules={[Autoplay, Navigation]}>
                            {brands.data.map(({ id, name, img }) => (
                                <SwiperSlide
                                    key={id}
                                    title={name || ""}
                                    className="h-auto! rounded-main! bg-white! sm:p-6! p-4! w-fit!">
                                    <NextImage
                                        src={img}
                                        alt={name || ""}
                                        width={150}
                                        height={80}
                                        className="object-contain w-37.5 h-20 rounded-main!"
                                    />
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
                </SectionWrapper>
            )}
        </>
    );
}

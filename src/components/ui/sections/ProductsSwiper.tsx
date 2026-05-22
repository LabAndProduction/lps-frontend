"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IProductsSwiperProps } from "@/types/props/ui.types";
import SectionHeading from "../SectionHeading";
import SectionWrapper from "@/components/layout/SectionWrapper";
import ProductCard from "../cards/ProductCard";
import Icon from "../Icon";

export default function ProductsSwiper({ label, products, id }: IProductsSwiperProps) {
    return (
        <>
            {products && products.data && products.data.length > 0 && (
                <SectionWrapper className="section-padding">
                    <SectionHeading label={label} />

                    <div className={`relative swiper-with-navigation products-swiper-${id}`}>
                        <Swiper
                            slidesPerView={1}
                            speed={600}
                            spaceBetween={8}
                            autoplay={{ delay: 15000 }}
                            navigation={{
                                nextEl: `.products-swiper-${id} .swiper-next`,
                                prevEl: `.products-swiper-${id} .swiper-prev`,
                            }}
                            breakpoints={{
                                360: { slidesPerView: 2 },
                                768: { slidesPerView: 3, spaceBetween: 16 },
                                1024: { slidesPerView: 4, spaceBetween: 16 },
                                1536: { slidesPerView: 5, spaceBetween: 16 },
                            }}
                            className="swiper-with-grid"
                            modules={[Autoplay, Navigation]}>
                            {products.data.map((product) => (
                                <SwiperSlide key={product.id} className="!h-auto">
                                    <ProductCard product={product} />
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

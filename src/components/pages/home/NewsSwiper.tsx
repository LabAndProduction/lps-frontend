"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import NewsCard from "@/components/ui/cards/NewsCard";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { useText } from "@/context/text.context";
import { IPublications } from "@/types/api/publications.types";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NewsSwiper({ news }: { news: IPublications }) {
    const { text } = useText();
    return (
        <>
            {news && news.data && news.data.length > 0 && (
                <SectionWrapper className="section-padding">
                    <SectionHeading label={text("Новости")} link="/news" />

                    <div className={`relative swiper-with-navigation news-swiper`}>
                        <Swiper
                            slidesPerView={"auto"}
                            speed={600}
                            resistanceRatio={0}
                            spaceBetween={16}
                            // autoplay={{ delay: 15000 }}
                            navigation={{
                                nextEl: `.news-swiper .swiper-next`,
                                prevEl: `.news-swiper .swiper-prev`,
                            }}
                            className="swiper-with-grid max-sm:overflow-visible!"
                            modules={[Autoplay, Navigation]}>
                            {news.data.map((item) => (
                                <SwiperSlide
                                    key={item.id}
                                    className="h-auto! 2xl:w-91! xl:w-75! lg:w-80! md:w-90! sm:w-74! w-60!">
                                    <NewsCard item={item} key={item.id} />
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

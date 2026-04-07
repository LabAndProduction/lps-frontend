"use client";

import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import { ICategoryVideoBannerProps } from "@/types/props/pages.types";
import { useRef, useState } from "react";

export default function CategoryVideoBanner({ category }: ICategoryVideoBannerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {(category.data.poster_img || category.data.video_url) && (
                <div className="relative flex rounded-card2 items-center lg:px-20 sm:px-10 px-4 lg:py-20 sm:py-10 py-6 overflow-hidden lg:h-[37.5rem] md:h-[30rem] sm:h-[25rem] h-[21.875rem]">
                    <div
                        className="absolute left-0 top-0 size-full z-[-2] bg-img"
                        style={
                            category.data.video_url
                                ? {}
                                : category.data.poster_img
                                ? { backgroundImage: `url(${category.data.poster_img})` }
                                : {}
                        }>
                        {category.data.video_url && (
                            <video
                                ref={videoRef}
                                className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover"
                                poster={category.data.poster_img ? category.data.poster_img : ""}
                                playsInline={true}
                                disablePictureInPicture={true}
                                autoPlay={true}
                                muted={true}
                                loop={true}>
                                <source src={category.data.video_url} type="video/webm" />
                            </video>
                        )}
                    </div>
                    <div className="bg-black-50 absolute left-0 top-0 size-full z-[-1]"></div>
                    <div className="flex flex-col gap-6 max-w-[40rem]">
                        <div className="flex flex-col gap-3">
                            {category.data.video_title && (
                                <h2 className="font-medium text-white leading-110 lg:text-[2.5rem] sm:text-[2rem] text-[1.75rem]">
                                    {category.data.video_title}
                                </h2>
                            )}

                            {category.data.description && (
                                <p className="text-white leading-140 lg:text-lg font-medium">
                                    {category.data.description}
                                </p>
                            )}
                        </div>

                        {category.data.video_link && category.data.video_btn_text && (
                            <Link href={category.data.video_link} className="white-btn rounded-round-btn">
                                {category.data.video_btn_text}
                            </Link>
                        )}
                    </div>
                    {category.data.video_url && (
                        <button
                            type="button"
                            onClick={() => togglePlay()}
                            className="absolute-center-x bottom-5 size-6 bg-black-40 flex-center rounded-full">
                            {isPlaying ? (
                                <Icon name="pause" className="text-white !size-3" />
                            ) : (
                                <Icon name="play" className="text-white !size-3" />
                            )}
                        </button>
                    )}
                </div>
            )}
        </>
    );
}

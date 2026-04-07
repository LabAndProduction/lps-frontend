"use client";

import { Link } from "@/i18n/routing";
import NextImage from "../NextImage";
import { ICategoryCardProps } from "@/types/props/ui.types";

export default function CategoryCard({ category }: ICategoryCardProps) {
    return (
        <Link
            prefetch={false}
            href={`/categories/${category.id}-${category.slug}`}
            className="@container group flex flex-col items-center gap-4 max-w-[18.75rem] h-full">
            {/* custom-block-with-padding */}
            <NextImage
                src={category.img}
                alt={category.name}
                height={64}
                width={160}
                className="self-end aspect-square h-[4rem] w-full object-contain"
            />
            <h4 className="group-hover:text-main transition-300 font-semibold text-center leading-110 @[9.375rem]:text-base text-sm">
                {category.name}
            </h4>
        </Link>
    );
}

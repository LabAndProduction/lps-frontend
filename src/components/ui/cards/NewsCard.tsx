import { Link } from "@/i18n/routing";
import { IPublicationsPublication } from "@/types/api/publications.types";
import NextImage from "../NextImage";

export default function NewsCard({ item }: { item: IPublicationsPublication }) {
    const { description, img, name, slug, id } = item;

    return (
        <Link href={`/news/${id}-${slug}`} className="flex flex-col h-full group bg-white rounded-main">
            <div className="w-full aspect-square h-auto overflow-hidden rounded-main">
                <NextImage
                    src={img}
                    alt={name}
                    width={370}
                    height={370}
                    className="object-cover aspect-square w-full h-auto group-hover:scale-105 rounded-main transition-300"
                />
            </div>

            <div className="flex flex-col gap-2 grow p-4">
                <h4 className="font-medium line-clamp-2 leading-snug group-hover:text-main max-sm:text-sm grow">
                    {name}
                </h4>

                {description && description.length > 0 && (
                    <p className="text-secondary line-clamp-3 max-sm:text-sm">{description}</p>
                )}
            </div>
        </Link>
    );
}

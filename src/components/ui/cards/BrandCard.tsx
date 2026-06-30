import { Link } from "@/i18n/routing";
import { SingleBrand } from "@/types/api/brand.types";
import NextImage from "../NextImage";
import classNames from "classnames";

export default function BrandCard({ brand, className }: { brand: SingleBrand; className?: string }) {
    const { name, id, slug, img } = brand;
    return (
        <Link
            title={name || ""}
            href={`/brands/${id}-${slug}`}
            className={classNames(
                "flex-center h-auto! rounded-main! bg-white! sm:p-6! p-4! w-full border border-white hover:border-main",
                className,
            )}>
            <NextImage
                src={img}
                alt={name || ""}
                width={150}
                height={80}
                className="object-contain w-37.5 h-20 rounded-main!"
            />
        </Link>
    );
}

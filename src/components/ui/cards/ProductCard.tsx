import { Link } from "@/i18n/routing";
import WishlistButton from "../buttons/WishlistBtn";
import CartButton from "../buttons/CartButton";
import { IProductCardProps } from "@/types/props/ui.types";
import CompareButton from "../buttons/CompareButton";
import { useText } from "@/context/text.context";
import NextImage from "../NextImage";
import ProductPrice from "../ProductPrice";
import ProductBadge from "../badges/ProductBadge";
import ProductArticleNumber from "../ProductArticleNumber";
import classNames from "classnames";

export default function ProductCard({ product, className }: IProductCardProps) {
    const { text } = useText();
    const { id, slug, img, name, discount, sku } = product;

    return (
        <div
            className={classNames(
                "group flex flex-col gap-3 sm:p-4 p-3 rounded-card relative bg-white h-full min-[360px]:max-w-[18.75rem] max-w-[20.625rem]",
                className,
            )}>
            <Link href={`/product/${id}-${slug}`} className="@container flex-center">
                <NextImage
                    width={200}
                    height={200}
                    src={img}
                    alt={name}
                    className="w-full @[15rem]:h-[12.5rem] @[12.5rem]:h-[9.375rem] h-[8.125rem] object-contain"
                />
            </Link>

            {Number(discount) > 0 && (
                <div className="absolute left-3 top-4">
                    <ProductBadge text={`-${Number(discount).toFixed(0)}%`} />
                </div>
            )}
            <div className={`flex flex-col md:gap-3 gap-2 grow justify-between`}>
                <div className="flex flex-col gap-2 grow">
                    {sku && sku.length > 0 && <ProductArticleNumber articleNumber={sku} />}
                    <div className="flex flex-col gap-2 grow justify-between">
                        <Link
                            href={`/product/${id}-${slug}`}
                            className="leading-125 hover:text-main text-sm line-clamp-2 h-[2.25rem]">
                            {name}
                        </Link>
                        <ProductPrice product={product} />
                    </div>
                </div>
                <div className="flex gap-1">
                    <Link
                        href={`/product/${id}-${slug}`}
                        className="gray-btn rounded-round-btn sm:flex hidden grow px-1">
                        {text("Подробнее")}
                    </Link>
                    <CartButton product={product} type="icon" className="sm:flex hidden" />
                    <CartButton product={product} type="text" className="sm:hidden w-full" />
                </div>
            </div>
            <div className="absolute right-3 top-3 flex flex-col gap-1">
                <WishlistButton product={product} />
                {/* <div className="group-hover:opacity-100 group-hover:translate-x-0 group-hover:visible group-hover:pointer-events-auto lg:opacity-0 lg:translate-x-2 lg:invisible lg:pointer-events-none transition-300">
                    <CompareButton product={product} />
                </div> */}
            </div>
        </div>
    );
}

import { Link } from "@/i18n/routing";
import WishlistButton from "../buttons/WishlistBtn";
import CartButton from "../buttons/CartButton";
import { IRowProductCardProps } from "@/types/props/ui.types";
import CompareButton from "../buttons/CompareButton";
import { useText } from "@/context/text.context";
import NextImage from "../NextImage";
import ProductPrice from "../ProductPrice";
import ProductBadge from "../badges/ProductBadge";
import ProductArticleNumber from "../ProductArticleNumber";

export default function RowProductCard({ product }: IRowProductCardProps) {
    const { text } = useText();
    return (
        <div className="group custom-block gap-3 px-3 sm:py-4 py-3 relative">
            <div className="relative">
                <Link
                    href={`/product/${product.id}-${product.slug}`}
                    className="@container flex-center sm:size-[12.5rem] sm:min-w-[12.5rem] sm:min-h-[12.5rem] min-[420px]:size-[10rem] min-[420px]:min-w-[10rem] min-[420px]:min-h-[10rem] min-[390px]:size-[8rem] min-[390px]:min-w-[8rem] min-[390px]:min-h-[8rem] size-[6rem] min-w-[6rem] min-h-[6rem]">
                    <NextImage
                        width={200}
                        height={200}
                        src={product.img}
                        alt={product.name}
                        className="size-full object-contain"
                    />
                </Link>
                {Number(product.discount) > 0 && (
                    <div className="absolute left-2 top-2">
                        <ProductBadge text={`-${Number(product.discount).toFixed(0)}%`} />
                    </div>
                )}
            </div>

            <div className="@container flex flex-col justify-between sm:gap-4 gap-2 grow">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center gap-4 relative sm:pr-0 pr-9">
                        <Link
                            href={`/product/${product.id}-${product.slug}`}
                            className="leading-125 hover:text-main lg:text-2xl md:text-xl sm:text-lg min-[420px]:text-base text-sm">
                            {product.name}
                        </Link>

                        <div className="flex sm:static absolute right-0 top-0 sm:flex-row flex-col sm:gap-3">
                            <WishlistButton product={product} />

                            {/* <CompareButton product={product} /> */}
                        </div>
                    </div>
                    {product.sku && product.sku.length > 0 && (
                        <div className="flex items-center flex-wrap lg:text-base gap-x-2 text-sm">
                            {text("Код товара")}: <ProductArticleNumber articleNumber={product.sku} />
                        </div>
                    )}
                </div>

                <div className="flex @[31.875rem]:flex-row flex-col sm:gap-4 gap-2 justify-between">
                    <ProductPrice product={product} />

                    <div className="flex items-center gap-2">
                        <Link
                            href={`/product/${product.id}-${product.slug}`}
                            className="sm:flex hidden gray-btn rounded-round-btn sm:min-w-[11rem] sm:w-fit w-full">
                            {text("Подробнее")}
                        </Link>
                        <CartButton product={product} type="text" className="sm:min-w-[11rem] sm:w-fit w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import Icon from "@/components/ui/Icon";
import OvalSpinner from "@/components/ui/OvalSpinner";
import { useCompare } from "@/context/compare.context";
import { ICompareProductHeaderCardProps } from "@/types/props/pages.types";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import ProductPrice from "@/components/ui/ProductPrice";
import NextImage from "@/components/ui/NextImage";
import classNames from "classnames";
import ProductBadge from "@/components/ui/badges/ProductBadge";
import CartButton from "@/components/ui/buttons/CartButton";

export default function CompareProductHeaderCard({ product, colWidthClassname }: ICompareProductHeaderCardProps) {
    const { removeProduct } = useCompare();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <th>
            <div className={classNames(colWidthClassname, "flex flex-col gap-3 relative w-full pr-3")}>
                <div className="relative flex flex-col gap-[0.625rem] items-baseline justify-between">
                    <Link href={`/product/${product.id}-${product.slug}`} className="flex-center p-1 w-full @container">
                        <NextImage
                            width={250}
                            height={250}
                            alt={product.name}
                            src={product.img}
                            className="@[15.625rem]:h-[18.75rem] @[12.5rem]:h-[15.625rem] @[9.375rem]:h-[12.5rem] h-[9.375rem] w-full object-contain"
                        />
                    </Link>
                    {Number(product.discount) > 0 && (
                        <div className="absolute left-2 top-3">
                            <ProductBadge text={`-${Number(product.discount).toFixed(0)}%`} />
                        </div>
                    )}

                    <div className="flex flex-col gap-[0.625rem] grow text-start w-full">
                        <Link
                            href={`/product/${product.id}-${product.slug}`}
                            className="font-semibold hover:text-main line-clamp-2 leading-120 h-[2.4375rem]">
                            {product.name}
                        </Link>

                        <ProductPrice product={product} />

                        <CartButton product={product} className="!w-full" />
                    </div>
                    <div className="absolute right-2 top-2 flex flex-col">
                        {/* <WishlistButton product={product} /> */}
                        <button
                            disabled={isLoading}
                            onClick={() =>
                                removeProduct({
                                    productId: product.id,
                                    setIsLoading,
                                })
                            }
                            className="hover:opacity-60 flex-center size-7">
                            {isLoading ? (
                                <OvalSpinner size={18} color="var(--color-white)" />
                            ) : (
                                <Icon name="trash" className="size-[1.125rem] text-secondary" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </th>
    );
}

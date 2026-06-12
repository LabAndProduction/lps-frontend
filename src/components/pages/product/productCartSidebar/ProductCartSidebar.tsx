"use client";

import { IProductCartSidebarProps } from "@/types/props/pages.types";
import ProductBadge from "@/components/ui/badges/ProductBadge";
import { useText } from "@/context/text.context";
import CartButton from "@/components/ui/buttons/CartButton";
import BuyModal from "@/components/ui/modals/buyModal/BuyModal";
import { useCookies } from "next-client-cookies";

export default function ProductCartSidebar({ product }: IProductCartSidebarProps) {
    const { h1_name, body, seo_title, meta_description, meta_keywords, book, ...productItem } = product.data;
    const { text } = useText();
    const cookies = useCookies();
    const token = cookies.get("token");

    return (
        <div className="custom-block-with-padding flex-col gap-6">
            {token && token.length > 0 && (
                <div className="flex flex-col gap-3">
                    <h4 className="text-lg font-semibold">{text("Цена")}</h4>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col">
                            <p className="font-semibold xl:text-2xl text-xl text-main">
                                {product.data.current_price_formatted}
                            </p>
                            {product.data.old_price > product.data.current_price &&
                                product.data.old_price_formatted && (
                                    <p className="xl:text-base text-sm text-placeholder line-through">
                                        {product.data.old_price_formatted}
                                    </p>
                                )}
                        </div>
                        {Number(product.data.discount) > 0 && (
                            <ProductBadge text={`-${Number(product.data.discount).toFixed(0)}%`} />
                        )}
                    </div>
                </div>
            )}

            <div className="xl:flex md:grid flex grid-cols-2 flex-col gap-2">
                <CartButton product={productItem} type="text" className="!w-full" isGray={true} />
                <BuyModal product={productItem} />
            </div>
        </div>
    );
}

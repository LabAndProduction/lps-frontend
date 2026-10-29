"use client";

import CartButton from "@/components/ui/buttons/CartButton";
import WishlistButton from "@/components/ui/buttons/WishlistBtn";
import ProductBadge from "@/components/ui/badges/ProductBadge";
import { IProductInfoProps } from "@/types/props/pages.types";
import ProductGroups from "./productGroups/ProductGroups";
import { useText } from "@/context/text.context";
import ProductArticleNumber from "../../../ui/ProductArticleNumber";

export default function ProductInfo({ product, attributes, productGroup }: IProductInfoProps) {
    const { text } = useText();
    const {
        h1_name,
        brand,
        sku,
        name,
        product_group_id,
        description,
        stock_info,
        current_price,
        current_price_formatted,
        discount,
    } = product.data;

    return (
        <div className="custom-block-with-padding flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="font-medium leading-140 2xl:text-[1.75rem] md:text-2xl text-xl">
                    {h1_name.length > 0 ? h1_name : name}
                </h1>

                {brand && (
                    <div>
                        {text("Производитель")}: <span className="font-medium">{brand.name}</span>
                    </div>
                )}

                {stock_info && stock_info.length > 0 && (
                    <div>
                        {text("Наличие")}: <span className="font-medium">{stock_info}</span>
                    </div>
                )}

                {sku && sku.length > 0 && <ProductArticleNumber articleNumber={sku} isBig={true} />}
            </div>

            {product_group_id && <ProductGroups attributes={attributes} productGroup={productGroup} />}

            <div className="flex flex-col gap-4 border-t border-gray4 pt-5">
                <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold xl:text-2xl text-xl text-main">
                        {current_price > 0 ? current_price_formatted : text("Цена по запросу")}
                    </p>
                    {Number(discount) > 0 && <ProductBadge text={`-${Number(discount).toFixed(0)}%`} />}
                </div>

                <div className="flex flex-col gap-2">
                    <CartButton product={product.data} type="text" className="!w-full" />
                    <WishlistButton product={product.data} type="button" className="!w-full" />
                </div>
            </div>

            {description.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold">{text("Короткое описание")}</h4>

                    <p>{description}</p>
                </div>
            )}
        </div>
    );
}

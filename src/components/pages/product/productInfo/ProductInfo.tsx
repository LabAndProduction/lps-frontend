"use client";

import CompareButton from "@/components/ui/buttons/CompareButton";
import WishlistButton from "@/components/ui/buttons/WishlistBtn";
import { IProductInfoProps } from "@/types/props/pages.types";
import ProductGroups from "./productGroups/ProductGroups";
import { useText } from "@/context/text.context";
import ProductArticleNumber from "../../../ui/ProductArticleNumber";

export default function ProductInfo({ product, attributes, productGroup }: IProductInfoProps) {
    const { text } = useText();
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="font-medium leading-140 2xl:text-[1.75rem] md:text-2xl text-xl">
                    {product.data.h1_name.length > 0 ? product.data.h1_name : product.data.name}
                </h1>

                {product.data.sku && product.data.sku.length > 0 && (
                    <ProductArticleNumber articleNumber={product.data.sku} isBig={true} />
                )}

                <div className="flex gap-6 flex-wrap">
                    <CompareButton product={product.data} type="text" />
                    <WishlistButton product={product.data} type="text" />
                </div>
            </div>

            {product.data.product_group_id && <ProductGroups attributes={attributes} productGroup={productGroup} />}

            {product.data.description.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold">{text("Короткое описание")}</h4>

                    <p>{product.data.description}</p>
                </div>
            )}
        </div>
    );
}

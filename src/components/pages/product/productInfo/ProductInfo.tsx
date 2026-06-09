"use client";

import CompareButton from "@/components/ui/buttons/CompareButton";
import WishlistButton from "@/components/ui/buttons/WishlistBtn";
import { IProductInfoProps } from "@/types/props/pages.types";
import ProductGroups from "./productGroups/ProductGroups";
import { useText } from "@/context/text.context";
import ProductArticleNumber from "../../../ui/ProductArticleNumber";

export default function ProductInfo({ product, attributes, productGroup }: IProductInfoProps) {
    const { text } = useText();
    const { h1_name, brand, sku, name, product_group_id, description, stock_info } = product.data;
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
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
                </div>

                {sku && sku.length > 0 && <ProductArticleNumber articleNumber={sku} isBig={true} />}

                <div className="flex gap-6 flex-wrap">
                    <CompareButton product={product.data} type="text" />
                    <WishlistButton product={product.data} type="text" />
                </div>
            </div>

            {product_group_id && <ProductGroups attributes={attributes} productGroup={productGroup} />}

            {description.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h4 className="font-semibold">{text("Короткое описание")}</h4>

                    <p>{description}</p>
                </div>
            )}
        </div>
    );
}

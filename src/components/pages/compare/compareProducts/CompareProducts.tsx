import { IProductAttribute, IProductAttributes } from "@/types/api/products.types";
import CompareProductHeader from "./compareProductHeader/CompareProductHeader";
import { useCompare } from "@/context/compare.context";
import { useEffect, useState } from "react";
import { getProductAttributes } from "@/api/productsApi";
import { useCookies } from "next-client-cookies";
import { IAllAttributesAttr } from "@/types/types";
import { ICompareProductsProps } from "@/types/props/pages.types";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import CompareProductsAttrs from "../compareProductsAttrs/CompareProductsAttrs";

export default function CompareProducts({ products }: ICompareProductsProps) {
    const cookies = useCookies();
    const token = cookies.get("token");
    const [attributes, setAttributes] = useState<IAllAttributesAttr[]>([]);
    const { compareList, apiCompareList, setAllAttributes } = useCompare();
    const [productAttributes, setProductAttributes] = useState<
        {
            productId: number;
            attrs: IProductAttribute[];
        }[]
    >([]);
    const locale = useLocaleTS();
    const colWidthClassname =
        "2xl:min-w-[18.125rem] 2xl:max-w-[18.125rem] xl:min-w-[15rem] xl:max-w-[15rem] lg:min-w-[11.875rem] lg:max-w-[11.875rem] min-w-[11.25rem] max-w-[11.25rem]";
    const mapProductAttrs = async (productId: number) => {
        const productAttrs: IProductAttributes = await getProductAttributes({
            productId,
            clientLocale: locale,
        }).then((data) => {
            return data;
        });

        if (productAttrs) {
            const mapped = productAttrs.data.map((attr) => {
                return {
                    name: attr.name,
                    slug: attr.slug,
                    id: attr.id,
                    used_for_filter: attr.used_for_filter,
                };
            });
            setProductAttributes((prev) => {
                return prev.concat({
                    productId: productId,
                    attrs: productAttrs.data,
                });
            });
            setAttributes((prev) => {
                return prev.concat(mapped);
            });
        }
    };

    useEffect(() => {
        if (!token) {
            compareList.map(async (product) => {
                await mapProductAttrs(product.id);
            });
        }
    }, [token, compareList]);
    useEffect(() => {
        if (token) {
            apiCompareList.items.map(async (product) => {
                await mapProductAttrs(product.id);
            });
        }
    }, [token, apiCompareList]);

    useEffect(() => {
        const uniqueIds: number[] = [];

        const unique = attributes.filter((attr) => {
            const isDuplicate = uniqueIds.includes(attr.id);
            if (!isDuplicate) {
                uniqueIds.push(attr.id);
                return true;
            }
            return false;
        });
        setAllAttributes(unique);
    }, [attributes]);
    return (
        <div className="w-full overflow-auto custom-block py-3 px-5">
            <table className={`w-full`}>
                <CompareProductHeader products={products} colWidthClassname={colWidthClassname} />
                <CompareProductsAttrs
                    products={products}
                    productAttributes={productAttributes}
                    colWidthClassname={colWidthClassname}
                />
            </table>
        </div>
    );
}

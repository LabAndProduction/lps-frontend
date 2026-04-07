"use client";

import { IProductGroupsButtonProps } from "@/types/props/pages.types";
import NextImage from "@/components/ui/NextImage";
import { useRouter } from "@/i18n/routing";
import { useEffect, useState } from "react";

export default function ProductGroupsButton({
    groupAttrVal,
    groupAttr,
    productGroup,
    activeAttributes,
}: IProductGroupsButtonProps) {
    const [isActive, setIsActive] = useState<boolean>(false);
    const { push } = useRouter();

    useEffect(() => {
        // set active attrs
        activeAttributes.map((attr) => {
            if (attr.id === groupAttrVal.id && attr.parentId === groupAttr.id) {
                setIsActive(true);
            }
        });
    }, []);

    const handleClick = () => {
        const activeParentsId = productGroup.data.attributes.map((attr) => {
            return attr.id;
        });
        const groupAttributes = activeAttributes.filter((el) => {
            if (activeParentsId.includes(el.parentId)) {
                return el;
            }
        });

        const newArr = groupAttributes
            .map((el) => {
                if (el.parentId == groupAttr.id) {
                    return {
                        id: groupAttrVal.id,
                        parentId: groupAttr.id,
                        isActive: true,
                    };
                }
                return el;
            })
            .map((el) => el.id);
        const sortedNewArr = newArr.sort();

        const res = productGroup.data.products.map(({ attribute_value_ids, product }) => {
            const sortedAttributeValueIds = attribute_value_ids.sort();
            const bool = sortedNewArr.every((el) => {
                return sortedAttributeValueIds.includes(el);
            });
            if (bool) {
                return product;
            }
            return;
        });

        const filteredArr = res.filter((el) => {
            if (el && el.id) {
                return el;
            }
        });

        if (filteredArr.length == 0) {
            productGroup.data.products.forEach(({ attribute_value_ids, product }) => {
                if (attribute_value_ids.includes(groupAttrVal.id)) {
                    // push to the first match with button attrValId
                    push(`/product/${product.id}-${product.slug}`, {
                        scroll: false,
                    });
                }
            });
        } else {
            // push to existing combination
            if (filteredArr[0] && filteredArr[0].id && filteredArr[0].slug) {
                push(`/product/${filteredArr[0].id}-${filteredArr[0].slug}`, {
                    scroll: false,
                });
            }
        }
    };

    if (groupAttr.type == 0) {
        return (
            <button
                title={String(groupAttrVal.id)}
                onClick={handleClick}
                className={`px-3 py-2 ${
                    isActive
                        ? "bg-main border-main text-white"
                        : "border-gray2 border hover:bg-main hover:border-main hover:text-white"
                } rounded-main transition-300`}>
                {groupAttrVal.name}
            </button>
        );
    }
    if (groupAttr.type == 2) {
        return (
            <button
                title={`${groupAttrVal.id}${groupAttrVal.name}`}
                onClick={handleClick}
                className={`border ${
                    isActive ? "border-primary border" : "border-gray2 hover:border-primary"
                }  transition-300 p-[0.3125rem] rounded-main`}>
                <NextImage src={groupAttrVal.image} width={55} height={55} alt={groupAttrVal.name} />
            </button>
        );
    }
}

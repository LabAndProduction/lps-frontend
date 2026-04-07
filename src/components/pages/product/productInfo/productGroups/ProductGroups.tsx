import ProductGroupsButton from "./productGroupsButton/ProductGroupsButton";
import { IProductGroupsProps } from "@/types/props/pages.types";

export default function ProductGroups({ attributes, productGroup, className }: IProductGroupsProps) {
    const activeAttributes = attributes.data
        .map((attr) => {
            return attr.attribute_values.map((attrVal) => {
                return {
                    id: attrVal.id,
                    parentId: attr.id,
                    isActive: true,
                };
            });
        })
        .flat();

    return (
        <div className={`flex flex-col gap-5 ${className}`}>
            {typeof productGroup !== "string" &&
                productGroup.data.attributes.map((attrGroup) => {
                    return (
                        <div key={attrGroup.id} className="flex gap-3 flex-col">
                            <h4 className="leading-140 text-sm font-medium">{attrGroup.name}:</h4>
                            <div className="flex flex-wrap gap-2">
                                {attrGroup.attribute_values.map((attrValGroup) => {
                                    return (
                                        <ProductGroupsButton
                                            productGroup={productGroup}
                                            activeAttributes={activeAttributes}
                                            groupAttrVal={attrValGroup}
                                            groupAttr={attrGroup}
                                            key={attrValGroup.id}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

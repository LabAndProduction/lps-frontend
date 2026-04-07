"use client";

import AttributeCheckbox from "./attributeCheckbox/AttributeCheckbox";
import { useState } from "react";
import { IAttributeProps } from "@/types/props/pages.types";
import FilterWrapper from "../../FilterWrapper";

export default function Attribute({
    attribute,
    isDisabled,
    setIsDisabled,
    isShow = false,
    closeModal,
}: IAttributeProps) {
    const [isOpen, setIsOpen] = useState<boolean>(isShow);

    return (
        <FilterWrapper
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={attribute.name}
            content={
                <>
                    {attribute.attribute_values.map((attrVal) => {
                        return (
                            <AttributeCheckbox
                                attrId={attribute.id}
                                attrSlug={attribute.slug}
                                attrValId={attrVal.id}
                                attrValSlug={attrVal.slug}
                                label={attrVal.name}
                                key={attrVal.id}
                                isDisabled={isDisabled}
                                setIsDisabled={setIsDisabled}
                                closeModal={closeModal}
                            />
                        );
                    })}
                </>
            }
        />
    );
}

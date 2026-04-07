import { IFilterAttributesProps } from "@/types/props/pages.types";
import Attribute from "./attribute/Attribute";

export default function FilterAttributes({
    attributes,
    isDisabled,
    setIsDisabled,
    closeModal,
}: IFilterAttributesProps) {
    return (
        <div className="flex flex-col gap-7">
            {attributes.data.map((attribute, id) => {
                return (
                    <Attribute
                        key={attribute.id}
                        attribute={attribute}
                        isDisabled={isDisabled}
                        setIsDisabled={setIsDisabled}
                        isShow={(id === 0 || id === 1 || id === 2) && true}
                        closeModal={closeModal}
                    />
                );
            })}
        </div>
    );
}

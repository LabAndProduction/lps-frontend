import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { IUseQuantityParams } from "@/types/types";
import toast from "react-hot-toast";
import { useState } from "react";
import { IQuantityChangerLoading } from "@/types/context/cart.context.types";

export default function useQuantity({
    productQuantity,
    setQuantity,
    product,
}: IUseQuantityParams) {
    const { updateProduct } = useCart();
    const { text } = useText();
    const [isLoading, setIsLoading] = useState<IQuantityChangerLoading>({
        minus: false,
        plus: false,
    });
    const handleMinus = () => {
        if (
            productQuantity > 1 &&
            !(productQuantity > 255 || productQuantity < 1)
        ) {
            if (setQuantity) {
                setQuantity((prev) => prev - 1);
            } else {
                updateProduct({
                    product,
                    action: "minus",
                    quantity: productQuantity - 1,
                    setIsLoading,
                });
            }
        }
    };

    const handlePlus = () => {
        if (product.in_stock <= productQuantity) {
            toast.error(text("Нет такого количества товаров в наличии"));
        } else {
            if (
                productQuantity < 255 &&
                !(productQuantity > 255 || productQuantity < 1)
            ) {
                if (setQuantity) {
                    setQuantity((prev) => prev + 1);
                } else {
                    updateProduct({
                        action: "plus",
                        product,
                        quantity: productQuantity + 1,
                        setIsLoading,
                    });
                }
            }
        }
    };

    return { handlePlus, handleMinus, isLoading };
}

import { useOrder } from "@/context/order.context";
import { useText } from "@/context/text.context";
import OrderProductsTotal from "./OrderProductsTotal";
import OrderProductCard from "@/components/ui/cards/OrderProductCard";

export default function OrderProducts() {
    const { orderInfo } = useOrder();
    const { text } = useText();
    return (
        <div className="flex flex-col gap-4">
            <h3 className="lg:text-xl text-lg font-semibold">{text("Товары")}</h3>

            {!!orderInfo && (
                <>
                    <div className="flex flex-col gap-4">
                        {orderInfo.products.map((el) => (
                            <OrderProductCard key={el.item.id} product={el.item} quantity={el.quantity} />
                        ))}
                    </div>

                    <OrderProductsTotal />
                </>
            )}
        </div>
    );
}

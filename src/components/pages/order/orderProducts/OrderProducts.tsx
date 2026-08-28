import { useText } from "@/context/text.context";
import OrderProductsTotal from "./OrderProductsTotal";
import OrderProductCard from "@/components/ui/cards/OrderProductCard";
import { ISingleOrder } from "@/types/api/orders.types";

export default function OrderProducts({ order }: { order: ISingleOrder }) {
    const { text } = useText();
    const { orderItems } = order.data;
    return (
        <div className="flex flex-col gap-4 custom-block-with-padding w-full">
            <h3 className="lg:text-xl text-lg font-semibold">{text("Товары")}</h3>

            {/* {!!orderInfo && ( */}
            <>
                <div className="flex flex-col gap-4">
                    {orderItems.map(({ id, product, quantity }) => (
                        <OrderProductCard key={id} product={product} quantity={quantity} />
                    ))}
                </div>

                <OrderProductsTotal order={order} />
            </>
            {/* )} */}
        </div>
    );
}

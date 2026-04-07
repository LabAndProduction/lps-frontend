import CheckoutProductCard from "@/components/ui/cards/CheckoutProductCard";
import { useCart } from "@/context/cart.context";
import { useCookies } from "next-client-cookies";

export default function CheckoutProducts() {
    const { cart, apiCart } = useCart();
    const cookies = useCookies();
    const token = cookies.get("token");

    return (
        <div className="flex flex-col gap-4 border-b-2 border-gray pb-4">
            {token
                ? apiCart.items.map((item) => (
                      <CheckoutProductCard key={item.id} product={item.product} quantity={item.quantity} />
                  ))
                : cart.map((item) => (
                      <CheckoutProductCard key={item.item.id} product={item.item} quantity={item.quantity} />
                  ))}
        </div>
    );
}

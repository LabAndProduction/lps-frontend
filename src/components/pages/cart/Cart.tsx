"use client";

import CartProductCard from "@/components/ui/cards/CartProductCard";
import Empty from "@/components/ui/Empty";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { useCookies } from "next-client-cookies";

export default function Cart() {
    const { cart, apiCart, isCartEmpty } = useCart();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { text } = useText();

    return (
        <div className="custom-block-with-padding h-fit">
            {isCartEmpty ? (
                <Empty
                    img="/images/cart-empty.png"
                    title={text("Ваша корзина пуста")}
                    link="/"
                    linkText={text("Перейти в каталог")}
                    text={text("Начните покупки и добавьте всё, что вам нужно!")}
                />
            ) : (
                <div className="grid gap-6 w-full">
                    {token
                        ? apiCart.items.map((item) => {
                              return <CartProductCard key={item.id} product={item.product} quantity={item.quantity} />;
                          })
                        : cart.map((item) => {
                              return (
                                  <CartProductCard product={item.item} key={item.item.id} quantity={item.quantity} />
                              );
                          })}
                </div>
            )}
        </div>
    );
}

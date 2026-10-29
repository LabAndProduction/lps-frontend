"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import NextImage from "@/components/ui/NextImage";
import Icon from "@/components/ui/Icon";
import Quantity from "@/components/ui/formElements/Quantity";
import RemoveFromCart from "@/components/pages/cart/RemoveFromCart";

// The cart that slides in from the right after «В корзину»: the products with their quantities,
// the sum and the way on to checkout or to the cart page.
export default function CartDrawer() {
    const { text } = useText();
    const { lines, pricedTotal, onRequestCount, isCartDrawerOpen, setIsCartDrawerOpen } = useCart();
    const close = () => setIsCartDrawerOpen(false);
    // a guest's cart lives in the browser, so the drawer is drawn only there (the server's
    // empty copy would not match it)
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => setIsMounted(true), []);

    useEffect(() => {
        if (!isCartDrawerOpen) return;
        const onKey = (e: KeyboardEvent) => e.key == "Escape" && setIsCartDrawerOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isCartDrawerOpen, setIsCartDrawerOpen]);

    const format = (sum: number) => `${new Intl.NumberFormat("ru-RU").format(sum)} ${text("сум")}`;

    if (!isMounted) return null;

    return (
        <div
            className={classNames("fixed inset-0 z-[100]", !isCartDrawerOpen && "pointer-events-none")}
            aria-hidden={!isCartDrawerOpen}>
            <div
                onClick={close}
                className={classNames(
                    "absolute inset-0 bg-black-40 transition-300",
                    isCartDrawerOpen ? "opacity-100" : "opacity-0",
                )}
            />
            <aside
                role="dialog"
                aria-modal="true"
                aria-label={text("Корзина")}
                className={classNames(
                    "absolute inset-y-0 right-0 flex flex-col w-[92%] max-w-[26.25rem] bg-white transition-300",
                    isCartDrawerOpen ? "translate-x-0" : "translate-x-full",
                )}>
                <div className="flex items-center justify-between gap-4 h-16 px-5 border-b border-gray4">
                    <p className="text-lg font-semibold">
                        {text("Корзина")}
                        {lines.length > 0 && <span className="ml-2 text-sm text-secondary">{lines.length}</span>}
                    </p>
                    <button
                        type="button"
                        onClick={close}
                        aria-label={text("Закрыть")}
                        className="flex-center size-10 rounded-main hover:bg-gray">
                        <Icon name="x" className="size-5" />
                    </button>
                </div>

                {lines.length == 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 grow px-8 text-center">
                        <p className="text-secondary">{text("Ваша корзина пуста")}</p>
                        <Link href="/" onClick={close} className="main-btn">
                            {text("Перейти в каталог")}
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex flex-col grow overflow-y-auto px-5 divide-y divide-gray4">
                            {lines.map(({ product, quantity }) => (
                                <li key={product.id} className="flex gap-4 py-4">
                                    <Link
                                        href={`/product/${product.id}-${product.slug}`}
                                        onClick={close}
                                        className="flex-center shrink-0 size-20 rounded-main bg-white border border-gray4 p-1">
                                        <NextImage
                                            src={product.img}
                                            alt={product.name}
                                            width={80}
                                            height={80}
                                            className="size-full object-contain"
                                        />
                                    </Link>
                                    <div className="flex flex-col gap-2 min-w-0 grow">
                                        <Link
                                            href={`/product/${product.id}-${product.slug}`}
                                            onClick={close}
                                            className="text-sm leading-130 line-clamp-2 hover:text-main">
                                            {product.name}
                                        </Link>
                                        <div className="flex items-center justify-between gap-3 mt-auto">
                                            <Quantity product={product} productQuantity={quantity} />
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-semibold whitespace-nowrap">
                                                    {product.current_price > 0
                                                        ? format(product.current_price * quantity)
                                                        : text("Цена по запросу")}
                                                </span>
                                                <RemoveFromCart product={product} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-4 px-5 py-5 border-t border-gray4">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-medium">{text("Итого")}</span>
                                    <span className="text-xl font-bold">
                                        {pricedTotal > 0 ? format(pricedTotal) : text("Цена по запросу")}
                                    </span>
                                </div>
                                <p className="text-xs text-secondary">
                                    {onRequestCount > 0 && pricedTotal > 0
                                        ? `${text("Без учёта товаров с ценой по запросу")} (${onRequestCount}). `
                                        : ""}
                                    {text("Стоимость доставки менеджер уточнит после заказа.")}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link href="/checkout" onClick={close} className="main-btn !w-full">
                                    {text("Оформить заказ")}
                                </Link>
                                <Link href="/cart" onClick={close} className="main-transparent-btn !w-full">
                                    {text("Перейти в корзину")}
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}

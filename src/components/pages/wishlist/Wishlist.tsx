"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { useWishlist } from "@/context/wishlist.context";
import { useText } from "@/context/text.context";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import ProductCard from "@/components/ui/cards/ProductCard";
import OvalSpinner from "@/components/ui/OvalSpinner";
import ProductsViewButtons from "@/components/ui/ProductsViewButtons";
import { ProductsViewType } from "@/types/types";
import RowProductCard from "@/components/ui/cards/RowProductCard";
import Empty from "@/components/ui/Empty";

export default function Wishlist() {
    const { apiWishlist, wishlist, clearWishlist, isWishlistEmpty } = useWishlist();
    const cookies = useCookies();
    const token = cookies.get("token");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { text } = useText();
    const [productsView, setProductsView] = useState<ProductsViewType>("column");

    return (
        <SectionWrapper>
            <>
                {isWishlistEmpty ? (
                    <Empty
                        link="/"
                        img={"/images/wishlist-empty.png"}
                        title={text("Избранное пусто")}
                        text={text("Добавьте товары, которые вам понравились, чтобы не потерять их!")}
                        linkText={text("Перейти в каталог")}
                    />
                ) : (
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                            <p className="text-sm">
                                {token ? apiWishlist.quantity : wishlist.length} {text("шт.")}
                            </p>
                            <div className="flex gap-x-4 gap-y-3 flex-wrap">
                                <ProductsViewButtons setProductsView={setProductsView} productsView={productsView} />
                                <button
                                    disabled={isLoading}
                                    className="main-btn"
                                    onClick={() => clearWishlist({ setIsLoading })}>
                                    {isLoading && <OvalSpinner size={16} color="var(--color-white)" />}
                                    {text("Очистить избранное")}
                                </button>
                            </div>
                        </div>
                        {productsView == "column" ? (
                            <div className="products-grid">
                                {token
                                    ? apiWishlist.items.map((item) => {
                                          return <ProductCard key={item.id} product={item.product} />;
                                      })
                                    : wishlist.map((item) => {
                                          return <ProductCard key={item.id} product={item} />;
                                      })}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {token
                                    ? apiWishlist.items.map((item) => {
                                          return <RowProductCard key={item.id} product={item.product} />;
                                      })
                                    : wishlist.map((item) => {
                                          return <RowProductCard key={item.id} product={item} />;
                                      })}
                            </div>
                        )}
                    </div>
                )}
            </>
        </SectionWrapper>
    );
}

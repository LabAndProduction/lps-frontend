import { fetchTexts } from "@/api/textsApi";
import { CartProvider } from "@/context/cart.context";
import { CompareProvider } from "@/context/compare.context";
import { LangProvider } from "@/context/lang.context";
import { OrderProvider } from "@/context/order.context";
import { TextProvider } from "@/context/text.context";
import { ViewedProvider } from "@/context/viewed.context";
import { WishlistProvider } from "@/context/wishlist.context";
import { IContextProvidersProps } from "@/types/props/types";
import { SettingsProvider } from "../../context/settings.context";

export async function ContextProviders({ children }: IContextProvidersProps) {
    const texts = await fetchTexts();

    return (
        <LangProvider>
            <TextProvider texts={texts}>
                <SettingsProvider>
                    <CartProvider>
                        <WishlistProvider>
                            <CompareProvider>
                                <OrderProvider>
                                    <ViewedProvider>{children}</ViewedProvider>
                                </OrderProvider>
                            </CompareProvider>
                        </WishlistProvider>
                    </CartProvider>
                </SettingsProvider>
            </TextProvider>
        </LangProvider>
    );
}

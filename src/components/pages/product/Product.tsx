"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { IProductProps } from "@/types/props/pages.types";
import ProductGallery from "./productGallery/ProductGallery";
import ProductInfo from "./productInfo/ProductInfo";
import ProductTabs from "./productTabs/ProductTabs";
import ProductBanners from "./productBanners/ProductBanners";
import { useSettings } from "@/context/settings.context";
import ProductBanner from "./ProductBanner";

// Two columns on desktops: gallery, tabs and banner on the left, a sticky card with
// the name, price and buttons on the right. Phones get gallery, card, tabs in a row.
export default function Product({ product, attributes, productGroup }: IProductProps) {
    const { headerTopHeight, headerHeight } = useSettings();

    return (
        <SectionWrapper className="md:pt-0 pt-5">
            <div className="lg:grid flex flex-col gap-5 lg:grid-cols-[minmax(0,1fr)_23.75rem] xl:grid-cols-[minmax(0,1fr)_28.75rem] items-start">
                <div className="custom-block-with-padding lg:col-start-1 lg:row-start-1 min-w-0 w-full">
                    <div className="w-full min-w-0">
                        <ProductGallery product={product} />
                    </div>
                </div>

                <div
                    className="lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:sticky h-fit w-full"
                    style={{ top: `${headerTopHeight + headerHeight + 20}px` }}>
                    <ProductInfo product={product} attributes={attributes} productGroup={productGroup} />
                </div>

                <div className="lg:col-start-1 lg:row-start-2 min-w-0 w-full">
                    <ProductTabs product={product} attributes={attributes} />
                </div>

                <div className="lg:col-start-1 lg:row-start-3 min-w-0 w-full empty:hidden">
                    <ProductBanner product={product} />
                </div>
            </div>

            <ProductBanners product={product} />
        </SectionWrapper>
    );
}

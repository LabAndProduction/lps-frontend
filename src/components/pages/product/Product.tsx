import SectionWrapper from "@/components/layout/SectionWrapper";
import { IProductProps } from "@/types/props/pages.types";
import ProductGallery from "./productGallery/ProductGallery";
import ProductInfo from "./productInfo/ProductInfo";
import ProductTabs from "./productTabs/ProductTabs";
import ProductSidebar from "./productSidebar/ProductSidebar";
import ProductBanners from "./productBanners/ProductBanners";

export default function Product({ product, attributes, productGroup }: IProductProps) {
    return (
        <SectionWrapper className="md:pt-0 pt-5">
            <div className="xl:grid flex flex-col gap-5 grid-cols-[1fr_26.25rem]">
                <div className="flex flex-col gap-5">
                    <div className="custom-block-with-padding lg:grid flex flex-col grid-cols-2 gap-5">
                        <ProductGallery product={product} />

                        <ProductInfo product={product} attributes={attributes} productGroup={productGroup} />
                    </div>
                    <div className="xl:hidden">
                        <ProductSidebar product={product} />
                    </div>

                    <ProductTabs product={product} attributes={attributes} />
                </div>
                <div className="xl:block hidden">
                    <ProductSidebar product={product} />
                </div>
            </div>
            <div className="section-padding">
                <ProductBanners product={product} />
            </div>
        </SectionWrapper>
    );
}

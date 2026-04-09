import ProductCartSidebar from "../productCartSidebar/ProductCartSidebar";
import ProductInstallment from "../productInstallment/ProductInstallment";
import { IProductSidebarProps } from "@/types/props/pages.types";

export default function ProductSidebar({ product }: IProductSidebarProps) {
    return (
        <div className="flex flex-col gap-5">
            <ProductCartSidebar product={product} />

            {/* {product.data.in_stock !== 0 && <ProductInstallment product={product} />} */}
        </div>
    );
}

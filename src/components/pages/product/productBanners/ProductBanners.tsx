import { IProductBannersProps } from "@/types/props/pages.types";

export default function ProductBanners({ product }: IProductBannersProps) {
    return (
        <>
            {product.data.body2 && product.data.body2.length > 0 && (
                <div className="section-padding">
                    <div
                        className="text-block"
                        dangerouslySetInnerHTML={{
                            __html: product.data.body2,
                        }}></div>
                </div>
            )}
        </>
    );
}

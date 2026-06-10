import NextImage from "@/components/ui/NextImage";
import { Link } from "@/i18n/routing";
import { ISingleProduct } from "@/types/api/products.types";

export default function ProductBanner({ product }: { product: ISingleProduct }) {
    const { banner_link } = product.data;

    let banner_img = "https://labapi.inweb.uz/products/June2026/XmbPzmKp0z0QtYUcc1YN.png";
    return (
        <>
            {banner_img && banner_img.length > 0 && (
                <Link href={banner_link || "#"} className="flex w-full h-100 relative">
                    <NextImage src={banner_img} alt="" fill className="object-cover size-full" />
                </Link>
            )}
        </>
    );
}

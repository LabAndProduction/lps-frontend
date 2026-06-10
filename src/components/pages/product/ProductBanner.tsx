import NextImage from "@/components/ui/NextImage";
import { Link } from "@/i18n/routing";
import { ISingleProduct } from "@/types/api/products.types";

export default function ProductBanner({ product }: { product: ISingleProduct }) {
    const { banner_link, banner_img, name } = product.data;

    return (
        <>
            {banner_img && banner_img.length > 0 && (
                <>
                    {banner_link && banner_link.length > 0 ? (
                        <Link href={banner_link} className="block rounded-card2">
                            <NextImage
                                src={banner_img}
                                alt={`${name} banner`}
                                width={1064}
                                height={300}
                                className="object-contain w-full h-auto rounded-card2"
                            />
                        </Link>
                    ) : (
                        <div className="rounded-card2">
                            <NextImage
                                src={banner_img}
                                alt={`${name} banner`}
                                width={1064}
                                height={300}
                                className="object-contain w-full h-auto rounded-card2"
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

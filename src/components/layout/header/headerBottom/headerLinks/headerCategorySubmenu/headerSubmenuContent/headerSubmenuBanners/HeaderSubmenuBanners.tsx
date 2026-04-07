import { useEffect, useState } from "react";
import HeaderBanner from "./headerBanner/HeaderBanner";
import { IBanner } from "@/types/api/banners.types";
import { getBanners } from "@/api/bannersApi";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { IHeaderSubmenuBannersProps } from "@/types/props/types";

export default function HeaderSubmenuBanners({ category }: IHeaderSubmenuBannersProps) {
    const [banners, setBanners] = useState<IBanner[]>([]);
    const locale = useLocaleTS();

    useEffect(() => {
        async function handleBanners() {
            const bannersData = await getBanners({ type: "menu_1", category_id: category.id, clientLocale: locale });

            setBanners(bannersData.data);
        }

        handleBanners();
    }, []);
    return (
        <>
            {banners && banners.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                    {banners.map((item, id) => (
                        <HeaderBanner item={item} key={id} />
                    ))}
                </div>
            )}
        </>
    );
}

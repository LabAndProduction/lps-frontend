import SectionWrapper from "@/components/layout/SectionWrapper";
import CategoryVideoBanner from "./categoryVideoBanner/CategoryVideoBanner";
import { ICategoryBannersProps } from "@/types/props/pages.types";
import { getBanners } from "@/api/bannersApi";
import CategoryVideoBanners from "./categoryVideoBanners/CategoryVideoBanners";

export default async function CategoryBanners({ category }: ICategoryBannersProps) {
    const currentCategoryBanners = await getBanners({ type: "category_page_1", category_id: category.data.id });
    // const categoryBanners = await getBanners({ type: "category_page_1" });

    return (
        <SectionWrapper>
            <div className="flex flex-col gap-5">
                <CategoryVideoBanner category={category} />

                {/* {(currentCategoryBanners.data.length > 0 || categoryBanners.data.length > 0) && ( */}
                {currentCategoryBanners && currentCategoryBanners.data && currentCategoryBanners.data.length > 0 && (
                    <CategoryVideoBanners
                        currentCategoryBanners={currentCategoryBanners}
                        // categoryBanners={categoryBanners}
                    />
                )}
            </div>
        </SectionWrapper>
    );
}

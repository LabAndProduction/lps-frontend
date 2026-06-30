"use client";

import { Link } from "@/i18n/routing";
import { IBrandCategories, ISingleBrand } from "@/types/api/brand.types";

export interface IBrandCategoriesProps {
    brandCategoriesTree: IBrandCategories;
    brand: ISingleBrand;
}

export default function BrandCategories({ brandCategoriesTree, brand }: IBrandCategoriesProps) {
    return (
        <div className="flex flex-col gap-3">
            {brandCategoriesTree.data.map((category) => {
                return (
                    <div key={category.id} className="flex flex-col gap-1">
                        <Link
                            key={category.id}
                            className="font-semibold leading-relaxed hover:text-main"
                            href={`/categories/${category.id}-${category.slug}?page=1&brands=${brand.data.id}-${brand.data.slug}`}>
                            {category.name}
                        </Link>
                        <div className="flex flex-col gap-0.5">
                            {category.children.length > 0 &&
                                category.children.map((subCategory) => {
                                    return (
                                        <Link
                                            key={subCategory.id}
                                            className="text-sm leading-relaxed hover:text-main"
                                            href={`/categories/${subCategory.id}-${subCategory.slug}?page=1&brands=${brand.data.id}-${brand.data.slug}`}>
                                            {subCategory.name}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

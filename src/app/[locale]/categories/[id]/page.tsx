import { Metadata } from "next";
import { getCategory } from "@/api/categoriesApi";
import { getProducts } from "@/api/productsApi";
import { notFound } from "next/navigation";
import { ICategoryPageParams } from "@/types/pageParams.types";
import CategoryPageWrapper from "@/components/pages/categories/CategoryPageWrapper";
import { getFullUrl } from "@/utils/getFullUrl";

export default async function CategoryPage({ params, searchParams }: ICategoryPageParams) {
    const { id } = await params;
    const { price, brands, attributes, sort, direction, page } = await searchParams;

    const categoryId = Number(id.split("-")[0]);
    const slug = id.split("-").slice(1).join("-");
    const brandsArr: number[] | null = brands ? brands.split(",").map((el) => Number(el.split("-")[0])) : null;
    const category = await getCategory({ categoryId });

    if (!Number.isFinite(categoryId) || !slug) notFound();

    if (!category || !category.data || category.data.slug !== slug) notFound();

    const attrsArr:
        | {
              attrId: number;
              attrValId: number;
          }[]
        | null = attributes
        ? attributes.split(",").map((el) => {
              const arr = el.split("_");
              const attr = arr[0];
              const attrVal = arr[1];
              return {
                  attrId: Number(attr.split("-")[0]),
                  attrValId: Number(attrVal.split("-")[0]),
              };
          })
        : null;

    const products = await getProducts({
        quantity: 20,
        page: page ? Number(page) : 1,
        category_id: categoryId,
        price_from: price ? Number(price.split("-")[0]) : null,
        price_to: price ? Number(price.split("-")[1]) : null,
        brands: brandsArr,
        attributes: attrsArr,
        order_by: sort,
        order_direction: direction,
    });

    return (
        <>
            <CategoryPageWrapper products={products} category={category} />
        </>
    );
}

export async function generateMetadata({ params }: ICategoryPageParams): Promise<Metadata> {
    const { id } = await params;
    const categoryId = Number(id.split("-")[0]);
    const slug = id.split("-").slice(1).join("-");

    const pageUrl = await getFullUrl(`/categories/${id}`);

    const category = await getCategory({
        categoryId: categoryId,
    });

    if (!Number.isFinite(categoryId) || !slug) notFound();

    if (!category || !category.data || category.data.slug !== slug) notFound();

    return {
        title: category.data.seo_title,
        description: category.data.meta_description,
        keywords: category.data.meta_keywords,
        openGraph: {
            title: category.data.seo_title,
            description: category.data.meta_description,
            url: pageUrl,
            images: [
                {
                    url: category.data.img,
                },
            ],
            type: "website",
        },
    };
}

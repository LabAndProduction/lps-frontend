import { getParentCategory } from "@/api/categoriesApi";
import { getTexts } from "@/api/textsApi";
import PageHeader from "@/components/ui/PageHeader";
import { ICategoriesPageHeaderProps } from "@/types/props/pages.types";

export default async function CategoriesPageHeader({ category }: ICategoriesPageHeaderProps) {
    const { text } = await getTexts();

    const parentCategory = await getParentCategory({ categoryId: category.data.id });
    const breadcrumbs =
        typeof parentCategory !== "string"
            ? {
                  links: [
                      { href: "/", title: text("Главная") },
                      {
                          href: `/categories/${parentCategory.data.id}-${parentCategory.data.slug}`,
                          title: parentCategory.data.name,
                      },
                  ],
                  current: category.data.name,
              }
            : {
                  links: [{ href: "/", title: text("Главная") }],
                  current: category.data.name,
              };
    return (
        <PageHeader
            breadcrumbs={breadcrumbs}
            // title={category.data.h1_name.length > 0 ? category.data.h1_name : category.data.name}
        />
    );
}

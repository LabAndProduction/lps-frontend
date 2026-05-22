import HeaderCategorySubmenu from "./headerCategorySubmenu/HeaderCategorySubmenu";
import { IHeaderLinksProps } from "@/types/props/types";

export default function HeaderLinks({ categoriesTree }: IHeaderLinksProps) {
    const linkClassname = "flex items-center h-full py-3 hover:text-main group px-3";
    const spanClassname =
        "py-2 font-medium relative after:block after:absolute after:left-0 after:bottom-0 after:w-full after:-translate-x-[101%] group-hover:after:translate-x-0 after:bg-main after:h-[0.125rem] after:transition-300 overflow-hidden leading-120";

    return (
        <div className="xl:flex hidden justify-center h-auto">
            {/* {categoriesTree.data.map((category) => (
                <HeaderCategorySubmenu
                    key={category.id}
                    category={category}
                    btnClassname={linkClassname}
                    spanClassname={spanClassname}
                />
            ))} */}
        </div>
    );
}

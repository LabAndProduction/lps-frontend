import { Link } from "@/i18n/routing";
import { BLOG_PATH, blogLabel } from "@/lib/blogLink";
import { ISingleMenu } from "@/types/api/menus.types";
import { useLocale } from "next-intl";

export default function HeaderTopLinks({ menu }: { menu: ISingleMenu }) {
    const locale = useLocale();
    return (
        <ul className="flex items-center gap-8">
            {menu?.data?.menuItems.map((link) => (
                <li key={link.id}>
                    <Link className="flex font-medium text-sm hover:text-main" href={link.url}>
                        {link.title}
                    </Link>
                </li>
            ))}
            <li>
                <Link className="flex font-medium text-sm hover:text-main" href={BLOG_PATH}>
                    {blogLabel(locale)}
                </Link>
            </li>
        </ul>
    );
}

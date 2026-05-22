import { Link } from "@/i18n/routing";
import { ISingleMenu } from "@/types/api/menus.types";

export default function HeaderTopLinks({ menu }: { menu: ISingleMenu }) {
    return (
        <>
            {menu && menu.data && (
                <ul className="flex items-center gap-8">
                    {menu.data.menuItems.map((link) => (
                        <li key={link.id}>
                            <Link className="flex font-medium text-sm hover:text-main" href={link.url}>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

import { getMenu } from "@/api/menusApi";
import { Link } from "@/i18n/routing";

export default async function HeaderTopLinks() {
    const menu = await getMenu({ menuId: 2 });

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

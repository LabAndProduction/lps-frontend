import { Link } from "@/i18n/routing";
import classNames from "classnames";

export default function CategoryLinks() {
    // {text("")}
    const links = [
        { id: 0, title: "ARTCOOL Gallery" },
        { id: 1, title: "ARTCOOL Mirror" },
        { id: 2, title: "AIR Puricare" },
        { id: 3, title: "EVO Max" },
        { id: 4, title: "Smart Line", isActive: true },
        { id: 5, title: "Eco Smart" },
        { id: 6, title: "Eco" },
        { id: 7, title: "Pro Cool" },
        { id: 8, title: "Mega Dual" },
        { id: 9, title: "Mega Plus" },
    ];
    return (
        <ul className="flex items-center gap-2 flex-wrap">
            {links.map((link) => (
                <li key={link.id}>
                    <Link
                        href="/"
                        className={classNames(
                            "flex-center bg-white sm:h-10 h-9 px-3 py-2 text-semibold rounded-btn sm:text-base text-sm border border-white",
                            link.isActive ? "text-main" : "hover:border-gray2",
                        )}>
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

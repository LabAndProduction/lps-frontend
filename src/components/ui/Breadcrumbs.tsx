import { Link } from "@/i18n/routing";
import Icon from "./Icon";
import { IBreadcrumbsProps } from "@/types/props/ui.types";

export default function Breadcrumbs({ breadcrumbs }: IBreadcrumbsProps) {
    return (
        <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
            {breadcrumbs.links.map((link, id) => {
                return (
                    <div className="flex items-center gap-3" key={id}>
                        <Link
                            prefetch={false}
                            className="leading-160 text-sm text-secondary hover:text-primary font-medium"
                            href={link.href}>
                            {link.title}
                        </Link>
                        <Icon name="chevron" className="text-primary !size-3" />
                    </div>
                );
            })}

            <p className="text-sm leading-160 font-medium">{breadcrumbs.current}</p>
        </div>
    );
}

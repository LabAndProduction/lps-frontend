import classNames from "classnames";
import { Link } from "@/i18n/routing";
import Icon from "@/components/ui/Icon";
import { IDashboardLinkProps } from "@/types/props/pages.types";

export default function DashboardLink({ tab, activeRoute }: IDashboardLinkProps) {
    const linkCommonClassName = `group flex items-center gap-3 font-medium hover:bg-white-70 py-2 px-4 rounded-main text-secondary2`;
    const iconCommonClassName = `!size-8`;
    return (
        <Link
            href={`/dashboard/${tab.route}`}
            key={tab.id}
            className={classNames(
                linkCommonClassName,
                `${tab.route === activeRoute ? "bg-white pointer-events-none !text-primary" : ""}`,
            )}>
            <Icon name={tab.iconName} className={classNames(iconCommonClassName)} />
            {tab.title}
        </Link>
    );
}

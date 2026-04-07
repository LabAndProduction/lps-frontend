import { Link } from "@/i18n/routing";
import { ISettings } from "@/types/api/settings.types";
import { SpritesName } from "@/types/types";
import Icon from "./Icon";

export default function Socials({ settings }: { settings: ISettings }) {
    const socials: { id: number; icon: SpritesName; link: string }[] = [
        { id: 0, icon: "telegram", link: settings.telegram },
        { id: 1, icon: "facebook", link: settings.facebook },
        { id: 2, icon: "instagram", link: settings.instagram },
        // { id: 3, icon: "youtube", link: settings.youtube },
    ];
    return (
        <div className="flex gap-3">
            {socials.map(
                (item) =>
                    item.link && (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="group border border-secondary hover:border-main flex-center size-10 rounded-full">
                            <Icon name={item.icon} className="size-5 text-secondary group-hover:text-main" />
                        </Link>
                    ),
            )}
        </div>
    );
}

import { ISettings } from "@/types/api/settings.types";
import { SpritesName } from "@/types/types";
import Icon from "./Icon";

// the admin's Instagram field has been used for the LinkedIn address: an Instagram icon is
// shown only for a real instagram.com link, LinkedIn comes from its own field
const isInstagram = (url?: string) => !!url && /instagram\.com/i.test(url);

export default function Socials({ settings }: { settings: ISettings }) {
    const socials: { id: number; icon: SpritesName; label: string; link: string }[] = [
        { id: 0, icon: "telegram", label: "Telegram", link: settings.telegram },
        { id: 1, icon: "facebook", label: "Facebook", link: settings.facebook },
        { id: 2, icon: "linkedin", label: "LinkedIn", link: settings.linkedin },
        { id: 3, icon: "instagram", label: "Instagram", link: isInstagram(settings.instagram) ? settings.instagram : "" },
        // { id: 4, icon: "youtube", label: "YouTube", link: settings.youtube },
    ];
    return (
        <div className="flex gap-3">
            {socials.map(
                (item) =>
                    item.link && (
                        // external profiles open in a new tab, so the visitor stays on the site
                        <a
                            key={item.id}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={item.label}
                            className="group border border-secondary hover:border-main flex-center size-10 rounded-full">
                            <Icon name={item.icon} className="size-5 text-secondary group-hover:text-main" />
                        </a>
                    ),
            )}
        </div>
    );
}

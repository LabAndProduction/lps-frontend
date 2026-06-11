import Icon from "@/components/ui/Icon";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { ISettings } from "@/types/api/settings.types";
import { SpritesName } from "@/types/types";
import { formatPhoneWithSpaces } from "@/utils/formatPhoneWithSpaces";
import { phoneFormatter } from "../../../../utils/phoneFormatter";

export default function ContactsInfo({ settings }: { settings: ISettings }) {
    const { text } = useText();
    const workHoursArr = settings.work_hours ? settings.work_hours.split("\n") : "";
    const contacts: {
        id: number;
        title: string;
        icon: SpritesName;
        text: string;
        link?: string;
        text2?: string;
        link2?: string;
    }[] = [
        {
            id: 0,
            title: text("Номер телефона"),
            icon: "phone",
            text: phoneFormatter(settings.phone),
            link: `tel:${settings.phone}`,
            text2: phoneFormatter(settings.phone2),
            link2: `tel:${settings.phone2}`,
        },
        // { id: 1, title: text("E-mail"), icon: "email", text: settings.email, link: `mailto:${settings.email}` },
        {
            id: 2,
            title: text("Режим работы"),
            icon: "time",
            text: workHoursArr[0] ? workHoursArr[0] : "",
            text2: workHoursArr[1] ? workHoursArr[1] : "",
        },
        {
            id: 3,
            title: text("Адрес"),
            icon: "location",
            text: settings.address ? settings.address : "",
        },
    ];

    return (
        <div className="custom-block py-6 sm:px-6 px-4 flex-col gap-6">
            <h3 className="text-lg font-semibold">{text("Связатьcя с нами")}</h3>

            <div className="flex flex-col gap-6">
                {contacts.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Icon name={item.icon} className="!size-5 text-main" />

                            <h4 className="text-secondary font-medium">{item.title}</h4>
                        </div>

                        {item.link && item.link.length > 0 ? (
                            <Link href={item.link} className="font-medium text-lg hover:text-main leading-120">
                                {item.text}
                            </Link>
                        ) : (
                            <p className="font-medium lg:text-lg leading-120">{item.text}</p>
                        )}
                        {item.link2 && item.link2.length > 0 ? (
                            <Link href={item.link2} className="font-medium text-lg hover:text-main leading-120">
                                {item.text2}
                            </Link>
                        ) : (
                            <p className="font-medium lg:text-lg leading-120">{item.text2}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

import Icon from "@/components/ui/Icon";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { IContactItem } from "../Contacts";

export default function ContactsInfo({ contacts }: { contacts: IContactItem[] }) {
    const { text } = useText();

    return (
        <div className="custom-block py-6 sm:px-6 px-4 flex-col gap-6">
            {/* <h3 className="text-lg font-semibold">{text("Связатьcя с нами")}</h3> */}

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
                    </div>
                ))}
            </div>
        </div>
    );
}

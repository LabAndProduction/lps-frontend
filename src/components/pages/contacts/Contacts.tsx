"use client";

import ContactsForm from "./contactsForm/ContactsForm";
import { IContactsProps } from "@/types/props/pages.types";
import SectionWrapper from "@/components/layout/SectionWrapper";
import StaticMap from "@/components/ui/StaticMap";
import ContactsInfo from "./contactsInfo/ContactsInfo";
import { useText } from "@/context/text.context";
import { SpritesName } from "@/types/types";
import { phoneFormatter } from "@/utils/phoneFormatter";

export interface IContactItem {
    id: number;
    title: string;
    icon: SpritesName;
    text: string | null;
    link?: string;
}

export default function Contacts({ settings }: IContactsProps) {
    const { text } = useText();
    const { work_hours, phone, address, address2, phone2, work_hours2, map, map2 } = settings;

    const contacts1: IContactItem[] = [
        {
            id: 3,
            title: text("Адрес"),
            icon: "location",
            text: address,
        },
        {
            id: 0,
            title: text("Номер телефона"),
            icon: "phone",
            text: phoneFormatter(phone),
            link: `tel:${phone}`,
        },
        {
            id: 2,
            title: text("Режим работы"),
            icon: "time",
            text: work_hours,
        },
    ];
    const contacts2: IContactItem[] = [
        {
            id: 3,
            title: text("Адрес"),
            icon: "location",
            text: address2,
        },
        {
            id: 0,
            title: text("Номер телефона"),
            icon: "phone",
            text: phoneFormatter(phone2),
            link: `tel:${phone2}`,
        },
        {
            id: 2,
            title: text("Режим работы"),
            icon: "time",
            text: work_hours2,
        },
    ];
    return (
        <>
            <SectionWrapper>
                <ContactsForm />
            </SectionWrapper>

            <SectionWrapper className="section-padding">
                <div className="lg:grid flex flex-col grid-cols-2 gap-5">
                    <ContactsInfo contacts={contacts1} />
                    <StaticMap iframe={map} />
                </div>
            </SectionWrapper>
            <SectionWrapper className="section-padding">
                <div className="lg:grid flex flex-col grid-cols-2 gap-5">
                    <ContactsInfo contacts={contacts2} />
                    <StaticMap iframe={map2} />
                </div>
            </SectionWrapper>
        </>
    );
}

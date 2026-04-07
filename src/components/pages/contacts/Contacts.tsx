"use client";

import ContactsForm from "./contactsForm/ContactsForm";
import { IContactsProps } from "@/types/props/pages.types";
import SectionWrapper from "@/components/layout/SectionWrapper";
import StaticMap from "@/components/ui/StaticMap";
import ContactsInfo from "./contactsInfo/ContactsInfo";

export default function Contacts({ settings }: IContactsProps) {
    return (
        <>
            <SectionWrapper>
                <div className="lg:grid flex flex-col grid-cols-2 gap-5">
                    <ContactsInfo settings={settings} />

                    <ContactsForm />
                </div>
            </SectionWrapper>

            <SectionWrapper className="section-padding">
                <StaticMap iframe={settings.map} />
            </SectionWrapper>
        </>
    );
}

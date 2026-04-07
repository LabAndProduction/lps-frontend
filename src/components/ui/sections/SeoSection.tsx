"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { Link } from "@/i18n/routing";
import Icon from "../Icon";
import { ISeoSectionProps } from "@/types/props/ui.types";
import { useText } from "@/context/text.context";

export default function SeoSection({ body, link }: ISeoSectionProps) {
    const { text } = useText();
    return (
        <>
            {body && body.length > 0 && (
                <SectionWrapper className="section-padding">
                    <div className="flex flex-col gap-6">
                        <div
                            className="text-block"
                            dangerouslySetInnerHTML={{
                                __html: body,
                            }}></div>

                        {!!link && (
                            <Link href={link} className="main-btn">
                                {text("Узнать больше")} <Icon name="chevron" className="!size-4" />
                            </Link>
                        )}
                    </div>
                </SectionWrapper>
            )}
        </>
    );
}

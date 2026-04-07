import { getStaticTextAdvantages } from "@/api/staticTextsApi";
import { getTexts } from "@/api/textsApi";
import SectionWrapper from "@/components/layout/SectionWrapper";

import { Link } from "@/i18n/routing";
import Image from "next/image";

export default async function Advantages() {
    const { text } = await getTexts();
    const advantages = await getStaticTextAdvantages();

    return (
        <>
            {advantages.data.length > 0 && (
                <SectionWrapper className="section-padding">
                    <div className="@container md:grid flex flex-col 2xl:grid-cols-4 grid-cols-2 gap-5">
                        {advantages.data.map((advantage, id) => (
                            <div
                                key={id}
                                className="custom-block flex-col justify-between gap-4 lg:p-8 sm:p-6 px-4 py-6">
                                <div className="flex @[25rem]:flex-row flex-col-reverse justify-between gap-6">
                                    <div className="flex flex-col gap-3">
                                        {!!advantage.name && advantage.name.length > 0 && (
                                            <h4 className="font-semibold lg:text-2xl sm:text-xl text-lg">
                                                {advantage.name}
                                            </h4>
                                        )}

                                        {!!advantage.description && advantage.description.length > 0 && (
                                            <p className="leading-130">{advantage.description}</p>
                                        )}
                                    </div>
                                    {advantage.img && advantage.img.length > 0 && (
                                        <Image
                                            src={advantage.img}
                                            alt={advantage.name ? advantage.name : " "}
                                            width={60}
                                            height={60}
                                            className="min-w-[3.75rem] min-h-[3.75rem] size-[3.75rem]"
                                        />
                                    )}
                                </div>
                                {advantage.url && advantage.url.length > 0 && (
                                    <Link href={advantage.url} className="text-main hover:text-main-50 w-fit py-1">
                                        {text("Подробнее")}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            )}
        </>
    );
}

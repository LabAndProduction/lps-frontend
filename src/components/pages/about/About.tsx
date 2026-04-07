import { Link } from "@/i18n/routing";
import NextImage from "@/components/ui/NextImage";
import Icon from "@/components/ui/Icon";
import { IAboutProps } from "@/types/props/pages.types";
import { getStaticTextAbout } from "@/api/staticTextsApi";
import SectionWrapper from "@/components/layout/SectionWrapper";

export default async function About({ page }: IAboutProps) {
    const banners = await getStaticTextAbout();

    return (
        <>
            <section>
                <div className="2xl:container mx-auto">
                    <div
                        className="flex justify-end 2xl:rounded-card2 lg:p-8 py-6 sm:px-6 px-4  bg-img xl:h-[45rem] lg:h-[35rem] h-[25rem]"
                        style={{ backgroundImage: `url(/images/about.png)` }}>
                        <div className="md:text-right text-center flex flex-col gap-4 md:items-end items-center max-w-[37.5rem]">
                            <h1 className="font-bold xl:text-[2rem] lg:text-[1.875rem] text-[1.75rem]  leading-120">
                                {page.data.seo_title}
                            </h1>

                            <p className="sm:font-medium lg:text-xl sm:text-lg leading-140">{page.data.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <SectionWrapper className="section-padding">
                <div className="md:grid flex flex-col grid-cols-3 gap-x-5 gap-y-6">
                    {banners.data.map((item, id) => (
                        <Link key={id} href={"/"} className="@container flex flex-col gap-4 hover:text-main">
                            {item.img && item.img.length > 0 && (
                                <NextImage
                                    alt={item.name ? item.name : " "}
                                    height={330}
                                    src={item.img}
                                    width={520}
                                    className="rounded-card2 @[28.125rem]:h-[20rem] @[21.875rem]:h-[16.25rem] @[15.625rem]:h-[12.5rem] h-[10.625rem]  w-full object-cover"
                                />
                            )}

                            {item.name && item.name.length > 0 && (
                                <p className="flex items-center gap-2 @[28.125rem]:text-2xl @[21.875rem]:text-xl @[15.625rem]:text-lg text-base font-medium">
                                    {item.name}
                                    <Icon name="chevron" className="text-main" />
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            </SectionWrapper>
        </>
    );
}

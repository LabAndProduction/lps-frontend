import { Link } from "@/i18n/routing";
import NextImage from "./NextImage";
import { IEmptyProps } from "@/types/props/ui.types";

export default function Empty({ title, text, link, linkText, img }: IEmptyProps) {
    return (
        <div className="custom-block lg:flex-row flex-col flex-center lg:gap-[3.75rem] gap-6 xl:py-[6.25rem] lg:py-[4rem] py-10 px-4 w-full">
            <div>
                <NextImage
                    alt={title}
                    src={img}
                    height={260}
                    width={260}
                    className="lg:size-[16.25rem] size-[12rem] object-contain"
                />
            </div>
            <div className="flex flex-col lg:items-start items-center gap-6 max-w-[25rem] lg:text-start text-center">
                <div className="flex flex-col gap-3">
                    <h2 className="xl:text-[2rem] lg:text-2xl text-xl font-semibold">{title}</h2>

                    {!!text && <p className="font-medium text-secondary leading-120">{text}</p>}
                </div>
                {!!link && !!linkText && (
                    <Link href={link} className="main-btn min-w-[12.5rem] rounded-full">
                        {linkText}
                    </Link>
                )}
            </div>
        </div>
    );
}

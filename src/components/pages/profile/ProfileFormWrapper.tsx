import { IProfileFormWrapperProps } from "@/types/props/pages.types";

export default function ProfileFormWrapper({ title, content }: IProfileFormWrapperProps) {
    return (
        <section className="custom-block-with-padding w-full">
            <div className="xl:max-w-[25rem] custom-form-wrapper w-full">
                {title.length > 0 && <h2 className="form-title !text-start leading-120">{title}</h2>}

                {content}
            </div>
        </section>
    );
}

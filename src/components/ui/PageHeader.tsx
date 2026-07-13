import { IPageHeaderProps } from "@/types/props/ui.types";
import Breadcrumbs from "./Breadcrumbs";

export default function PageHeader({ title, breadcrumbs }: IPageHeaderProps) {
    return (
        <div className="container py-5 flex flex-col gap-3 max-sm:pt-18">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {title && <h1 className="font-bold lg:text-2xl text-xl leading-120">{title}</h1>}
        </div>
    );
}

import { IOrderInfoCardProps } from "@/types/props/pages.types";

export default function OrderInfoCard({ title, info }: IOrderInfoCardProps) {
    return (
        <div className="flex flex-col gap-1">
            <h4 className="text-sm text-secondary">{title}</h4>
            <p>{info}</p>
        </div>
    );
}

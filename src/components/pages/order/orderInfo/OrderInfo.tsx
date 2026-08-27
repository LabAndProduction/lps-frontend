import OrderInfoCard from "./OrderInfoCard";
import { useText } from "@/context/text.context";
import { ISingleOrder } from "@/types/api/orders.types";
import { phoneFormatter } from "@/utils/phoneFormatter";

export default function OrderInfo({ order }: { order: ISingleOrder }) {
    const { text } = useText();
    const { created_at, name, phone_number, email } = order.data;

    return (
        <div className="flex flex-col gap-4 h-fit">
            <OrderInfoCard title={text("Дата заказа")} info={created_at} />

            <OrderInfoCard title={text("Имя и Фамилия")} info={name} />

            <OrderInfoCard title={text("Номер телефона")} info={phoneFormatter(phone_number)} />

            {!!email && email.length > 0 && <OrderInfoCard title={"Email"} info={email} />}
        </div>
    );
}

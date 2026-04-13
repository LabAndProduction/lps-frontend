import { useOrder } from "@/context/order.context";
import OrderInfoCard from "./OrderInfoCard";
import { useText } from "@/context/text.context";
import { formatPhoneWithSpaces } from "../../../../utils/formatPhoneWithSpaces";

export default function OrderInfo() {
    const { orderInfo } = useOrder();
    const { text } = useText();

    return (
        <div className="flex flex-col gap-4 h-fit">
            {orderInfo ? (
                <>
                    <OrderInfoCard title={text("Дата заказа")} info={orderInfo.date} />
                    <OrderInfoCard
                        title={text("Имя и Фамилия")}
                        info={`${orderInfo.name} ${orderInfo.surname ? orderInfo.surname : ""}`}
                    />
                    <OrderInfoCard title={text("Номер телефона")} info={orderInfo.phone_number} />
                    {!!orderInfo.email && <OrderInfoCard title={"Email"} info={orderInfo.email} />}

                    {!!orderInfo.installment_duration && !!orderInfo.installment && (
                        <OrderInfoCard
                            title={text("Рассрочка")}
                            info={`${orderInfo.installment}(${orderInfo.installment_duration}${text("мес.")})`}
                        />
                    )}
                </>
            ) : null}
        </div>
    );
}

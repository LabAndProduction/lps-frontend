"use client";

import Empty from "@/components/ui/Empty";
import { useText } from "@/context/text.context";
import { IOrdersProps } from "@/types/props/pages.types";
import { formatPhoneWithSpaces } from "../../../utils/formatPhoneWithSpaces";

export default function Orders({ orders }: IOrdersProps) {
    const { text } = useText();
    const thead = [
        text("Номер заказа"),
        text("Имя и Фамилия"),
        text("Дата заказа"),
        text("Телефон"),
        text("Метод доставки"),
        text("Метод оплаты"),
        text("Итого"),
    ];
    return (
        <section className="custom-block custom-block-padding w-full">
            <div className="custom-table-wrapper">
                {(!orders.data || (orders.data && orders.data.length == 0)) && (
                    <Empty img="/images/cart-empty.png" title={text("Ничего не найдено")} />
                )}
                {orders.data && orders.data.length > 0 && (
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {thead.map((el, id) => {
                                    return <th key={id}>{el}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.created_at}</td>
                                        <td className="whitespace-nowrap">
                                            {formatPhoneWithSpaces(order.phone_number)}
                                        </td>
                                        <td>{order.shipping_method_title}</td>
                                        <td>{order.payment_method_title}</td>
                                        <td>
                                            {new Intl.NumberFormat("fr-FR").format(order.total)} {text("сум")}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </section>
    );
}

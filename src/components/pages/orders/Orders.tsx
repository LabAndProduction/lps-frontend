"use client";

import Empty from "@/components/ui/Empty";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { IOrdersProps } from "@/types/props/pages.types";
import { phoneFormatter } from "@/utils/phoneFormatter";

export default function Orders({ orders }: IOrdersProps) {
    const { text } = useText();
    const thead = [
        text("Номер заказа"),
        text("Имя и Фамилия"),
        text("Дата заказа"),
        text("Телефон"),
        text("Итого"),
        "",
    ];
    return (
        <section className="custom-block w-full overflow-hidden">
            <div className="custom-table-wrapper">
                {(!orders.data || (orders.data && orders.data.length == 0)) && (
                    <Empty img="/images/cart-empty.png" title={text("Ничего не найдено")} />
                )}
                {orders.data && orders.data.length > 0 && (
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {thead.map((el, id) => {
                                    return (
                                        <th className="first:pl-6! bg-main/10" key={id}>
                                            {el}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map(({ id, name, created_at, phone_number, total }) => {
                                return (
                                    <tr key={id} className="border-b border-gray">
                                        <td className="pl-6!">{id}</td>
                                        <td>{name}</td>
                                        <td>{created_at}</td>
                                        <td className="whitespace-nowrap">{phoneFormatter(phone_number)}</td>
                                        <td>
                                            {new Intl.NumberFormat("fr-FR").format(total)} {text("сум")}
                                        </td>
                                        <td>
                                            <Link href={`/order/${id}`} className="main-btn">
                                                {text("Подробнее")}
                                            </Link>
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

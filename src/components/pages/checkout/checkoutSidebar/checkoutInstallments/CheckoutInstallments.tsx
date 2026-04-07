"use client";

import NextImage from "@/components/ui/NextImage";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { ICheckoutForm } from "@/types/form.types";
import { ICheckoutInstallmentsProps } from "@/types/props/pages.types";
import classNames from "classnames";
import { ErrorMessage, Field, useFormikContext } from "formik";

export default function CheckoutInstallments({ installments }: ICheckoutInstallmentsProps) {
    const { text } = useText();
    const { values, isSubmitting, setFieldValue, validateField, setFieldTouched } = useFormikContext<ICheckoutForm>();
    const { isCartEmpty } = useCart();

    return (
        <div>
            <div className="flex flex-col gap-3">
                {installments.installment_prices.map((instl) => {
                    return instl.prices.map((price) => {
                        if (price.duration == values.installment_duration) {
                            return (
                                <label
                                    key={instl.id}
                                    className={classNames(
                                        "flex items-center justify-between p-4 rounded-btn border border-gray bg-gray hover:bg-transparent hover:border-main leading-120 text-sm font-medium text-right",
                                        values.installment == instl.code ? "bg-transparent border-main" : "",
                                    )}>
                                    <NextImage
                                        src={instl.image}
                                        alt={instl.name}
                                        width={100}
                                        height={24}
                                        className="w-auto h-6 object-contain max-w-[6.25rem]"
                                    />
                                    <Field
                                        type="radio"
                                        name="installment"
                                        value={instl.code}
                                        className="appearance-none hidden"
                                        disabled={isSubmitting || isCartEmpty}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            setFieldValue("installment", e.target.value);
                                            setFieldValue("installment_name", instl.name);

                                            setFieldTouched("installment", false, false);
                                            setFieldTouched("installment_name", false, false);

                                            validateField("installment");
                                            validateField("installment_name");
                                        }}
                                    />

                                    {text("от {number} сум").replace(
                                        "{number}",
                                        new Intl.NumberFormat("fr-FR").format(price.price_per_month),
                                    )}
                                </label>
                            );
                        }
                    });
                })}
            </div>
            <ErrorMessage name="installment">{(msg) => <p className="pl-1 text-xs text-red">{msg}</p>}</ErrorMessage>
        </div>
    );
}

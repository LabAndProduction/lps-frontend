"use client";

import { ICheckoutForm } from "@/types/form.types";
import { ICheckoutInstallmentDurationsProps } from "@/types/props/pages.types";
import { ErrorMessage, useFormikContext } from "formik";
import Slider from "rc-slider";
import { useEffect, useState } from "react";

export default function CheckoutInstallmentDurations({ installments }: ICheckoutInstallmentDurationsProps) {
    const [marks, setMarks] = useState<Record<string | number, string | number>>({});
    const [months, setMonths] = useState<number[]>([]);
    const { setFieldValue, validateField, setFieldTouched } = useFormikContext<ICheckoutForm>();

    useEffect(() => {
        if (installments) {
            const allMonths = Array.from(
                new Set(
                    installments.installment_prices.flatMap((instl) => instl.prices.map((price) => price.duration)),
                ),
            ).sort((a, b) => a - b);
            const newMarks: Record<string | number, string | number> = {};
            setMonths(allMonths);

            for (let i = 0; i < allMonths.length; i++) {
                newMarks[i] = allMonths[i];
            }

            setMonths(allMonths);
            setMarks(newMarks);
        }
    }, []);

    return (
        <div>
            <div className="px-2">
                <Slider
                    className="installment-slider"
                    min={0}
                    max={months.length - 1}
                    marks={marks}
                    step={null}
                    defaultValue={0}
                    onChangeComplete={(value) => {
                        if (typeof value === "number") {
                            setFieldValue("installment_duration", months[value]);

                            setFieldValue("installment", "");
                            setFieldValue("installment_name", "");

                            setFieldTouched("installment_duration", false, false);
                            setFieldTouched("installment", false, false);
                            setFieldTouched("installment_name", false, false);

                            validateField("installment_duration");
                            validateField("installment");
                            validateField("installment_name");
                        }
                    }}
                />
            </div>
            <ErrorMessage name="installment_duration">
                {(msg) => <p className="pl-1 text-xs text-red">{msg}</p>}
            </ErrorMessage>
        </div>
    );
}

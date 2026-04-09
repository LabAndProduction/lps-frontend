"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { ScrollToFieldError } from "@/components/ui/ScrollToFieldError";
import { Form, Formik } from "formik";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { ICheckoutForm } from "@/types/form.types";
import useFormValidation from "@/hooks/useFormValidation";
import { useEffect, useState } from "react";
import { getCalculatedInstallments } from "@/api/installmentCalcApi";
import { ICalculatedInstallments } from "@/types/api/installmentCalc.types";
import { useCart } from "@/context/cart.context";
import { useCookies } from "next-client-cookies";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import CheckoutPaymentMethod from "./checkoutPaymentMethod/CheckoutPaymentMethod";
import { ICheckoutProps } from "@/types/props/pages.types";
import useCheckoutSubmit from "@/hooks/useCheckoutSubmit";
import CheckoutSidebar from "./checkoutSidebar/CheckoutSidebar";

const initialValues: ICheckoutForm = {
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    message: "",

    payment_method: "cash&card",

    installment: "",
    installment_duration: 3,
    installment_name: "",
};

export default function Checkout({ apiInstallments }: ICheckoutProps) {
    const { checkoutValidationSchema } = useFormValidation();
    const locale = useLocaleTS();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { localCartTotal, apiCart } = useCart();
    const [installments, setInstallments] = useState<ICalculatedInstallments>();
    const { handleSubmit } = useCheckoutSubmit({ installments });

    useEffect(() => {
        if (!token) {
            getCalculatedInstallments({ clientLocale: locale, price: localCartTotal }).then((data) =>
                setInstallments(data),
            );
        } else {
            getCalculatedInstallments({ clientLocale: locale, price: apiCart.total }).then((data) =>
                setInstallments(data),
            );
        }
    }, [token]);

    return (
        <SectionWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="cart-wrapper-grid">
                        <ScrollToFieldError />
                        <div className="flex flex-col gap-5">
                            <CheckoutForm isSubmitting={isSubmitting} />

                            {/* <CheckoutPaymentMethod<ICheckoutForm>
                                isSubmitting={isSubmitting}
                                setFieldValue={setFieldValue}
                                apiInstallments={apiInstallments}
                            /> */}
                        </div>

                        <CheckoutSidebar installments={installments} isSubmitting={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </SectionWrapper>
    );
}

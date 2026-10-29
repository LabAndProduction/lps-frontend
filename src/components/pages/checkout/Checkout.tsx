"use client";

import { useState } from "react";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { ScrollToFieldError } from "@/components/ui/ScrollToFieldError";
import { Form, Formik } from "formik";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { ICheckoutForm } from "@/types/form.types";
import useFormValidation from "@/hooks/useFormValidation";
import useCheckoutSubmit from "@/hooks/useCheckoutSubmit";
import CheckoutSidebar from "./checkoutSidebar/CheckoutSidebar";
import { IProfile } from "@/types/api/profile.types";
import { format } from "@react-input/mask";
import { phoneMaskOptions } from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import { phoneFormatter } from "@/utils/phoneFormatter";

// Checkout for everyone: a visitor with an account gets the form filled from the profile,
// a guest fills it in. After a guest's order the form gives way to a thank-you message.
export default function Checkout({ profile, storePhone }: { profile: IProfile | null; storePhone?: string }) {
    const { checkoutValidationSchema } = useFormValidation();
    const [isDone, setIsDone] = useState<boolean>(false);
    const { handleSubmit } = useCheckoutSubmit({ onDone: () => setIsDone(true) });
    const { text } = useText();

    const initialValues: ICheckoutForm = {
        name: profile?.data.name || "",
        phone_number: profile?.data.phone_number ? format(profile.data.phone_number, phoneMaskOptions) : "",
        email: "",
        company: "",
        message: "",
    };

    if (isDone) {
        return (
            <SectionWrapper>
                <div className="custom-block-with-padding flex-col items-start gap-4 max-w-[45rem]">
                    <h2 className="text-2xl font-bold">{text("Спасибо, заказ принят")}</h2>
                    <p className="text-secondary2">
                        {text(
                            "Менеджер LPS свяжется с вами по указанному телефону, уточнит наличие, сроки и стоимость доставки.",
                        )}
                    </p>
                    {storePhone && (
                        <p>
                            {text("Если хотите ускорить заказ, позвоните нам")}:{" "}
                            <a href={`tel:${storePhone}`} className="font-semibold text-main whitespace-nowrap">
                                {phoneFormatter(storePhone)}
                            </a>
                        </p>
                    )}
                    <Link href="/" className="main-btn">
                        {text("Перейти в каталог")}
                    </Link>
                </div>
            </SectionWrapper>
        );
    }

    return (
        <SectionWrapper>
            <Formik
                initialValues={initialValues}
                validationSchema={checkoutValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting }) => (
                    <Form className="cart-wrapper-grid">
                        <ScrollToFieldError />
                        <div className="flex flex-col gap-5">
                            <CheckoutForm isSubmitting={isSubmitting} />
                        </div>

                        <CheckoutSidebar isSubmitting={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </SectionWrapper>
    );
}

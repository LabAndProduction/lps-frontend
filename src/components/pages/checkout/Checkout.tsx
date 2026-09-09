"use client";

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

export default function Checkout({ profile }: { profile: IProfile }) {
    const { checkoutValidationSchema } = useFormValidation();
    const { handleSubmit } = useCheckoutSubmit();

    const { name, phone_number, email } = profile.data;
    const phoneValue = format(phone_number, phoneMaskOptions);

    const initialValues: ICheckoutForm = {
        name: name,
        // surname: "",
        phone_number: phoneValue,
        email: "",
        message: "",
    };

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

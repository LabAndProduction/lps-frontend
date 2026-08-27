"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { ScrollToFieldError } from "@/components/ui/ScrollToFieldError";
import { Form, Formik } from "formik";
import CheckoutForm from "./checkoutForm/CheckoutForm";
import { ICheckoutForm } from "@/types/form.types";
import useFormValidation from "@/hooks/useFormValidation";
import useCheckoutSubmit from "@/hooks/useCheckoutSubmit";
import CheckoutSidebar from "./checkoutSidebar/CheckoutSidebar";

const initialValues: ICheckoutForm = {
    name: "",
    surname: "",
    phone_number: "",
    email: "",
    message: "",
};

export default function Checkout() {
    const { checkoutValidationSchema } = useFormValidation();
    const { handleSubmit } = useCheckoutSubmit();

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

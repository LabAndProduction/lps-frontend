"use client";

import { sendFeedback } from "@/api/contactsApi";
import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { IContactsForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { Form, Formik } from "formik";

const initialValues: IContactsForm = {
    name: "",
    phone_number: "",
    message: "",
};

export default function ContactsForm() {
    const { contactsValidationSchema } = useFormValidation();
    const { text } = useText();
    const locale = useLocaleTS();

    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<IContactsForm>) => {
        const { name, phone_number, message } = values;
        try {
            const formattedPhone = formatPhone(phone_number);
            sendFeedback({
                body: { message, name, phone: formattedPhone },
                clientLocale: locale,
            }).then(() => {
                resetForm();
            });
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="custom-block flex-col gap-6 py-6 sm:px-6 px-4">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{text("Связатьcя с нами")}</h3>

                <p className="font-medium text-secondary2">
                    {text("Напишите нам. Мы будем рады получить ваше сообщение.")}
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={contactsValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting }) => (
                    <Form className="flex flex-col items-end gap-6">
                        <div className="flex flex-col gap-4 w-full">
                            <OverlapInput
                                id="contacts-name"
                                name="name"
                                placeholder={text("Ваше имя")}
                                disabled={isSubmitting}
                                className="input-white"
                            />
                            <OverlapInput
                                id="contacts-phone"
                                name="phone_number"
                                placeholder={text("Номер телефона")}
                                disabled={isSubmitting}
                                className="input-white"
                            />
                            <OverlapInput
                                id="contacts-message"
                                name="message"
                                inputClass="!min-h-[6.25rem]"
                                placeholder={text("Сообщение")}
                                disabled={isSubmitting}
                                className="input-white"
                            />
                        </div>
                        <button className="main-btn w-full" disabled={isSubmitting} type="submit">
                            {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                            {text("Отправить")}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

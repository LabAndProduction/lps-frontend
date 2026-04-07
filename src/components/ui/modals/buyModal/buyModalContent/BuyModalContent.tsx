import { sendFeedback } from "@/api/contactsApi";
import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { IBuyForm } from "@/types/form.types";
import { IBuyModalContentProps } from "@/types/props/ui.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { Form, Formik } from "formik";

const initialValues: IBuyForm = {
    name: "",
    phone_number: "",
    message: "",
};

export default function BuyModalContent({ closeModal, product }: IBuyModalContentProps) {
    const { text } = useText();
    const locale = useLocaleTS();
    const { contactsValidationSchema } = useFormValidation();
    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<IBuyForm>) => {
        const { name, phone_number, message } = values;
        try {
            const formattedPhone = formatPhone(phone_number);
            if (product.id) {
                sendFeedback({
                    clientLocale: locale,
                    body: {
                        message,
                        name,
                        phone: formattedPhone,
                        product_id: product.id,
                    },
                }).then(() => {
                    resetForm();
                    closeModal();
                });
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div className="custom-form-wrapper w-full">
            <h3 className="form-title">{text("Быстрый заказ")}</h3>

            <Formik
                initialValues={initialValues}
                validationSchema={contactsValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting }) => (
                    <Form className="custom-form">
                        <div className="inputs-wrapper">
                            <OverlapInput
                                id="buy-name"
                                name="name"
                                placeholder={text("Ваше имя")}
                                className="input-white"
                                disabled={isSubmitting}
                            />
                            <OverlapInput
                                id="buy-phone"
                                name="phone_number"
                                placeholder={text("Номер телефона")}
                                disabled={isSubmitting}
                                className="input-white"
                            />

                            <OverlapInput
                                id="buy-message"
                                name="message"
                                className="input-white"
                                inputClass="!min-h-[6.25rem]"
                                placeholder={text("Сообщение")}
                                disabled={isSubmitting}
                            />
                        </div>
                        <button className="submit-btn" disabled={isSubmitting} type="submit">
                            {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                            {text("Оформить")}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

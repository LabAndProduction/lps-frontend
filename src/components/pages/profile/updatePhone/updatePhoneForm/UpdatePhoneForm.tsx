"use client";

import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import OtpModal from "@/components/ui/modals/otpModal/OtpModal";
import { useText } from "@/context/text.context";
import { IUpdatePhoneForm } from "@/types/form.types";
import { IUpdatePhoneFormProps } from "@/types/props/pages.types";
import { Form } from "formik";

export default function UpdatePhoneForm({
    fulfillAfterOtp,
    isOtpModalOpen,
    setIsOtpModalOpen,
    values,
    isSubmitting,
    resetForm,
}: IUpdatePhoneFormProps) {
    const { text } = useText();
    return (
        <>
            <Form className="custom-form">
                <div className="inputs-wrapper">
                    <OverlapInput
                        disabled={isSubmitting}
                        name="phone_number"
                        id="update-phone"
                        placeholder={text("Номер телефона")}
                        className="input-white"
                    />
                </div>

                <button disabled={isSubmitting} type="submit" className="submit-btn">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                    {text("Изменить")}
                </button>
            </Form>
            <OtpModal<IUpdatePhoneForm>
                setIsOpen={setIsOtpModalOpen}
                isOpen={isOtpModalOpen}
                formPhone={values.phone_number}
                fulfillAfterOtp={fulfillAfterOtp}
                otpTarget="verification"
                resetForm={resetForm}
            />
        </>
    );
}

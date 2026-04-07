import { loginCheck, resetPassword, sendOtp } from "@/api/authApi";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { IResetPasswordForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import OtpModal from "../../../otpModal/OtpModal";
import ResetPasswordForm from "./ResetPasswordForm";
import { IResetPasswordProps } from "@/types/props/ui.types";

const initialValues: IResetPasswordForm = {
    phone_number: "",
    confirm_password: "",
    new_password: "",
};

export default function ResetPassword({ setAuthTab }: IResetPasswordProps) {
    const { resetPasswordValidationSchema } = useFormValidation();
    const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);
    const [otpData, setOtpData] = useState<IResetPasswordForm>();
    const { refresh } = useRouter();
    const { text } = useText();
    const locale = useLocaleTS();
    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<IResetPasswordForm>) => {
        const { phone_number } = values;
        const formattedPhone = formatPhone(phone_number);
        try {
            loginCheck({ clientLocale: locale, body: { phone_number: formattedPhone } }).then(
                (res: { user_exists: boolean }) => {
                    if (!res.user_exists) {
                        resetForm();
                        toast.error(text("Такого аккаунта не существует"));

                        return;
                    } else {
                        sendOtp({
                            clientLocale: locale,
                            body: {
                                phone_number: formattedPhone,
                                target: "reset_password",
                            },
                        }).then(() => {
                            setIsOtpModalOpen(true);
                            setOtpData(values);
                        });
                    }
                },
            );
        } catch (err) {
            throw err;
        }
    };

    const fulfillAfterOtp = ({ otp }: { otp: string }) => {
        if (otpData) {
            try {
                const { phone_number, new_password } = otpData;
                const formattedPhone = formatPhone(phone_number);
                resetPassword({
                    clientLocale: locale,
                    body: {
                        new_password,
                        phone_number: formattedPhone,
                        otp: Number(otp),
                    },
                }).then(() => {
                    refresh();
                    setIsOtpModalOpen(false);
                    setAuthTab("login");
                });
            } catch (err) {
                throw err;
            }
        }
    };

    return (
        <div className="custom-form-wrapper">
            <h3 className="form-title">{text("Забыли пароль?")}</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting, values, resetForm }) => (
                    <>
                        <ResetPasswordForm isSubmitting={isSubmitting} setAuthTab={setAuthTab} />

                        <OtpModal<IResetPasswordForm>
                            isOpen={isOtpModalOpen}
                            setIsOpen={setIsOtpModalOpen}
                            formPhone={values.phone_number}
                            fulfillAfterOtp={fulfillAfterOtp}
                            otpTarget="reset_password"
                            resetForm={resetForm}
                        />
                    </>
                )}
            </Formik>
        </div>
    );
}

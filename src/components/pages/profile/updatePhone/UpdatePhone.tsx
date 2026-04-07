"use client";

import { Formik, FormikProps } from "formik";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { updatePhone } from "@/api/profileApi";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import { ISubmitFormFuncParams } from "@/types/types";
import { loginCheck, sendOtp } from "@/api/authApi";
import { formatPhone } from "@/utils/formatPhone";
import { IUpdatePhoneForm } from "@/types/form.types";
import UpdatePhoneForm from "./updatePhoneForm/UpdatePhoneForm";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { IUpdatePhoneProps } from "@/types/props/pages.types";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import ProfileFormWrapper from "../ProfileFormWrapper";
import { format } from "@react-input/mask";
import { phoneMaskOptions } from "@/components/ui/OverlapInput";

export default function UpdatePhone({ profile }: IUpdatePhoneProps) {
    const phoneValue = format(profile.data.phone_number.slice(3), phoneMaskOptions);
    const initialValues: IUpdatePhoneForm = {
        phone_number: phoneValue,
    };
    const locale = useLocaleTS();
    const { refresh } = useRouter();
    const [otpData, setOtpData] = useState<IUpdatePhoneForm>();
    const cookies = useCookies();
    const token = cookies.get("token");

    const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);
    const { text } = useText();
    const { updatePhoneValidationSchema } = useFormValidation();
    const handleSubmit = ({ values, resetForm, setSubmitting }: ISubmitFormFuncParams<IUpdatePhoneForm>) => {
        const { phone_number } = values;
        const formattedPhone = formatPhone(phone_number);

        try {
            loginCheck({ clientLocale: locale, body: { phone_number: formattedPhone } }).then((data) => {
                if (data.user_exists == true) {
                    toast.error(text("Пользователь с таким номером уже существует!"));
                    resetForm();
                    return;
                } else {
                    sendOtp({
                        clientLocale: locale,
                        body: {
                            phone_number: formattedPhone,
                            target: "verification",
                        },
                    }).then(() => {
                        setIsOtpModalOpen(true);
                        setOtpData(values);
                        if (setSubmitting) setSubmitting(false);
                    });
                }
            });
        } catch (err) {
            throw err;
        }
    };

    const fulfillAfterOtp = ({ otp }: { otp: string }) => {
        if (otpData) {
            try {
                const { phone_number } = otpData;

                if (isOtpModalOpen) {
                    updatePhone({
                        body: {
                            otp: Number(otp),
                            phone_number: formatPhone(phone_number),
                        },
                        token,
                        clientLocale: locale,
                    }).then(() => {
                        setIsOtpModalOpen(false);
                        refresh();
                    });
                } else {
                    return;
                }
            } catch (err) {
                throw err;
            }
        }
    };

    return (
        <ProfileFormWrapper
            // text(")
            title={"Изменить номер телефона"}
            content={
                <Formik
                    initialValues={initialValues}
                    validationSchema={updatePhoneValidationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) =>
                        handleSubmit({ values, resetForm, setSubmitting })
                    }>
                    {({ values, isSubmitting, resetForm }: FormikProps<IUpdatePhoneForm>) => (
                        <UpdatePhoneForm
                            fulfillAfterOtp={fulfillAfterOtp}
                            isOtpModalOpen={isOtpModalOpen}
                            setIsOtpModalOpen={setIsOtpModalOpen}
                            values={values}
                            resetForm={resetForm}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </Formik>
            }
        />
    );
}

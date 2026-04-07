"use client";

import { updatePassword } from "@/api/profileApi";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { IUpdatePasswordForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { Formik } from "formik";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import UpdatePasswordForm from "./UpdatePasswordForm";
import ProfileFormWrapper from "../ProfileFormWrapper";

const initialValues: IUpdatePasswordForm = {
    password: "",
    new_password: "",
    confirm_password: "",
};

export default function UpdatePassword() {
    const { refresh } = useRouter();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { updatePasswordValidationSchema } = useFormValidation();
    const { text } = useText();
    const locale = useLocaleTS();
    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<IUpdatePasswordForm>) => {
        const { new_password, password } = values;
        try {
            updatePassword({
                body: {
                    current_password: password,
                    new_password,
                },
                token: token,
                clientLocale: locale,
            }).then(() => {
                toast.success(text("Пароль успешно изменен"));
                refresh();
                resetForm();
            });
        } catch (err) {
            throw err;
        }
    };
    return (
        <ProfileFormWrapper
            title={text("Изменение пароля")}
            content={
                <Formik
                    initialValues={initialValues}
                    validationSchema={updatePasswordValidationSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                    {({ isSubmitting }) => <UpdatePasswordForm isSubmitting={isSubmitting} />}
                </Formik>
            }
        />
    );
}

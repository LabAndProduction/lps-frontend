"use client";

import OverlapInput from "@/components/ui/OverlapInput";
import { Form, Formik } from "formik";
import { useRouter } from "@/i18n/routing";
import { updateProfile } from "@/api/profileApi";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";
import { ISubmitFormFuncParams } from "@/types/types";
import OvalSpinner from "@/components/ui/OvalSpinner";
import { IUpdateProfileForm } from "@/types/form.types";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { IUpdateProfileProps } from "@/types/props/pages.types";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import ProfileFormWrapper from "../ProfileFormWrapper";

export default function UpdateProfile({ profile }: IUpdateProfileProps) {
    const { refresh } = useRouter();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { text } = useText();
    const locale = useLocaleTS();
    const { updateProfileValidationSchema } = useFormValidation();
    const initialValues: IUpdateProfileForm = {
        name: profile.data.name,
    };

    const handleSubmit = ({ values, setSubmitting }: ISubmitFormFuncParams<IUpdateProfileForm>) => {
        const { name } = values;
        try {
            updateProfile({
                body: { name },
                token: token,
                clientLocale: locale,
            }).then(() => {
                toast.success(text("Информация профиля изменена!"));
                refresh();
                if (setSubmitting) setSubmitting(false);
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
                    validationSchema={updateProfileValidationSchema}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                        handleSubmit({ values, setSubmitting, resetForm });
                    }}>
                    {({ isSubmitting }) => (
                        <Form className="custom-form">
                            <div className="inputs-wrapper">
                                <OverlapInput
                                    disabled={isSubmitting}
                                    name="name"
                                    id="update-name"
                                    placeholder={text("Имя и Фамилия")}
                                    className="input-white"
                                />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="submit-btn">
                                {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                                {text("Изменить")}
                            </button>
                        </Form>
                    )}
                </Formik>
            }
        />
    );
}

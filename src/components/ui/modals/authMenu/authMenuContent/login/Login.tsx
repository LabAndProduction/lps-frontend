import { login } from "@/api/authApi";
import { useText } from "@/context/text.context";
import useFormValidation from "@/hooks/useFormValidation";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import { useRouter } from "@/i18n/routing";
import { ILoginForm } from "@/types/form.types";
import { ISubmitFormFuncParams } from "@/types/types";
import { formatPhone } from "@/utils/formatPhone";
import { Formik } from "formik";
import LoginForm from "./LoginForm";
import { ILoginProps } from "@/types/props/ui.types";

const initialValues: ILoginForm = {
    phone_number: "",
    password: "",
};

export default function Login({ setAuthTab, closeModal }: ILoginProps) {
    const { push, refresh } = useRouter();
    const { loginValidationSchema } = useFormValidation();
    const { text } = useText();
    const locale = useLocaleTS();
    const handleSubmit = ({ values, resetForm }: ISubmitFormFuncParams<ILoginForm>) => {
        const { password, phone_number } = values;
        const formattedPhone = formatPhone(phone_number);

        try {
            login({
                body: { password, phone_number: formattedPhone },
                clientLocale: locale,
            }).then((data) => {
                if (data) {
                    push("/");
                    refresh();
                    closeModal();
                } else resetForm();
            });
        } catch (err) {
            throw err;
        }
    };
    return (
        <div className="custom-form-wrapper">
            <h3 className="form-title">{text("Войти")}</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { resetForm }) => handleSubmit({ values, resetForm })}>
                {({ isSubmitting }) => <LoginForm isSubmitting={isSubmitting} setAuthTab={setAuthTab} />}
            </Formik>
        </div>
    );
}

import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import { IRegisterFormProps } from "@/types/props/ui.types";
import { Form } from "formik";

export default function RegisterForm({ isSubmitting, setAuthTab }: IRegisterFormProps) {
    const { text } = useText();
    return (
        <Form className="custom-form">
            <fieldset className="inputs-wrapper">
                <OverlapInput
                    disabled={isSubmitting}
                    id="register-name"
                    name="name"
                    placeholder={text("Имя и Фамилия")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="register-phone"
                    name="phone_number"
                    placeholder={text("Номер телефона")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="register-password"
                    name="password"
                    placeholder={text("Пароль")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="register-psw-conf-psw"
                    name="confirm_password"
                    placeholder={text("Подтвердите пароль")}
                    className="input-white"
                />
            </fieldset>
            <div className="btns-wrapper">
                <button disabled={isSubmitting} className="submit-btn">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                    {text("Зарегистрироваться")}
                </button>

                <div className="link-wrapper">
                    {text("Уже есть аккаунт?")}
                    <button type="button" className="link" onClick={() => setAuthTab("login")}>
                        {text("Войти")}
                    </button>
                </div>
            </div>
        </Form>
    );
}

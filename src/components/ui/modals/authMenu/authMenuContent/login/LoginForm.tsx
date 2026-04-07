import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import { ILoginFormProps } from "@/types/props/ui.types";
import { Form } from "formik";

export default function LoginForm({ isSubmitting, setAuthTab }: ILoginFormProps) {
    const { text } = useText();

    return (
        <Form className="custom-form">
            <fieldset className="inputs-wrapper">
                <OverlapInput
                    disabled={isSubmitting}
                    id="login-phone"
                    name="phone_number"
                    placeholder={text("Номер телефона")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="login-password"
                    name="password"
                    placeholder={text("Пароль")}
                    className="input-white"
                />
            </fieldset>
            <div className="btns-wrapper">
                <button type="button" onClick={() => setAuthTab("reset-password")} className="link">
                    {text("Забыли пароль?")}
                </button>

                <button disabled={isSubmitting} className="submit-btn" type="submit">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                    {text("Войти")}
                </button>

                <div className="link-wrapper">
                    {text("Нет аккаунта?")}
                    <button type="button" className="link" onClick={() => setAuthTab("register")}>
                        {text("Зарегистрироваться")}
                    </button>
                </div>
            </div>
        </Form>
    );
}

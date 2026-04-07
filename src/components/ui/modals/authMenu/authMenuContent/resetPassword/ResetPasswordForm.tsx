import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import { IResetPasswordFormProps } from "@/types/props/ui.types";
import { Form } from "formik";

export default function ResetPasswordForm({ isSubmitting, setAuthTab }: IResetPasswordFormProps) {
    const { text } = useText();
    return (
        <Form className="custom-form">
            <fieldset className="inputs-wrapper">
                <OverlapInput
                    disabled={isSubmitting}
                    id="reset-psw-phone"
                    name="phone_number"
                    placeholder={text("Номер телефона")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="reset-psw-new-psw"
                    name="new_password"
                    placeholder={text("Новый пароль")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    id="reset-psw-conf-psw"
                    name="confirm_password"
                    placeholder={text("Подтвердите пароль")}
                    className="input-white"
                />
            </fieldset>
            <div className="btns-wrapper">
                <div className="link-wrapper">
                    {text("Нет аккаунта?")}
                    <button type="button" className="link" onClick={() => setAuthTab("register")}>
                        {text("Зарегистрироваться")}
                    </button>
                </div>

                <button disabled={isSubmitting} className="submit-btn" type="submit">
                    {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                    {text("Сбросить пароль")}
                </button>
            </div>
        </Form>
    );
}

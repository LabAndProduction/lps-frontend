import OvalSpinner from "@/components/ui/OvalSpinner";
import OverlapInput from "@/components/ui/OverlapInput";
import { useText } from "@/context/text.context";
import { IUpdatePasswordFormProps } from "@/types/props/pages.types";
import { Form } from "formik";

export default function UpdatePasswordForm({ isSubmitting }: IUpdatePasswordFormProps) {
    const { text } = useText();

    return (
        <Form className="custom-form">
            <div className="inputs-wrapper">
                <OverlapInput
                    disabled={isSubmitting}
                    name="password"
                    id="update-password"
                    placeholder={text("Старый пароль")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    name="new_password"
                    id="update-password-new"
                    placeholder={text("Новый пароль")}
                    className="input-white"
                />
                <OverlapInput
                    disabled={isSubmitting}
                    name="confirm_password"
                    id="update-password-confirm"
                    placeholder={text("Подтвердите пароль")}
                    className="input-white"
                />
            </div>

            <button disabled={isSubmitting} type="submit" className="submit-btn">
                {isSubmitting && <OvalSpinner size={16} color="var(--color-white)" />}
                {text("Изменить пароль")}
            </button>
        </Form>
    );
}

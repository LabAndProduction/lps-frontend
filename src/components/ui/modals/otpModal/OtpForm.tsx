import { sendOtp } from "@/api/authApi";
import VerificationInput from "react-verification-input";
import { formatPhone } from "@/utils/formatPhone";
import { useText } from "@/context/text.context";
import { IOtpFormProps } from "@/types/props/ui.types";
import { useLocaleTS } from "@/hooks/useLocaleTS";

export default function OtpForm({ handleSubmit, otp, setOtp, formPhone, otpTarget }: IOtpFormProps) {
    const { text } = useText();
    const locale = useLocaleTS();
    return (
        <form onSubmit={handleSubmit} className="custom-form items-center">
            <VerificationInput
                autoFocus={true}
                validChars="0-9"
                value={otp}
                onChange={(value) => setOtp(value)}
                classNames={{
                    characterSelected: "text-primary outline-main",
                    character: "text-primary rounded-[0.25rem]",
                    characterInactive: "bg-gray4 text-primary",
                }}
            />
            <div className="btns-wrapper">
                <div className="link-wrapper">
                    <span>{text("Ошибка?")} </span>
                    <button
                        onClick={() => {
                            sendOtp({
                                clientLocale: locale,
                                body: {
                                    phone_number: formatPhone(formPhone),
                                    target: otpTarget,
                                },
                            });
                        }}
                        type="button"
                        className="link">
                        {text("Отправить снова")}
                    </button>
                </div>
                <button className="submit-btn" type="submit">
                    {text("Отправить")}
                </button>
            </div>
        </form>
    );
}

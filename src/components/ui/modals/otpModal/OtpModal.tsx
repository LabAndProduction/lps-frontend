"use client";

import { FormEventHandler } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { otpCheck } from "@/api/authApi";
import OtpForm from "./OtpForm";
import { formatPhone } from "@/utils/formatPhone";
import { useText } from "@/context/text.context";
import { IOtpModalProps } from "@/types/props/ui.types";
import { useLocaleTS } from "@/hooks/useLocaleTS";
import Icon from "../../Icon";
import { formatPhoneWithSpaces } from "@/utils/formatPhoneWithSpaces";

function OtpModal<T>({ isOpen, formPhone, fulfillAfterOtp, setIsOpen, otpTarget, resetForm }: IOtpModalProps<T>) {
    const locale = useLocaleTS();
    const [otp, setOtp] = useState<string>("");
    const { text } = useText();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        const formattedPhone = formatPhone(formPhone);
        try {
            e.preventDefault();
            if (!/^998\d{9}/.test(formattedPhone)) {
                toast.error(text("Неправильный формат номера телефона"));
                return;
            }
            if (!isOpen) return;

            otpCheck({
                clientLocale: locale,
                body: {
                    otp: Number(otp),
                    phone_number: formattedPhone,
                    target: otpTarget,
                },
            }).then(() => {
                fulfillAfterOtp({ otp });
            });
        } catch (err) {
            throw err;
        }
    };

    return (
        <Dialog
            onClose={() => {
                resetForm();
                setIsOpen(false);
            }}
            open={isOpen}
            className="fixed inset-0 flex-center w-screen z-[99]">
            <DialogBackdrop className="fixed inset-0 bg-black opacity-50" />

            <DialogPanel
                transition
                className={`custom-block relative shadow-lg min-h-[16.25rem] max-h-[37.5rem] w-[30rem] z-[1] transition-300 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0 lg:!py-8 lg:!px-8 sm:!px-6 !py-6 !px-4 overflow-y-auto custom-form-wrapper text-center`}>
                <button
                    onClick={() => setIsOpen(false)}
                    type="button"
                    className="absolute size-8 flex-center hover:opacity-60 lg:top-6 top-4 lg:right-6 right-4">
                    <Icon name="x" className="text-primary size-6" />
                </button>

                <h3 className="form-title text-center">{text("Введите код")}</h3>

                <p className="font-medium leading-120 text-center mx-auto max-w-[18.75rem]">
                    {text("Код подтверждения отправлен на {number}").replace("{number}", "")}
                    <span className="text-main">{formPhone}</span>
                </p>
                <OtpForm
                    handleSubmit={handleSubmit}
                    formPhone={formPhone}
                    otp={otp}
                    setOtp={setOtp}
                    otpTarget={otpTarget}
                />
            </DialogPanel>
        </Dialog>
    );
}

export default OtpModal;

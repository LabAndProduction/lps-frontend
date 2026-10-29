import { useText } from "@/context/text.context";
import { formatPhone } from "@/utils/formatPhone";
import * as Yup from "yup";

export default function useFormValidation() {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 25;

    const { text } = useText();

    const requiredText = text("Поле обязательно для заполнения");
    const requiredRadioText = text("Выберите вариант");
    const emailText = text("Неправильный формат электронной почты");
    const isPhoneText = text("Неправильный формат номера телефона");
    const passwordMatchText = text("Пароли должны совпадать друг с другом");
    const maxLength50000Text = text("Нужно ввести не более :number символов").replace(":number", "50000");
    const maxLength25Text = text("Нужно ввести не более :number символов").replace(":number", "25");

    const minLengthText = (quantity: number) =>
        text("Нужно ввести минимум :number символа").replace(":number", quantity.toString());

    const nameValidation = Yup.string()
        .required(requiredText)
        .min(MIN_LENGTH, minLengthText(MIN_LENGTH))
        .max(MAX_LENGTH, maxLength25Text);
    const surnameValidation = Yup.string().min(MIN_LENGTH, minLengthText(MIN_LENGTH)).max(MAX_LENGTH, maxLength25Text);

    const addressValidation = Yup.string()
        .required(requiredText)
        .min(MIN_LENGTH, minLengthText(MIN_LENGTH))
        .max(50000, maxLength50000Text);

    const messageValidation = Yup.string()
        .required(requiredText)
        .min(MIN_LENGTH, minLengthText(MIN_LENGTH))
        .max(50000, maxLength50000Text);
    const messageNotRequiredValidation = Yup.string()
        .min(MIN_LENGTH, minLengthText(MIN_LENGTH))
        .max(50000, maxLength50000Text);

    const phoneValidation = Yup.string()
        .required(requiredText)
        .transform((value) => formatPhone(value))
        .matches(/^998\d{9}$/, isPhoneText);

    const passwordValidation = Yup.string()
        .required(requiredText)
        .min(8, minLengthText(8))
        .max(MAX_LENGTH, maxLength25Text);

    const registerConfirmPasswordValidation = Yup.string()
        .required(requiredText)
        .min(8, minLengthText(8))
        .max(MAX_LENGTH, maxLength25Text)
        .oneOf([Yup.ref("password")], passwordMatchText);

    const confirmPasswordValidation = Yup.string()
        .required(requiredText)
        .min(8, minLengthText(8))
        .max(MAX_LENGTH, maxLength25Text)
        .oneOf([Yup.ref("new_password")], passwordMatchText);

    const emailValidation = Yup.string().required(requiredText).email(emailText);
    const emailNotRequiredValidation = Yup.string().email(emailText);

    const ratingValidation = Yup.number()
        .required()
        .min(1, text("Поставьте рейтинг"))
        .max(5, text("Максимальный рейтинг :number").replace(":number", "5"));

    const paymentMethodRadioValidation = Yup.string().required(requiredRadioText);

    const installmentNameRadioValidation = Yup.string().when("payment_method", ([payment_method], schema) => {
        if (payment_method === "installment") {
            return schema.required(requiredRadioText);
        }
        return schema;
    });
    const installmentDurationRadioValidation = Yup.number().when("payment_method", ([payment_method], schema) => {
        if (payment_method === "installment") {
            return schema.required(requiredRadioText);
        }
        return schema;
    });

    const checkoutValidationSchema = Yup.object({
        name: nameValidation,
        // surname: surnameValidation,
        phone_number: phoneValidation,
        email: emailNotRequiredValidation,
        company: Yup.string().max(100, text("Нужно ввести не более :number символов").replace(":number", "100")),
        message: messageNotRequiredValidation,

        // payment_method: paymentMethodRadioValidation,

        // installment: installmentNameRadioValidation,
        // installment_name: installmentNameRadioValidation,
        // installment_duration: installmentDurationRadioValidation,
    });

    const registerValidationSchema = Yup.object({
        name: nameValidation,
        phone_number: phoneValidation,
        password: passwordValidation,
        confirm_password: registerConfirmPasswordValidation,
    });
    const loginValidationSchema = Yup.object({
        phone_number: phoneValidation,
        password: passwordValidation,
    });
    const resetPasswordValidationSchema = Yup.object({
        phone_number: phoneValidation,
        new_password: passwordValidation,
        confirm_password: confirmPasswordValidation,
    });
    const updatePasswordValidationSchema = Yup.object({
        password: passwordValidation,
        new_password: passwordValidation,
        confirm_password: confirmPasswordValidation,
    });
    const updateProfileValidationSchema = Yup.object({
        name: nameValidation,
    });
    const updatePhoneValidationSchema = Yup.object({
        phone_number: phoneValidation,
    });
    const contactsValidationSchema = Yup.object({
        name: nameValidation,
        phone_number: phoneValidation,
        message: messageValidation,
    });
    const buyCashValidationSchema = Yup.object({
        name: nameValidation,
        phone_number: phoneValidation,
    });
    const buyInstallmentValidationSchema = Yup.object({
        name: nameValidation,
        phone_number: phoneValidation,
        installment: installmentNameRadioValidation,
        installment_duration: installmentDurationRadioValidation,
    });
    const reviewsValidationSchema = Yup.object({
        name: nameValidation,
        email: emailValidation,
        message: messageValidation,
        rating: ratingValidation,
    });
    const addressValidationSchema = Yup.object({
        address: addressValidation,
    });

    return {
        checkoutValidationSchema,
        registerValidationSchema,
        loginValidationSchema,
        resetPasswordValidationSchema,
        updatePasswordValidationSchema,
        updateProfileValidationSchema,
        updatePhoneValidationSchema,
        contactsValidationSchema,
        addressValidationSchema,
        reviewsValidationSchema,
        buyCashValidationSchema,
        buyInstallmentValidationSchema,
    };
}

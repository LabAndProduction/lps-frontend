import { useFormikContext } from "formik";
import { useEffect } from "react";

export const ScrollToFieldError = () => {
    const { submitCount, isValid, errors, isSubmitting } = useFormikContext();

    useEffect(() => {
        if (isValid) return;
        if (isSubmitting) {
            const errorsNames = Object.keys(errors).map((key) => {
                return key;
            });

            if (errorsNames.length <= 0) return;

            const element = document.querySelector(`input[name='${errorsNames[0]}']`);
            if (!element) return;

            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [submitCount, errors, isValid, isSubmitting]);

    return null;
};

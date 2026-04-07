import { useCart } from "@/context/cart.context";
import { ICheckoutForm } from "@/types/form.types";
import { IPaymentMethodInputProps } from "@/types/props/pages.types";
import classNames from "classnames";
import { Field, useFormikContext } from "formik";

export default function PaymentMethodInput({ methodValue, title, ...fieldProps }: IPaymentMethodInputProps) {
    const { values, isSubmitting } = useFormikContext<ICheckoutForm>();
    const { isCartEmpty } = useCart();

    return (
        <label
            className={classNames(
                "text-sm leading-120 flex items-center gap-4 p-4 border border-transparent rounded-btn bg-gray hover:border-main transition-300",
                values.payment_method == methodValue ? "!border-main bg-transparent" : "",
            )}>
            <span
                className={classNames(
                    `relative size-5 border border-main rounded-full after:block after:size-3 after:rounded-full after:absolute-center`,
                    values.payment_method == methodValue ? "after:bg-main" : "",
                )}></span>
            <Field
                type="radio"
                name="payment_method"
                value={methodValue}
                className="appearance-none hidden"
                disabled={isSubmitting || isCartEmpty}
                {...fieldProps}
            />

            {title}
        </label>
    );
}

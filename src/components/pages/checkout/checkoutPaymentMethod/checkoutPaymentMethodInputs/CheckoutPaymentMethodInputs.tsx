import { useText } from "@/context/text.context";
import { ErrorMessage } from "formik";
import PaymentMethodInput from "./PaymentMethodInput";

export default function CheckoutPaymentMethodInputs() {
    const { text } = useText();

    return (
        <div>
            <div className="flex flex-col gap-4">
                <PaymentMethodInput title={text("Карта или наличные")} methodValue={"cash&card"} />
                <PaymentMethodInput title={text("Рассрочка")} methodValue={"installment"} />
            </div>
            <ErrorMessage name="payment_method">{(msg) => <p className="pl-1 text-xs text-red">{msg}</p>}</ErrorMessage>
        </div>
    );
}

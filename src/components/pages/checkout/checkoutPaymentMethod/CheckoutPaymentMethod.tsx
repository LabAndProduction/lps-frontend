import { useText } from "@/context/text.context";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFormikContext } from "formik";
import { usePathname, useRouter } from "@/i18n/routing";
import { ICheckoutForm } from "@/types/form.types";
import { ICheckoutPaymentMethodProps } from "@/types/props/pages.types";
import CheckoutPaymentMethodInputs from "./checkoutPaymentMethodInputs/CheckoutPaymentMethodInputs";

export default function CheckoutPaymentMethod<Form>({ apiInstallments }: ICheckoutPaymentMethodProps<Form>) {
    const { text } = useText();

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const instlallmentParams = params.get("installment");
    const durationParams = params.get("duration");
    const { setFieldValue } = useFormikContext<ICheckoutForm>();
    const { replace } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (instlallmentParams && instlallmentParams?.length > 0 && durationParams && Number(durationParams)) {
            setFieldValue("payment_method", "installment");

            setFieldValue("installment_duration", Number(durationParams));
            const currentInstl = apiInstallments.data.find((instl) => instl.code == instlallmentParams);
            if (currentInstl) {
                setFieldValue("installment_name", currentInstl.name);
                setFieldValue("installment", currentInstl.code);
            }
            params.delete("installment");
            params.delete("duration");
            replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, []);

    return (
        <div className="custom-block-with-padding flex-col gap-5">
            <h4 className="text-lg leading-120 font-bold">{text("Способ оплаты")}</h4>

            <CheckoutPaymentMethodInputs />
        </div>
    );
}

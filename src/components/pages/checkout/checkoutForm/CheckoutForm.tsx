import OverlapInput from "@/components/ui/OverlapInput";
import { useCart } from "@/context/cart.context";
import { useText } from "@/context/text.context";
import { ICheckoutFormProps } from "@/types/props/pages.types";

export default function CheckoutForm({ isSubmitting }: ICheckoutFormProps) {
    const { text } = useText();
    const { isCartEmpty } = useCart();

    return (
        <div className="custom-block-with-padding flex-col gap-5">
            <h4 className="text-lg leading-120 font-bold">{text("Личные данные")}</h4>
            <div className="flex flex-col gap-3">
                {/* <fieldset className="grid lg:grid-cols-2 gap-4 w-full"> */}
                <OverlapInput
                    id="checkout-name"
                    name="name"
                    // placeholder={text("Ваше имя")}
                    placeholder={text("Имя и фамилия")}
                    disabled={isSubmitting || isCartEmpty}
                    className="input-white"
                />
                {/* <OverlapInput
                        id="checkout-surname"
                        name="surname"
                        placeholder={text("Фамилия")}
                        disabled={isSubmitting || isCartEmpty}
                        className="input-white"
                    /> */}
                {/* </fieldset> */}
                <fieldset className="grid lg:grid-cols-2 gap-4 w-full">
                    <OverlapInput
                        id="checkout-phone"
                        name="phone_number"
                        placeholder={text("Номер телефона")}
                        disabled={isSubmitting || isCartEmpty}
                        className="input-white"
                    />
                    <OverlapInput
                        id="checkout-email"
                        name="email"
                        placeholder={text("E-mail")}
                        disabled={isSubmitting || isCartEmpty}
                        className="input-white"
                    />
                </fieldset>
                <OverlapInput
                    id="checkout-message"
                    name="message"
                    placeholder={text("Сообщение")}
                    disabled={isSubmitting || isCartEmpty}
                    inputClass="!min-h-[7.5rem]"
                    className="input-white"
                />
            </div>
        </div>
    );
}

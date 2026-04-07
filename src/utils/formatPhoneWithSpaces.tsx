import { formatPhone } from "./formatPhone";
import { numberWithSpaces } from "./numberWithSpaces";

export const formatPhoneWithSpaces = (phone: string) => {
    return numberWithSpaces(`+${formatPhone(phone)}`, "#### ## ### ## ##");
};

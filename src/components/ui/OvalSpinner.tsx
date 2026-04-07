import { IOvalSpinnerProps } from "@/types/props/ui.types";
import ClipLoader from "react-spinners/ClipLoader";
export default function OvalSpinner({ size, color = "var(--main)" }: IOvalSpinnerProps) {
    return <ClipLoader color={color} loading={true} size={size} aria-label="Loading Spinner" data-testid="loader" />;
}

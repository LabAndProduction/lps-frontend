import { IIconProps } from "@/types/props/ui.types";
import classNames from "classnames";

export default function Icon({ name, className = "", ...otherProps }: IIconProps) {
    return (
        <svg
            focusable="false"
            aria-hidden="true"
            className={classNames(`block transition-300 size-4`, className)}
            {...otherProps}>
            <use xlinkHref={`/sprites.svg#${name}`} />
        </svg>
    );
}

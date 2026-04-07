import { ICheckboxProps } from "@/types/props/ui.types";
import classNames from "classnames";

export default function Checkbox({ label, handleChecked, isChecked, isDisabled = false, inputClass }: ICheckboxProps) {
    return (
        <label
            className={classNames(
                `group flex items-center gap-3 text-sm transition-300`,
                isDisabled ? "pointer-events-none" : "cursor-pointer hover:text-main",
            )}>
            <input
                disabled={isDisabled}
                type="checkbox"
                className={classNames(
                    "min-w-6 min-h-6 size-6 rounded-[0.25rem] appearance-none border border-gray4 group-hover:border-main relative outline-none focus-visible:border-main checked:border-main checked:bg-main checked:after:absolute checked:after:block checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:size-3 after:z-[1] checked:after:bg-[url(/images/check.svg)] after:bg-no-repeat after:bg-center after:cursor-pointer cursor-pointer after:bg-contain transition-300 disabled:pointer-events-none disabled:checked:border-secondary disabled:checked:bg-secondary disabled:group-hover:border-secondary disabled:cursor-auto peer",
                    inputClass,
                )}
                checked={isChecked}
                onChange={() => handleChecked()}
            />
            <span className="peer-disabled:text-secondary">{label}</span>
        </label>
    );
}

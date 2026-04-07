import { IPaginationNumbersProps } from "@/types/props/ui.types";
import classNames from "classnames";

export default function PaginationNumbers({ handleClick, meta, visibleNumbers }: IPaginationNumbersProps) {
    const numberCommonClassaname =
        "font-medium md:size-10 size-8 leading-150 sm:text-base text-sm text-center text-secondary2 rounded-main border hover:border-main border-white bg-white disabled:pointer-events-none";
    const activeNumberClassname = "!bg-main !text-white !border-main hover:!text-white";
    return (
        <div className="flex items-center gap-2">
            {!visibleNumbers.includes(1) && (
                <button
                    disabled={meta.current_page === 1}
                    className={classNames(numberCommonClassaname, meta.current_page === 1 && activeNumberClassname)}
                    onClick={() => handleClick({ page: 1 })}>
                    1
                </button>
            )}
            {meta.last_page > 4 && meta.current_page >= 4 && (
                <span className="size-7 select-none relative flex-center text-sm font-medium text-primary">...</span>
            )}

            {Array.from(Array(meta.last_page), (_, x) => x + 1).map((el) => {
                if (visibleNumbers.includes(el)) {
                    return (
                        <button
                            key={el}
                            disabled={el == meta.current_page}
                            className={classNames(
                                numberCommonClassaname,
                                el === meta.current_page ? activeNumberClassname : "",
                            )}
                            onClick={() => handleClick({ page: el })}>
                            {el}
                        </button>
                    );
                }
            })}

            {meta.last_page > 4 && meta.current_page <= meta.last_page - 3 && (
                <span className="size-7 text-center select-none relative flex-center text-sm font-medium text-primary">
                    ...
                </span>
            )}

            {!visibleNumbers.includes(meta.last_page) && (
                <button
                    disabled={meta.current_page == meta.last_page}
                    className={classNames(
                        numberCommonClassaname,
                        meta.current_page === meta.last_page && activeNumberClassname,
                    )}
                    onClick={() => handleClick({ page: meta.last_page })}>
                    {meta.last_page}
                </button>
            )}
        </div>
    );
}

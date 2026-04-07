import classNames from "classnames";
import Icon from "../Icon";
import { IPaginationButtonProps } from "@/types/props/ui.types";

export default function PaginationButton({ handleClick, meta, type }: IPaginationButtonProps) {
    return (
        <button
            type="button"
            disabled={type == "prev" ? meta.current_page == 1 : meta.current_page == meta.last_page}
            onClick={() =>
                type == "prev"
                    ? handleClick({ page: meta.current_page - 1 })
                    : handleClick({ page: meta.current_page + 1 })
            }
            className={`group flex-center size-10 disabled:pointer-events-none bg-white border border-white hover:border-main rounded-main`}>
            <Icon name="chevron" className={classNames(`text-primary size-4`, type == "next" ? "" : "rotate-180")} />
        </button>
    );
}

"use client";

import { IPaginationProps } from "@/types/props/ui.types";
import PaginationButton from "./PaginationButton";
import PaginationNumbers from "./PaginationNumbers";
import usePagination from "@/hooks/usePagination";

export default function Pagination({ meta }: IPaginationProps) {
    const { handleClick, visibleNumbers } = usePagination({ meta });

    return (
        <div className="flex justify-center flex-wrap gap-2 mt-10">
            <PaginationButton handleClick={handleClick} meta={meta} type="prev" />

            <PaginationNumbers meta={meta} visibleNumbers={visibleNumbers} handleClick={handleClick} />

            <PaginationButton handleClick={handleClick} meta={meta} type="next" />
        </div>
    );
}

import { IUsePaginationParams } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";

export default function usePagination({ meta }: IUsePaginationParams) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [visibleNumbers, setVisibleNumbers] = useState<number[]>([
        meta.current_page,
        meta.current_page + 1,
        meta.current_page + 2,
        meta.current_page + 3,
    ]);

    const handleClick = ({ page }: { page: number }) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        replace(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        replace(`${pathname}?${params.toString()}`, { scroll: false });
        // replace(`${pathname}?${params.toString()}`);
    }, []);

    useEffect(() => {
        setVisibleNumbers([meta.current_page - 1, meta.current_page, meta.current_page + 1]);

        if (meta.current_page == 1) {
            setVisibleNumbers([meta.current_page, meta.current_page + 1, meta.current_page + 2, meta.current_page + 3]);
        }
        if (meta.current_page == 2) {
            setVisibleNumbers([meta.current_page, meta.current_page + 1, meta.current_page + 2]);
        }

        if (meta.current_page == meta.last_page) {
            setVisibleNumbers([meta.current_page - 3, meta.current_page - 2, meta.current_page - 1, meta.current_page]);
        }
        if (meta.current_page == meta.last_page - 1) {
            setVisibleNumbers([meta.current_page - 2, meta.current_page - 1, meta.current_page]);
        }
    }, [meta.current_page]);

    return { visibleNumbers, handleClick };
}

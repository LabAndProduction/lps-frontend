"use client";

import { ICategoryTrackerProps } from "@/types/props/pages.types";
import { useCookies } from "next-client-cookies";
import { useEffect } from "react";

export default function CategoryTracker({ categoryId }: ICategoryTrackerProps) {
    const cookies = useCookies();

    useEffect(() => {
        cookies.set("last_category", categoryId);
    }, []);

    return <></>;
}

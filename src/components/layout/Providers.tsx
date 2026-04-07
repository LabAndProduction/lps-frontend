"use client";

import { IProvidersProps } from "@/types/props/types";
import { ProgressProvider } from "@bprogress/next/app";

export default function Providers({ children }: IProvidersProps) {
    return (
        <ProgressProvider height="4px" color="var(--color-main)" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressProvider>
    );
}

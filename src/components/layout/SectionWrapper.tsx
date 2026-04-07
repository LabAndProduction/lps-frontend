"use client";

import { ISectionWrapperProps } from "@/types/props/types";

export default function SectionWrapper({
    children,
    className = "",
}: ISectionWrapperProps) {
    return (
        <section className={className}>
            <div className="container">{children}</div>
        </section>
    );
}

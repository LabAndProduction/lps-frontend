"use client";

import { useEffect, useState } from "react";
import Icon from "../Icon";
import classNames from "classnames";

export default function ScrollUp() {
    const [isHidden, setIsHidden] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = 300;

            if (window.scrollY > scrollThreshold) {
                setIsHidden(false);
            } else {
                setIsHidden(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            onClick={() => {
                window.scrollTo(0, 0);
            }}
            className={classNames(
                `fixed lg:bottom-5 bottom-[4.125rem] right-5 flex-center sm:size-[3.125rem] size-10 rounded-full bg-white-70 shadow-[0_0_0.25rem_var(--color-black-10)] z-[80] border border-gray4`,
                isHidden ? "invisible opacity-0 translate-x-full" : "visible opacity-100 translate-x-0",
            )}>
            <Icon name="chevron" className="text-primary size-6 -rotate-90" />
        </button>
    );
}

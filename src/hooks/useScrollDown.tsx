import { IUseScrollDownParams } from "@/types/types";
import { useEffect, useState } from "react";

export default function useScrollDown({
    threshold = 400,
}: IUseScrollDownParams) {
    const [isHidden, setIsHidden] = useState(false);

    let lastScrollY = 0;

    useEffect(() => {
        lastScrollY = window.scrollY;
        const handleScroll = () => {
            const scrollThreshold = threshold;

            if (window.scrollY > scrollThreshold) {
                if (window.scrollY > lastScrollY) {
                    // Scrolling down
                    setIsHidden(true);
                } else {
                    // Scrolling up
                    setIsHidden(false);
                }
            } else {
                // Show header if above threshold
                setIsHidden(false);
            }

            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return { isHidden };
}

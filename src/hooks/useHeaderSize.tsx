import { useEffect, useState } from "react";

export default function useHeaderSize() {
    const [height, setHeight] = useState<number>(132);

    useEffect(() => {
        const header = document.querySelector(".header");
        const headerTop = document.querySelector(".header-top");
        if (header && headerTop) {
            setHeight(header.clientHeight + headerTop.clientHeight);
        }
    }, []);

    return { height };
}

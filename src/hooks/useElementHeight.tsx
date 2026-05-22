import { SetState } from "@/types/types";
import { RefObject, useLayoutEffect } from "react";

export interface IUseElementHeightParams {
    element: RefObject<HTMLElement | null>;
    setHeight: SetState<number>;
}

export default function useElementHeight({ element, setHeight }: IUseElementHeightParams) {
    useLayoutEffect(() => {
        function handleElementHeight() {
            if (element && element.current) {
                setHeight(element.current.clientHeight);
            }
        }
        handleElementHeight();

        window.addEventListener("scroll", handleElementHeight);
        window.addEventListener("resize", handleElementHeight);
        return () => {
            window.removeEventListener("scroll", handleElementHeight);
            window.removeEventListener("resize", handleElementHeight);
        };
    }, [element]);
}

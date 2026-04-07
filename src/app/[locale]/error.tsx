"use client";

import { useText } from "@/context/text.context";
import { IErrorProps } from "@/types/props/types";

export default function Error({ reset }: IErrorProps) {
    const { text } = useText();

    return (
        <div className="container py-20 flex-center">
            <div className="flex-center flex-col gap-10">
                <h4 className="lg:text-xl text-lg leading-120 text-center">{text("Что-то пошло не так ☹️")}</h4>
                <button className="main-btn" onClick={() => reset()}>
                    {text("Попробовать снова")}
                </button>
            </div>
        </div>
    );
}

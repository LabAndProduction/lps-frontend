"use client";

import Icon from "./Icon";
import toast from "react-hot-toast";
import { useText } from "@/context/text.context";
import classNames from "classnames";
import { IProductArticleNumberProps } from "@/types/props/ui.types";

export default function ProductArticleNumber({ articleNumber, isBig = false }: IProductArticleNumberProps) {
    const { text } = useText();

    const handleCopy = async (textToCopy: string) => {
        try {
            await navigator.clipboard.writeText(textToCopy);

            toast.success(text("Текст скопирован"));
        } catch (err) {
            console.error("Ошибка копирования: ", err);
        }
    };

    return (
        <div className="flex items-center flex-wrap gap-2">
            <p className={classNames("text-secondary", !isBig && "text-sm")}>{articleNumber}</p>
            <button type="button" className="flex-center" onClick={() => handleCopy(articleNumber)}>
                <Icon name="copy" className="size-4 text-primary" />
            </button>
        </div>
    );
}

"use client";

import Icon from "./Icon";
import classNames from "classnames";
import { IProductsViewButtonsProps } from "@/types/props/ui.types";
import { useText } from "@/context/text.context";

export default function ProductsViewButtons({ setProductsView, productsView }: IProductsViewButtonsProps) {
    const btnClassname = "text-primary group-hover:text-main size-6 fill-none";
    const { text } = useText();
    return (
        <div className="flex items-center gap-2">
            <p className="text-sm leading-120">{text("Вид")}:</p>
            <div className="flex gap-1">
                <button type="button" className="group" onClick={() => setProductsView("column")}>
                    <Icon
                        name="column"
                        className={classNames(btnClassname, `${productsView == "column" && "!text-main !fill-main"}`)}
                    />
                </button>
                <button type="button" className="group" onClick={() => setProductsView("row")}>
                    <Icon
                        name="row"
                        className={classNames(btnClassname, `${productsView == "row" && "!text-main !fill-main"}`)}
                    />
                </button>
            </div>
        </div>
    );
}

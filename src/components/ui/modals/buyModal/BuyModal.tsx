"use client";

import { useText } from "@/context/text.context";
import { useState } from "react";
import BuyModalContent from "./buyModalContent/BuyModalContent";
import { IBuyModalProps } from "@/types/props/ui.types";
import DialogWrapper from "../../headless/DialogWrapper";

export default function BuyModal({ product }: IBuyModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { text } = useText();
    function closeModal() {
        setIsOpen(false);
    }
    function openModal() {
        setIsOpen(true);
    }
    return (
        <DialogWrapper
            closeModal={closeModal}
            btn={
                <button onClick={openModal} type="button" className="main-btn w-full">
                    {text("Заказать")}
                </button>
            }
            isOpen={isOpen}
            content={<BuyModalContent closeModal={closeModal} product={product} />}
        />
    );
}

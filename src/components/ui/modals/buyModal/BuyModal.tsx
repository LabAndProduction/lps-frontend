"use client";

import BuyModalContent from "./buyModalContent/BuyModalContent";
import DialogWrapper from "../../headless/DialogWrapper";
import { useSettings } from "@/context/settings.context";

export default function BuyModal() {
    const { isBuyModalOpen, setIsBuyModalOpen, buyModalProduct } = useSettings();

    function closeModal() {
        setIsBuyModalOpen(false);
    }
    return (
        <>
            {buyModalProduct && (
                <DialogWrapper
                    closeModal={closeModal}
                    isOpen={isBuyModalOpen}
                    content={<BuyModalContent closeModal={closeModal} product={buyModalProduct} />}
                />
            )}
        </>
    );
}

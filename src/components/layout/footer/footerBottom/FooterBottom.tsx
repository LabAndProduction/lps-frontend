"use client";

import NextImage from "@/components/ui/NextImage";
import { useText } from "@/context/text.context";
import Link from "next/link";

export default function FooterBottom() {
    const { text } = useText();
    return (
        <div className="py-4 bg-gray text-sm">
            <div className="container flex sm:flex-row flex-col items-center justify-between gap-4">
                <p className="sm:text-start text-center">
                    {new Date().getFullYear()} © «{text("copyright")}».
                </p>

                <Link
                    target="_blank"
                    href="https://inweb.uz/"
                    className="flex items-center gap-2 hover:opacity-60 py-2">
                    {text("Разработка")} - <NextImage src={"/images/inweb.svg"} alt="Inweb" width={13} height={16} />
                </Link>
            </div>
        </div>
    );
}

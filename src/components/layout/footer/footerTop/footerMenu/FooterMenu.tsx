"use client";

import { useText } from "@/context/text.context";
import { IFooterMenuProps } from "@/types/props/types";
import Link from "next/link";

export default function FooterMenu({ menu }: IFooterMenuProps) {
    const { text } = useText();

    return (
        <>
            {menu && menu.data && (
                <div className="footer-menu">
                    <h4 className="title">{text(menu.data.name)}</h4>
                    <ul className="list">
                        {menu.data.menuItems.map((item) => (
                            <li key={item.id}>
                                <Link className="link" href={item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

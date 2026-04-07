"use client";

import SectionWrapper from "@/components/layout/SectionWrapper";
import { useText } from "@/context/text.context";
import { IDashboardTabsProps } from "@/types/props/pages.types";
import { IDashboardTab } from "@/types/types";
import { useCookies } from "next-client-cookies";
import DashboardLink from "./DashboardLink";
import LogoutModal from "@/components/ui/modals/logoutModal/LogoutModal";

export default function DashboardWrapper({ children, activeRoute }: IDashboardTabsProps) {
    const cookies = useCookies();
    const token = cookies.get("token");
    const { text } = useText();
    const dashboardTabs: IDashboardTab[] = [
        {
            id: 0,
            title: text("Профиль"),
            iconName: "user",
            route: "profile",
        },
        {
            id: 2,
            title: text("Заказы"),
            iconName: "cart",
            route: "orders",
        },
    ];

    return (
        <SectionWrapper className="my-10">
            <div className={`lg:grid flex flex-col grid-cols-[16.25rem_1fr] gap-x-5 gap-y-10`}>
                {token ? (
                    <div className="flex flex-col gap-4">
                        {dashboardTabs.map((tab) => {
                            return <DashboardLink key={tab.id} activeRoute={activeRoute} tab={tab} />;
                        })}
                        {token && <LogoutModal />}
                    </div>
                ) : (
                    <></>
                )}
                {children}
            </div>
        </SectionWrapper>
    );
}

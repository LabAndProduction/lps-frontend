"use client";

import { IAuthMenuContentProps } from "@/types/props/ui.types";
import { AuthTab } from "@/types/types";
import { useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import ResetPassword from "./resetPassword/ResetPassword";

export default function AuthMenuContent({ closeModal, defaultAuthTab = "login" }: IAuthMenuContentProps) {
    const [authTab, setAuthTab] = useState<AuthTab>(defaultAuthTab);
    return (
        <div className="flex flex-col gap-5 w-full">
            {authTab === "login" && <Login setAuthTab={setAuthTab} closeModal={closeModal} />}
            {authTab === "register" && <Register setAuthTab={setAuthTab} closeModal={closeModal} />}
            {authTab === "reset-password" && <ResetPassword setAuthTab={setAuthTab} />}
        </div>
    );
}

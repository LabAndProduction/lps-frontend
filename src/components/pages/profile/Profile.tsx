import { getCookies } from "next-client-cookies/server";
import UpdatePassword from "./updatePassword/UpdatePassword";

import { getProfile } from "@/api/profileApi";
import UpdateProfile from "./updateProfile/UpdateProfile";
import UpdatePhone from "./updatePhone/UpdatePhone";

export default async function Profile() {
    const cookies = await getCookies();
    const profile = await getProfile({ token: cookies.get("token") });
    return (
        <div className="flex flex-col gap-5">
            {typeof profile !== "string" && <UpdateProfile profile={profile} />}
            {typeof profile !== "string" && <UpdatePhone profile={profile} />}
            <UpdatePassword />
        </div>
    );
}

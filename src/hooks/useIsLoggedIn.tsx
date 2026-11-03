import { useCookies } from "next-client-cookies";

// Prices are shown to signed-in visitors only: the API sets the «token» cookie on login.
export default function useIsLoggedIn() {
    const token = useCookies().get("token");
    return !!token && token.length > 0;
}

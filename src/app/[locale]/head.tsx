import { getSettings } from "@/api/settingsApi";
import Script from "next/script";

export default async function HeadWrapper() {
    const settings = await getSettings();

    return (
        <head>
            <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <meta name="apple-mobile-web-app-title" content="LPS" />
            <link rel="manifest" href="/site.webmanifest" />
            {!!settings.jivochat_code && (
                <Script src={`//code.jivo.ru/widget/${settings.jivochat_code}`} async></Script>
            )}
        </head>
    );
}

import { getSettings } from "@/api/settingsApi";

export default async function Scripts() {
    const settings = await getSettings();

    return (
        <>
            {!!settings.yandex_metrika_code && (
                <div dangerouslySetInnerHTML={{ __html: settings.yandex_metrika_code }}></div>
            )}

            {!!settings.google_analytics_code && (
                <div dangerouslySetInnerHTML={{ __html: settings.google_analytics_code }}></div>
            )}
        </>
    );
}

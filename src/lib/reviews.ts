// LPS on the maps. The rating is copied by hand from Yandex Maps - update value and count
// when they change. It is only shown on the site: no rating markup goes to search engines,
// which do not accept a business rating published by the business itself.
export const YANDEX_RATING = { value: 4.3, count: 8 };

export const REVIEW_PATH = "/otzyv";

// each link opens LPS's reviews on that map
export const REVIEW_LINKS = {
    google: "https://maps.google.com/?cid=10581009961050295339",
    yandex: "https://yandex.uz/maps/org/lab_production_solutions/129537389808/reviews/",
    twogis: "https://2gis.uz/tashkent/firm/70000001052065894/tab/reviews",
};

// "8 оценок" / "8 ratings"
export function ratingsWord(locale: string, n: number): string {
    if (locale === "en") return n === 1 ? "rating" : "ratings";
    const form = new Intl.PluralRules("ru").select(n);
    return form === "one" ? "оценка" : form === "few" ? "оценки" : "оценок";
}

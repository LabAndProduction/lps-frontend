import { Link } from "@/i18n/routing";
import { REVIEW_PATH, YANDEX_RATING, ratingsWord } from "@/lib/reviews";

/* The rating card in the footer: the map rating with stars, leading to /otzyv, where the
   visitor picks the map to leave a review on. */
export default function RatingCard({ locale, className }: { locale: string; className?: string }) {
    const { value, count } = YANDEX_RATING;
    const shown = value.toLocaleString(locale === "en" ? "en-US" : "ru-RU", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });
    const en = locale === "en";
    return (
        <Link
            href={REVIEW_PATH}
            aria-label={en ? `Rating ${shown} of 5, ${count} ratings - leave a review` : `Рейтинг ${shown} из 5, ${count} ${ratingsWord(locale, count)} - оставить отзыв`}
            className={`group flex flex-col gap-1.5 w-full max-w-[17.5rem] rounded-card bg-gray-milky px-5 py-4 transition-300 hover:bg-main-5 ${className ?? ""}`}>
            <span className="flex items-center gap-2.5">
                <span className="text-[1.75rem] font-bold leading-none">{shown}</span>
                <Stars value={value} />
            </span>
            <span className="text-sm text-secondary">
                {count} {ratingsWord(locale, count)} {en ? "on maps" : "на картах"}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-main">
                {en ? "Leave a review" : "Оставить отзыв"}
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 transition-300 group-hover:translate-x-1">
                    <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
        </Link>
    );
}

/* Five grey stars with yellow ones laid over them, cut to the rating (4.3 fills 86%). */
function Stars({ value }: { value: number }) {
    const row = (className: string) => (
        <span className={`flex gap-0.5 ${className}`}>
            {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} aria-hidden="true" viewBox="0 0 20 20" className="size-[1.1rem] shrink-0" fill="currentColor">
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
                </svg>
            ))}
        </span>
    );
    return (
        <span aria-hidden="true" className="relative inline-block">
            {row("text-gray4")}
            <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
                {row("text-[#ffcc00]")}
            </span>
        </span>
    );
}

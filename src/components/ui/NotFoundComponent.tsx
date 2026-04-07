import { getTexts } from "@/api/textsApi";
import { Link } from "@/i18n/routing";

export default async function NotFoundComponent() {
    const { text } = await getTexts();
    return (
        <div className="max-w-[29.75rem] mx-auto text-center flex flex-col items-center py-20">
            <h1 className="leading-120 md:text-2xl mb-3">{text("Страница не найдена")}</h1>
            <p className="leading-120 text-sm mb-6">
                {text("Нужная вам страница либо удалена либо перемещена по новому адресу")}
            </p>
            <Link href="/" replace={true} className="main-btn">
                {text("Вернуться на главную")}
            </Link>
        </div>
    );
}

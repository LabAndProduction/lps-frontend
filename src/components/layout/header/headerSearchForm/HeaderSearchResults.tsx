import { useText } from "@/context/text.context";
import { Link } from "@/i18n/routing";
import classNames from "classnames";
import { IHeaderSearchResultsProps } from "@/types/props/types";
import ProductCardSmall from "@/components/ui/cards/ProductCardSmall";

export default function HeaderSearchResults({
    products,
    isOpen,
    setIsOpen,
    value,
    setValue,
}: IHeaderSearchResultsProps) {
    const { text } = useText();

    return (
        <div
            className={classNames(
                "@container/main absolute sm:top-[calc(100%+0.25rem)] top-full right-0 bg-white flex flex-col transition-300 min-w-[10rem] w-full sm:shadow-[0_0_0.625rem_-0.25rem_var(--color-black-50)] shadow-[0_0.625rem_0.25rem_-0.25rem_var(--color-black-10)] z-[95] sm:rounded-main max-h-[50vh] overflow-y-auto",
                isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-4",
            )}>
            {products && products.data.length > 0 ? (
                <div
                    onClick={() => {
                        setIsOpen(false);
                        setValue("");
                    }}>
                    {/* <div className="@[400px]/main:grid grid-cols-2"> */}
                    <div className="flex flex-col">
                        {products.data.map((product) => (
                            <ProductCardSmall product={product} key={product.id} />
                        ))}
                    </div>
                    <Link
                        href={`/search?keyword=${value}`}
                        className="h-[3.125rem] w-full flex-center text-sm border-t border-gray3 -mt-[0.0625rem]">
                        {text("Показать все")}
                    </Link>
                </div>
            ) : (
                <div className="h-[2.875rem] flex items-center p-4 text-sm">
                    <p>{text("Ничего не найдено")}</p>
                </div>
            )}
        </div>
    );
}

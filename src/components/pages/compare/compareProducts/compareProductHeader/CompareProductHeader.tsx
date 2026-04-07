import { ICompareProductHeaderProps } from "@/types/props/pages.types";
import CompareProductHeaderCard from "./compareProductHeaderCard/CompareProductHeaderCard";
import { useCompare } from "@/context/compare.context";
import { useCookies } from "next-client-cookies";
import Icon from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import classNames from "classnames";
import { useText } from "@/context/text.context";

export default function CompareProductHeader({ products, colWidthClassname }: ICompareProductHeaderProps) {
    const { maxLength, apiCompareList, compareList } = useCompare();
    const cookies = useCookies();
    const token = cookies.get("token");
    const { text } = useText();
    return (
        <thead>
            <tr>
                {products.map((product) => {
                    return (
                        <CompareProductHeaderCard
                            product={product}
                            key={product.id}
                            colWidthClassname={colWidthClassname}
                        />
                    );
                })}
                {((token && apiCompareList.quantity < maxLength) || (!token && compareList.length < maxLength)) && (
                    <th className="relative">
                        <Link
                            href={"/"}
                            className={classNames(
                                colWidthClassname,
                                "group absolute left-0 top-0 custom-block flex-col justify-center items-center gap-3 size-full p-4 border border-gray4 hover:border-main",
                            )}>
                            <Icon name="plus" className="size-8 group-hover:text-main text-secondary" />

                            <p className="text-sm leading-120 group-hover:text-main">{text("Добавить в сравнение")}</p>
                        </Link>
                    </th>
                )}
                {token
                    ? maxLength - apiCompareList.quantity - 1 > 0 &&
                      Array(maxLength - apiCompareList.quantity - 1)
                          .fill("")
                          .map((_, id) => (
                              <th key={id} className="lg:table-cell hidden">
                                  <div className={classNames(colWidthClassname)}></div>
                              </th>
                          ))
                    : maxLength - compareList.length - 1 > 0 &&
                      Array(maxLength - compareList.length - 1)
                          .fill("")
                          .map((_, id) => (
                              <th key={id} className="lg:table-cell hidden">
                                  <div className={classNames(colWidthClassname)}></div>
                              </th>
                          ))}
            </tr>
        </thead>
    );
}

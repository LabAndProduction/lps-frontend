import { useCompare } from "@/context/compare.context";
import { useText } from "@/context/text.context";
import { ICompareProductsAttrsProps } from "@/types/props/pages.types";
import classNames from "classnames";
import { useCookies } from "next-client-cookies";

export default function CompareProductsAttrs({
    products,
    productAttributes,
    colWidthClassname,
}: ICompareProductsAttrsProps) {
    const { maxLength, apiCompareList, compareList, allAttributes } = useCompare();
    const cookies = useCookies();
    const token = cookies.get("token");
    const borderClassname = "group-last:border-none border-b border-gray4";
    const { text } = useText();
    return (
        <tbody>
            <tr>
                <td
                    className="text-lg font-semibold leading-120 pt-6 pb-3 pr-4 last:pr-0 border-b border-gray2"
                    colSpan={5}>
                    {text("Характеристики")}
                </td>
            </tr>
            {allAttributes.map((attr) => {
                return (
                    <tr key={attr.id} className="group">
                        {products.map((product) => {
                            const finded = productAttributes.find((el) => el.productId == product.id);

                            if (finded) {
                                const filtered = finded.attrs.find((el) => {
                                    return el.id === attr.id;
                                });
                                return (
                                    <td key={product.id} className={classNames(`leading-120`, borderClassname)}>
                                        <div className={classNames(colWidthClassname, "flex flex-col gap-1 py-3 pr-3")}>
                                            <p className="font-semibold">{attr.name}</p>
                                            <p>
                                                {filtered
                                                    ? filtered.attribute_values.map((el) => el.name).join(", ")
                                                    : "-"}
                                            </p>
                                        </div>
                                    </td>
                                );
                            }
                        })}
                        {((token && apiCompareList.quantity < maxLength) ||
                            (!token && compareList.length < maxLength)) && (
                            <td className={borderClassname}>
                                <div className={classNames(colWidthClassname)}></div>
                            </td>
                        )}

                        {token
                            ? maxLength - apiCompareList.quantity - 1 > 0 &&
                              Array(maxLength - apiCompareList.quantity - 1)
                                  .fill("")
                                  .map((_, id) => (
                                      <td key={id} className={classNames("lg:table-cell hidden", borderClassname)}>
                                          <div className={classNames(colWidthClassname)}></div>
                                      </td>
                                  ))
                            : maxLength - compareList.length - 1 > 0 &&
                              Array(maxLength - compareList.length - 1)
                                  .fill("")
                                  .map((_, id) => (
                                      <td key={id} className={classNames("lg:table-cell hidden", borderClassname)}>
                                          <div className={classNames(colWidthClassname)}></div>
                                      </td>
                                  ))}
                    </tr>
                );
            })}
        </tbody>
    );
}

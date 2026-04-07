import Checkbox from "@/components/ui/formElements/Checkbox";
import { usePathname, useRouter } from "@/i18n/routing";
import { IBrandCheckboxProps } from "@/types/props/pages.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BrandCheckbox({ brand, isDisabled, setIsDisabled }: IBrandCheckboxProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const brandsParams = params.get("brands");

    const brandParamString = `${brand.id}-${brand.slug}`;

    const handleChecked = () => {
        setIsDisabled(true);
        if (brandsParams) {
            const brandsIds = brandsParams.split(",");

            if (brandsIds.includes(brandParamString)) {
                const filteredBrandsIds = brandsIds.filter((el) => el !== brandParamString);
                if (filteredBrandsIds.length == 0) params.delete("brands");
                else params.set("brands", filteredBrandsIds.join(","));
            } else {
                brandsIds.push(brandParamString);
                params.set("brands", brandsIds.join(","));
            }
        } else params.set("brands", brandParamString);
        params.set("page", `1`);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        if (brandsParams) {
            const brandsIds = brandsParams.split(",");
            if (brandsIds.includes(brandParamString)) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else setIsChecked(false);
        setIsDisabled(false);
    }, [brandsParams]);

    useEffect(() => {
        if (brandsParams) if (brandsParams.includes(brandParamString)) setIsChecked(true);
    }, []);

    return <Checkbox handleChecked={handleChecked} isChecked={isChecked} label={brand.name} isDisabled={isDisabled} />;
}

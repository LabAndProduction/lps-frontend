import { FormEventHandler, SVGProps } from "react";
import {
    AuthTab,
    BreadcrumbsType,
    FulfillAfterOtpType,
    InputNames,
    ProductsViewType,
    ResetFormType,
    SetState,
    SpritesName,
} from "../types";
import { IProduct, IProducts } from "../api/products.types";
import { ImageProps } from "next/image";
import { IMeta } from "../api/api.types";
import { OtpTarget } from "../api/auth.types";
import { CategoryWithoutMeta, ICategories } from "../api/categories.types";

export interface IIconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "type"> {
    name: SpritesName;
    className?: string;
}
export interface IProductCardSmallProps {
    product: IProduct;
}
export interface INextImageProps extends ImageProps {
    src: string;
    alt: string;
}
export interface ISectionHeadingProps {
    label: string;
    link?: string;
}
export interface IProductsSwiperProps {
    label: string;
    products: Pick<IProducts, "data">;
    id: string;
}
export interface IOvalSpinnerProps {
    size: number;
    color?: string;
}
export interface IProductCardProps {
    product: IProduct;
    className?: string;
}
export interface IRowProductCardProps {
    product: IProduct;
}
export interface ICartButtonProps {
    className?: string;
    product: IProduct;
    quantity?: number;
    type?: "text" | "icon";
    isGray?: boolean;
}
export interface IWishlistButtonProps {
    product: IProduct;
    className?: string;
    type?: "icon" | "text" | "button";
}
export interface ICompareButtonProps {
    product: IProduct;
    className?: string;
    type?: "icon" | "text";
}
export interface IPageHeaderProps {
    title?: string;
    breadcrumbs: BreadcrumbsType;
}
export interface IBreadcrumbsProps {
    breadcrumbs: BreadcrumbsType;
}

export interface IOverlapInputProps {
    id: string;
    placeholder: string;
    name: InputNames;
    inputClass?: string;
    disabled?: boolean;
    minLength?: number;
    maxLength?: number;
    step?: number;
    min?: number;
    max?: number;
    className?: string;
}
export interface ICheckboxProps {
    label: string;
    isChecked: boolean;
    handleChecked: () => void;
    isDisabled?: boolean;
    inputClass?: string;
}
export interface IHideFilterProps {
    setIsOpen: SetState<boolean>;
    isOpen: boolean;
    title: string;
}
export interface IProductsGridProps {
    products: IProducts;
    productsView?: ProductsViewType;
}
export interface IPaginationProps {
    meta: IMeta;
}
export interface IPaginationButtonProps {
    handleClick: ({ page }: { page: number }) => void;
    meta: IMeta;
    type: "prev" | "next";
}
export interface IPaginationNumbersProps {
    meta: IMeta;
    visibleNumbers: number[];
    handleClick: ({ page }: { page: number }) => void;
}
export interface ISelectWrapperProps<T> {
    selected: T;
    setSelected: SetState<T>;
    items: T[];
    label?: string;
    btnClassName?: string;
    btnIconClassName?: string;
    btnTextClassName?: string;
}

export interface ISideMenuWrapperProps {
    btn: React.ReactNode;
    content: React.ReactNode;
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
    position?: "right" | "left";
}
export interface IDialogWrapperProps {
    btn?: React.ReactNode;
    content: React.ReactNode;
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
}

export interface ILoginFormProps {
    isSubmitting: boolean;
    setAuthTab: SetState<AuthTab>;
}
export interface IRegisterFormProps {
    isSubmitting: boolean;
    setAuthTab: SetState<AuthTab>;
}
export interface IOtpModalProps<T> {
    isOpen: boolean;
    formPhone: string;
    fulfillAfterOtp: FulfillAfterOtpType;
    setIsOpen: SetState<boolean>;
    otpTarget: OtpTarget;
    resetForm: ResetFormType<T>;
}
export interface IOtpFormProps {
    handleSubmit: FormEventHandler<HTMLFormElement>;
    otp: string;
    setOtp: SetState<string>;
    formPhone: string;
    otpTarget: OtpTarget;
}
export interface IResetPasswordFormProps {
    isSubmitting: boolean;
    setAuthTab: SetState<AuthTab>;
}
export interface ILogoutContentProps {
    closeModal: () => void;
}
export interface ICartWrapperProps {
    content: React.ReactNode;
    sidebar: React.ReactNode;
}
export interface ICartProductCardProps {
    product: IProduct;
    quantity?: number;
}
export interface IQuantityProps {
    productQuantity: number;
    product: IProduct;
    setQuantity?: SetState<number>;
}
export interface IOrderProductCardProps {
    product: IProduct;
    quantity: number;
}
export interface IProductBadgeProps {
    text: string;
    bgColor?: string;
}
export interface IProductPriceProps {
    product: IProduct;
    isWithBadge?: boolean;
}
export interface IEmptyProps {
    title: string;
    text?: string;
    link?: string;
    linkText?: string;
    img: string;
}
export interface ILoginProps {
    setAuthTab: SetState<AuthTab>;
    closeModal: () => void;
}
export interface IRegisterProps {
    setAuthTab: SetState<AuthTab>;
    closeModal: () => void;
}

export interface ISeoSectionProps {
    body: string;
    link?: string;
}
export interface ICategoryCardProps {
    category: CategoryWithoutMeta;
}
export interface ICategoriesSwiperProps {
    categories: ICategories;
}
export interface IProductsViewButtonsProps {
    setProductsView: SetState<ProductsViewType>;
    productsView: ProductsViewType;
}
export interface IFilterWrapperProps {
    isOpen?: boolean;
    setIsOpen?: SetState<boolean>;
    title: string;
    content: React.ReactNode;
    contentWrapperClassname?: string;
}
export interface IResetPasswordProps {
    setAuthTab: SetState<AuthTab>;
}
export interface IBuyModalContentProps {
    closeModal: () => void;
    product: IProduct;
}

export interface IProductArticleNumberProps {
    articleNumber: string;
    isBig?: boolean;
}
export interface IFiltersMenuProps {
    filters: React.ReactNode;
    closeModal: () => void;
    openModal: () => void;
    isOpen: boolean;
}

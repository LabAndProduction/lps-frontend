import { FieldAttributes } from "formik";
import { SingleBrand } from "../api/brand.types";
import {
    ICategoryAttribute,
    ICategoryAttributes,
    ICategoryBrands,
    IPrices,
    ISingleCategory,
} from "../api/categories.types";
import { IProduct, IProductAttribute, IProductAttributes, IProducts, ISingleProduct } from "../api/products.types";
import { IProfile } from "../api/profile.types";
import { IUpdatePhoneForm } from "../form.types";
import {
    DashboardRoutes,
    IDashboardTab,
    PaymentMethodType,
    ResetFormType,
    SetFieldValueType,
    SetState,
} from "../types";
import { IOrders } from "../api/orders.types";
import { IProductGroup, IProductGroupAttribute, IProductGroupAttributeValue } from "../api/productGroup.types";
import { ICalculatedInstallments } from "../api/installmentCalc.types";
import { IPartner } from "../api/partners.types";
import { ISinglePage } from "../api/pages.types";
import { ISettings } from "../api/settings.types";
import { ReactNode } from "react";
import { IGroupAttribute } from "./types";
import { IBanner, IBanners } from "../api/banners.types";

export interface ICompareProductsProps {
    products: IProduct[];
}
export interface ICompareProductHeaderProps {
    products: IProduct[];
    colWidthClassname: string;
}
export interface ICompareProductHeaderCardProps {
    product: IProduct;
    colWidthClassname: string;
}
export interface ICompareProductsAttrsProps {
    products: IProduct[];
    productAttributes: {
        productId: number;
        attrs: IProductAttribute[];
    }[];
    colWidthClassname: string;
}

export interface ICategoriesPageHeaderProps {
    category: ISingleCategory;
}
export interface ICategoriesFiltersProps {
    attributes: ICategoryAttributes;
    price: IPrices;
    closeModal?: () => void;
    brands: ICategoryBrands;
}
export interface ICategoriesFiltersMenuProps {
    attributes: ICategoryAttributes;
    price: IPrices;
}

export interface IFilterBrandsProps {
    brands: SingleBrand[];
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    closeModal?: () => void;
}
export interface IBrandCheckboxProps {
    brand: SingleBrand;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
}
export interface IFilterAttributesProps {
    attributes: ICategoryAttributes;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    closeModal?: () => void;
}
export interface IAttributeProps {
    attribute: ICategoryAttribute;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    isShow?: boolean;
    closeModal?: () => void;
}
export interface IFilterPriceProps {
    price: IPrices;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    step?: number;
    closeModal?: () => void;
}
export interface IAttributeCheckboxProps {
    label: string;
    attrId: number;
    attrValId: number;
    attrSlug: string;
    attrValSlug: string;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    closeModal?: () => void;
}
export interface IClearFiltersProps {
    price: IPrices;
    isDisabled: boolean;
    setIsDisabled: SetState<boolean>;
    closeModal?: () => void;
}
export interface ISearchProps {
    products: IProducts;
    keyword: string;
    price: IPrices;
}
export interface ISearchFiltersProps {
    price: IPrices;
    closeModal?: () => void;
    keyword: string;
}

export interface ISearchFiltersMenuProps {
    price: IPrices;
    keyword: string;
}

export interface IDashboardTabsProps {
    children: React.ReactNode;
    activeRoute: DashboardRoutes;
}
export interface IDashboardLinkProps {
    tab: IDashboardTab;
    activeRoute: DashboardRoutes;
}
export interface IUpdatePasswordFormProps {
    isSubmitting: boolean;
}

export interface IUpdateProfileProps {
    profile: IProfile;
}
export interface IUpdatePhoneProps {
    profile: IProfile;
}
export interface IUpdatePhoneFormProps {
    setIsOtpModalOpen: SetState<boolean>;
    isOtpModalOpen: boolean;
    values: IUpdatePhoneForm;
    fulfillAfterOtp: ({ otp }: { otp: string }) => void;
    isSubmitting: boolean;
    resetForm: ResetFormType<IUpdatePhoneForm>;
}
export interface IOrdersProps {
    orders: IOrders;
}
export interface IRemoveFromCartProps {
    product: IProduct;
}
export interface IProductBreadcrumbsProps {
    product: ISingleProduct;
}
export interface IProductProps {
    product: ISingleProduct;
    productGroup: "Not exist" | IProductGroup;
    attributes: IProductAttributes;
}
export interface IProductGalleryProps {
    product: ISingleProduct;
}
export interface ICheckoutFormProps {
    isSubmitting: boolean;
}
export interface IOrderInfoCardProps {
    title: string;
    info: string;
}
export interface ICheckoutPaymentMethodProps<Form> {
    isSubmitting: boolean;
    setFieldValue: SetFieldValueType<Form>;
    apiInstallments: { data: IPartner[] };
}

export interface ICheckoutProps {
    apiInstallments: { data: IPartner[] };
}
export interface IPaymentMethodInputProps extends Omit<FieldAttributes<any>, "value"> {
    methodValue: PaymentMethodType;
    title: string;
}
export interface ICheckoutTableItemProps {
    product: IProduct;
    quantity: number;
}
export interface ICheckoutInstallmentsProps {
    installments: ICalculatedInstallments;
}
export interface IAboutProps {
    page: ISinglePage;
}
export interface ICategoryPageWrapperProps {
    products: IProducts;
    category: ISingleCategory;
}
export interface ICategoryProps {
    category: ISingleCategory;
    products: IProducts;
}
export interface ICategoryProductsWrapperProps {
    products: IProducts;
    attributes: ICategoryAttributes;
    price: IPrices;
}
export interface ICheckoutInstallmentDurationsProps {
    installments: ICalculatedInstallments;
}
export interface ICheckoutSidebarProps {
    installments?: ICalculatedInstallments;
    isSubmitting?: boolean;
}
export interface IContactsProps {
    settings: ISettings;
}
export interface IProductSidebarProps {
    product: ISingleProduct;
}
export interface IProductTabsProps {
    product: ISingleProduct;
    attributes: IProductAttributes;
}
export interface IProductInstallmentProps {
    product: ISingleProduct;
}
export interface IProductInfoProps {
    product: ISingleProduct;
    attributes: IProductAttributes;
    productGroup: IProductGroup | "Not exist";
}
export interface IProductCartSidebarProps {
    product: ISingleProduct;
}
export interface IProductBannersProps {
    product: ISingleProduct;
}
export interface IProfileFormWrapperProps {
    title: string;
    content: ReactNode;
}
export interface IProductGroupsButtonProps {
    productGroup: IProductGroup;
    activeAttributes: IGroupAttribute[];
    groupAttrVal: IProductGroupAttributeValue;
    groupAttr: IProductGroupAttribute;
}
export interface IProductGroupsProps {
    attributes: IProductAttributes;
    productGroup: IProductGroup | "Not exist";
    className?: string;
}
export interface IHomeBannerProps {
    banners: IBanners;
}

export interface ICategoryBannersProps {
    category: ISingleCategory;
}
export interface ICategoryVideoBannerProps {
    category: ISingleCategory;
}
export interface ICategoryVideoBannersProps {
    currentCategoryBanners: IBanners;
}
export interface ICategoryVideoBannerCardProps {
    item: IBanner;
}
export interface ISearchFormProps {
    keyword?: string;
    isSearchPage?: boolean;
}
export interface ICategoryTrackerProps {
    categoryId: string;
}

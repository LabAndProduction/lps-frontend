import { ILocalization, Locale } from "../api/api.types";
import { IBanner } from "../api/banners.types";
import { ICategoriesTree, ICategoryTree } from "../api/categories.types";
import { ISingleMenu } from "../api/menus.types";
import { IProducts } from "../api/products.types";
import { ISettings } from "../api/settings.types";
import { SetState } from "../types";

export interface IErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}
export interface IContextProvidersProps {
    children: React.ReactNode;
}
export interface IProvidersProps {
    children: React.ReactNode;
}

export interface IRootLayoutProps {
    children: React.ReactNode;
    // params: Promise<{ locale: Locale }>;
    params: Promise<{ locale: string }>;
}
export interface IHeaderSearchResultsProps {
    products?: IProducts;
    isOpen: boolean;
    setIsOpen: SetState<boolean>;
    value: string;
    setValue: SetState<string>;
}
export interface IHeaderSearchFormProps {
    className?: string;
    keyword?: string;
    setIsSearchOpen: SetState<boolean>;
}
export interface ISectionWrapperProps {
    children: React.ReactNode;
    className?: string;
}
export interface ILocalizationComponentProps {
    startPath: string;
    localization: ILocalization;
    id: number;
}
export interface IFooterMenuProps {
    menu: ISingleMenu;
}
export interface IHeaderBottomProps {
    settings: ISettings;
    menu: ISingleMenu;
    categoriesTree: ICategoriesTree;
}
export interface IHeaderMobileLinksProps {
    settings: ISettings;
    setIsSearchOpen: SetState<boolean>;
    isSearchOpen: boolean;
}
export interface IHeaderLinksProps {
    categoriesTree: ICategoriesTree;
}

export interface IHeaderCategorySubmenuProps {
    category: ICategoryTree;
    btnClassname: string;
    spanClassname: string;
}
export interface IHeaderIconsProps {
    setIsSearchOpen: SetState<boolean>;
    isSearchOpen: boolean;
    menu: ISingleMenu;
    categoriesTree: ICategoriesTree;
}
export interface IHeaderSearchBtnProps {
    setIsSearchOpen: SetState<boolean>;
    isSearchOpen: boolean;
}
export interface IGroupAttribute {
    id: number;
    parentId: number;
    isActive: boolean;
}
export interface IHeaderBannerProps {
    item: IBanner;
}
export interface IHeaderProps {
    categoriesTree: ICategoriesTree;
    menu: ISingleMenu;
}
export interface IFixedFooterMenuProps {
    categoriesTree: ICategoriesTree;
    menu: ISingleMenu;
}
export interface IHeaderMenuProps {
    categoriesTree: ICategoriesTree;
    menu: ISingleMenu;
    isBtnWithText?: boolean;
}
export interface IHeaderMenuCategoryProps {
    category: ICategoryTree;
    closeModal(): void;
}

export interface IHeaderSubmenuContentProps {
    category: ICategoryTree;
}
export interface IHeaderSubmenuBannersProps {
    category: ICategoryTree;
}
export interface IPhoneDropdownProps {
    settings: ISettings;
}

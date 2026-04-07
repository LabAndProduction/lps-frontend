export interface IMenus {
    data: IMenu[];
}

export interface IMenu {
    id: number;
    name: string;
    menuItems: IMenuItem[];
}

interface IMenuItem {
    id: number;
    title: string;
    url: string;
}

export interface ISingleMenu {
    data: IMenu;
}
export interface IGetMenuParams {
    menuId: number;
}

import { IProduct } from "./products.types";

export interface IProductGroup {
    data: {
        id: number;
        name: string;
        attributes: IProductGroupAttribute[];
        products: IProductGroupProduct[];
    };
}

export interface IProductGroupProduct {
    attribute_value_ids: number[];
    product: Omit<IProduct, "categories" | "stickers">;
}

export interface IProductGroupAttribute {
    id: number;
    name: string;
    type: 0 | 2;
    attribute_values: IProductGroupAttributeValue[];
}

export interface IProductGroupAttributeValue {
    id: number;
    name: string;
    image: string;
}
export interface IGetProductGroupParams {
    productGroupId: number | null;
}

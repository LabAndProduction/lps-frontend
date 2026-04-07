import { ISetItemWithExpiryParams } from "@/types/types";

export const setItemWithExpiry = ({
    key,
    value,
    expireTime,
}: ISetItemWithExpiryParams) => {
    const now = new Date();

    const item = {
        value: value,
        expiry: now.getTime() + expireTime,
    };

    localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = ({ key }: { key: string }) => {
    const itemStr = typeof window !== "undefined" && localStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
};

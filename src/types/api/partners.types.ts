export interface IPartner {
    id: number;
    code: string;
    name: string;
    img: string;
    partnerInstallments: IPartnerInstallment[];
}
export interface IPartnerInstallment {
    id: number;
    duration: number;
    percent: number;
    min_price: number;
    max_price: number;
}

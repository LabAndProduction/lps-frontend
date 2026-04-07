export interface IRegion {
    id: number;
    name: string;
    short_name: string;
    order: number;
    districts: IDistrict[];
}
export interface IDistrict {
    id: number;
    region_id: number;
    name: string;
    order: number;
}

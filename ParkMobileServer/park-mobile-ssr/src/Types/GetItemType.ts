import { SortType } from "./SortType";

export type GetItemType = 
{
    skip: number;
    take: number;
    filters?: string[];
    sort?: SortType
}
import { SortType } from "./SortType"

export type GetItemsMainMenuType = {
    category?: string,
    brand?: string,
    skip: number,
    take: number,
    filters?: string[],
    sort?: SortType
}
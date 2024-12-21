import { atom } from "jotai";

export type CategoryAndBrandDTOType = {
    id: number,
    name: string
}

export const categoriesAtom = atom<CategoryAndBrandDTOType[]>();
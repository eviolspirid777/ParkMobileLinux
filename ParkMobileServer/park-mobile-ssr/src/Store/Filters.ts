import { atom } from "jotai";

export type FilterAtom = {
    id: number,
    name: string,
}

export const FiltersAtom = atom<FilterAtom[]>();
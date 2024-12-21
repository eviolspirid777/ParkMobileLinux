import { SearchItemShortType } from "@/Types/SearchItemShortType";
import { atom } from "jotai";

export const searchedItemsAtom = atom<SearchItemShortType[]>([])
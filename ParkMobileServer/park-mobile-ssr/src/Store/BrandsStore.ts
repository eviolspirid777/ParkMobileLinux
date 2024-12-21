import { atom } from "jotai";
import { CategoryAndBrandDTOType } from "./CategoriesStore";

export const brandsAtom = atom<CategoryAndBrandDTOType[]>();
import { RecivedCardDataType } from "@/Types/CardType";
import { atom } from "jotai";

export const itemsAtom = atom<RecivedCardDataType>();

export const skipAtom = atom<number>(0);
export const takeAtom = atom<number>(16);
import { atom } from "jotai";

export const currentPageAtom = atom(1);
export const pageSizeAtom = atom(10);
export const searchKeyWordAtom = atom("");
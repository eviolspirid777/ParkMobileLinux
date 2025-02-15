import { GetAdressesCDEKResponse } from "@/Types/CDEK";
import { atom } from "jotai";

export const AddressesAtom = atom<GetAdressesCDEKResponse[]>();
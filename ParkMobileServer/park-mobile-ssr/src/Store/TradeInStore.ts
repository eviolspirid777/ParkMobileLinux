import { atom } from "jotai";

export type TradeInType = {
    deviceType?: string,
    color?: string,
    username?: string,
    telephone?: string,
    memory?: string,
    accumulator?: string,
    appearance?: string,
    complectation?: string,
    remonted?: string,
}

export const tradeInAtom = atom<TradeInType>();
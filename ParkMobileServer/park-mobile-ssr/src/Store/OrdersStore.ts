import { Order } from "@/Types/Order";
import { atom } from "jotai";

export const ordersAtom = atom<Omit<Order, "Client" | "Items">[]>();
export const ordersCountAtom = atom<number>();
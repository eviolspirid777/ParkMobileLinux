import { ReactNode } from "react"

export const PaymentDictionary = new Map([
  [0, "Карта"],
  [1, "QR-код"],
  [2, "Наличные"],
  [3, "Кредит"]
])

export enum OrderPayment
{
  Card = 0,
  QrCode,
  Cash,
  Credit
}
export enum OrderState
{
  Approved = 0,
  Disapproved,
}

export type Order = {
  id?: number
  address: string,
  pvzCode: string,
  payment: OrderPayment,
  state: OrderState | null,
  client: OrderClient, 
  items?: OrderItem[],
}

export type OrderClient = {
  clientName?: string,
  telephone?: string,
  email?: string,
  comment?: string,
}

export type OrderItem = {
  itemId: number,
  count: number
}

export type OrderTableData = Omit<Order, "client" | "items"> & { buttonBlock: ReactNode };

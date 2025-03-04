import { atom } from "jotai";

export type DataType = {
  id: number;
  image: string;
  name: string;
  count: number;
  price: number;
  weight: number,
  discountPrice?: number | null;
  article: string;
  color?: undefined;
  memory?: undefined;
};

export const shopBucketAtom = atom<DataType[]>([])
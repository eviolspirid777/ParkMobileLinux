import { atom } from "jotai";

export type DataType = {
    id: number;
    image: string;
    name: string;
    count: number;
    price: string;
    discountPrice?: string;
    article: string;
    color?: undefined;
    memory?: undefined;
  };

// const MYtestData = [
//   {
//     image: "/images/Devices/Ipad.png",
//     name: "Watch 6 44mm",
//     count: 2,
//     price: "15 990",
//     article: "364454479217",
//   },
//   {
//     image: "/images/Devices/iphone.png",
//     name: "Iphone 16 Pro Max 512 gb",
//     count: 1,
//     color: "quantaBlack",
//     memory: "512gb",
//     price: "164 990",
//     article: "364849592901",
//   },
// ];

export const shopBucketAtom = atom<DataType[]>([])
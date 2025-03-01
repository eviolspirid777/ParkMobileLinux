import { DataType } from "@/Store/ShopBucket";
import { useEffect, useState } from "react";

type useOtpBankProps = {
  items: DataType[];
};

export const useOtpBank = ({ items }: useOtpBankProps) => {
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    if (items) {
      const baseParams = new URLSearchParams({
        config: "fc431351-6149-4431-9823-10e6998d8974",
        tradeID: "230107099000001",
        partnersURL: "https://parkmobile.store/",
      });

      const goodsParams = items
        .map((data, index) => {
          const price = (data.discountPrice ?? data.price) * 1.06;
          return [
            `goods[${index}][quantity]=${data.count}`,
            `goods[${index}][price]=${price}`,
            `goods[${index}][name]=${encodeURIComponent(data.name)}`,
          ].join("&");
        })
        .join("&");

      const fullQueryString = `${baseParams.toString()}&${goodsParams}`;
      setQueryString(fullQueryString);
    }
  }, [items]);

  const redirectToOtp = () => {
    window.open(`https://ecom.otpbank.ru/smart-form?${queryString}`, "_blank");
  };

  return {
    otpUrl: `https://ecom.otpbank.ru/smart-form?${queryString}`,
    redirectToOtp,
  };
};
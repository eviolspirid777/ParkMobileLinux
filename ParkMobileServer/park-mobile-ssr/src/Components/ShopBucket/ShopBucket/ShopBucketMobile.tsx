"use client";
import { FC, useEffect } from "react";

import styles from "./ShopBucketMobile.module.scss";
import { DataType } from "@/Store/ShopBucket";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";

type ShopBucketMobileProps = {
  shopBucket: DataType[];
  handleItemCount: (el: DataType, type: "minus" | "plus") => void;
  handleDeleteItem: (index: number) => void;
  open: boolean;
  price?: string;
};

export const ShopBucketMobile: FC<ShopBucketMobileProps> = ({
  shopBucket,
  handleItemCount,
  handleDeleteItem,
  open,
  price,
}) => {
  useEffect(() => {
    const _html = document.documentElement; // Изменяем html
    const _body = document.body;

    if (open) {
      _html.style.overflow = "hidden"; // Отключаем скролл на html
      _body.style.overflow = "hidden"; // Отключаем скролл на body
      _body.style.overscrollBehaviorY = "contain"; //отключаем обновление страницы через скролл наверх
    } else {
      _html.style.overflow = "visible"; // Включаем скролл на html
      _body.style.overflow = "visible"; // Включаем скролл на body
      _body.style.overscrollBehaviorY = "auto";
    }

    return () => {
      _html.style.overflow = "visible"; // Сбрасываем стили при размонтировании
      _body.style.overflow = "visible"; // Сбрасываем стили при размонтировании
    };
  }, [open]);

  return (
    <main className={styles["main-cls"]}>
      {shopBucket.map((el, index) => (
        <div key={index} className={styles["item-block"]}>
          <Image src={`data:image/jpeg;base64,${el.image}`} alt={el.name} width={80} height={80}/>
          <div className={styles["item-data-container"]}>
            <div className={styles["item-block-info"]}>
              <strong>{el.name}</strong>
            </div>
            <div className={styles["item-count-and-price-block"]}>
              <div className={styles["item-block-count"]}>
                <i
                  className="fa-solid fa-minus"
                  onClick={handleItemCount.bind(this, el as DataType, "minus")}
                />
                <span>{el.count}</span>
                <i
                  className="fa-solid fa-plus"
                  onClick={handleItemCount.bind(this, el as DataType, "plus")}
                />
              </div>
              <div className={styles["item-block-price"]}>
                <span className={el.discountPrice !== null ? styles["discount"] : ""}>
                  {convertToIntlFormat(el.price)} ₽
                </span>
                {el.discountPrice && <span>{el.discountPrice} ₽</span>}
              </div>
            </div>
          </div>
          <div className={styles["item-block-decline"]}>
            <i
              className="fa-regular fa-trash fa-lg"
              onClick={handleDeleteItem.bind(this, index)}
            />
          </div>
        </div>
      ))}
      {price && (
        <strong
          style={{
            marginTop: "50px",
          }}
        >
          Сумма: {price} ₽
        </strong>
      )}
    </main>
  );
};

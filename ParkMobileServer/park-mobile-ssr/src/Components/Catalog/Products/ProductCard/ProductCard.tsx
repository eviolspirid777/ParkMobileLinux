"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.scss";
import { CardType } from "@/Types/CardType";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";

type ProductCardProps = {
  card: CardType;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({ card, onClick }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (typeof card.image === "string") {
        setImage(`data:image/jpeg;base64,${card.image}`);
      } else {
        console.error("Неизвестный тип данных для изображения:", card.image);
        setImage(null);
      }
    } catch (error) {
      console.error("Ошибка при создании URL изображения:", error);
      setImage(null);
    }
  }, [card.image, card]);

  return (
    <div className={styles["product-card"]} onClick={onClick}>
      {image && (
        <Image
          src={image}
          alt="product_card"
          width={window.screen.width > 1024 ? 300 : 180}
          height={window.screen.width > 1024 ? 300 : 180}
          layout="responsive"
        />
      )}
      <div className={styles["product-card-text-block"]}>
        <label className={styles["product-card-text-block-tag"]}>
          {card.name}
        </label>
        {
          card.isNewItem &&
          <div className={styles["product-card-text-block-tile"]}>Новинка</div>
        }
      </div>
      <div className={styles["product-card-text-block-price-block"]}>
        <span
          className={`${styles["product-card-text-block-price"]} ${
            card.discountPrice && styles["discount"]
          }`}
        >
          {convertToIntlFormat(card.price)} ₽
        </span>
        {card.discountPrice && (
          <span className={styles["product-card-text-block-price"]}>
            {convertToIntlFormat(card.discountPrice)} ₽
          </span>
        )}
      </div>
    </div>
  );
};

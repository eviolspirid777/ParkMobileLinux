"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductCard.module.scss";
import { CardType } from "@/Types/CardType";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";
import { SearchItemShortType } from "@/Types/SearchItemShortType";
import { useAtom } from "jotai";
import { DataType, shopBucketAtom } from "@/Store/ShopBucket";
import { notification } from "antd";

type ProductCardProps = {
  card: CardType | SearchItemShortType;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean
};

export const ProductCard: React.FC<ProductCardProps> = ({
  card,
  onClick,
  disabled
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [image, setImage] = useState<string | null>(null);
  const [, setShopBucket] = useAtom(shopBucketAtom);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      const bubble = document.createElement('div');

        if(e.target === buttonRef.current) {
          bubble.classList.add('bubble');
          bubble.style.left = e.pageX + 'px';
          bubble.style.top = e.pageY + 'px';
          document.body.appendChild(bubble);
        }
      
      setTimeout(() => {
        bubble.remove();
      }, 1000);
    });
    // const abortContorller = new AbortController();
    // const currentOffsets = {
    //   offsetY: 0,
    //   offsetX: 0,
    // }

    // if(buttonRef.current) {
    //   const circle = document.createElement("div");
    //   circle.style.height = "50px";
    //   circle.style.width = "50px";
    //   circle.style.borderRadius = "100%";
    //   // circle.style.backgroundColor = "rgb(255 255 255 / 40%)";
    //   circle.style.backgroundColor = "red";
    //   circle.style.position = "absolute";

    //   document.addEventListener("mousemove", (event) => {
    //     if(event.target === buttonRef.current) {
    //       circle.style.top = `${event.layerY - 25}px`;
    //       circle.style.left = `${event.layerX - 25}px`;

    //       currentOffsets.offsetX = event.layerX;
    //       currentOffsets.offsetY = event.layerY;

    //       if(buttonBlockRef.current) {
    //         if(buttonBlockRef.current.contains(circle)) {
    //           buttonBlockRef.current.removeChild(circle)
    //         }
    //         buttonBlockRef.current.appendChild(circle)
    //       }
    //     }
    //   })
      
    //   circle.addEventListener("mousemove", (event) => {
    //     const {offsetX, offsetY} = event;
  
    //     circle.style.top = `${offsetY}px`;
    //     circle.style.left = `${offsetX}px`;
    //   })

    //   if(buttonBlockRef.current) {
    //     buttonBlockRef.current.addEventListener("mouseleave", () => {
    //       if(buttonBlockRef.current) {
    //         buttonBlockRef.current.removeChild(circle)
    //       }
    //     }, {
    //       signal: abortContorller.signal
    //     })
    //   }

    // }
    // return () => {
    //   abortContorller.abort()
    // }
  }, [])

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

  const handleAddToBucket = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
  
    setShopBucket((previousBucket: DataType[]) => {
      const newItem: DataType = {
        id: card.id ?? 0,
        image: card.image,
        name: card.name,
        count: 1,
        article: (card as CardType).article ?? "",
        price: card.price,
        discountPrice: card.discountPrice
      };
  
      return [...previousBucket, newItem];
    });
    
    api.destroy();

    api.open({
      message: "",
      description: (
        <div className={styles["information-title"]}>
          <strong>{card?.name} в корзине!</strong>
          <span>Перейдите в корзину для оформления заказа.</span>
        </div>
      ),
      style: {
        padding: "3%",
        border: "1px solid #87a08b",
        borderRadius: "5px"
      },
      placement: "bottomRight",
      closable: false,
      duration: 2,
      type: "success",
      // showProgress: true,
      pauseOnHover: true,
    })
  };

  return (
    <>
      {contextHolder}
      <div
        className={`${styles["product-card"]} ${disabled && styles["disabled"]}`}
        onClick={onClick}
      >
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
            "isNewItem" in card && card.isNewItem &&
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
        <div
          className={styles["add-to-bucket"]}
          ref={buttonBlockRef}
        >
          <button
            className={styles["add-to-bucket-button"]}
            onClick={handleAddToBucket}
            ref={buttonRef}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </>
  );
};

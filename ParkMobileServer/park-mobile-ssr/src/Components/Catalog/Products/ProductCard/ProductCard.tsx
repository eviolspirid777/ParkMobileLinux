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
import { OrderForm } from "../ProductModal/OrderForm/OrderForm";
import { OrderItem } from "@/Types/OrderItem";
import { usePostOrderItem } from "@/hooks/usePostOrderItem";

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
  const [openOrderForm, setOpenOrderForm] = useState(false);
  const {
    postOrderItemAsync,
  } = usePostOrderItem();
  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonBlockRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if(buttonRef.current) {
      buttonRef.current.addEventListener('click', (e) => {
        const bubble = document.createElement('div');

        bubble.classList.add('bubble');
        if(buttonRef.current?.firstChild?.textContent === "заказать") {
          bubble.style.backgroundColor = "#EDEDED"
        }
        bubble.style.left = e.offsetX + 50 + 'px';
        bubble.style.top = e.offsetY +'px';
        if(buttonBlockRef.current) {
          buttonBlockRef.current.appendChild(bubble);
        }
        
        setTimeout(() => {
          bubble.remove();
        }, 1000);
      });
    }
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

  const handleSubmitData = async (values: Omit<OrderItem, "article" | "itemName">) => {
    const sendData = {...values, itemName: card?.name, article: (card as CardType).article};
    await postOrderItemAsync(sendData)
    setOpenOrderForm(false);
  }

  const handleAddToBucket = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    setShopBucket((previousBucket: DataType[]) => {
      const newItem: DataType = {
        id: card.id ?? 0,
        image: card.image,
        name: card.name,
        count: 1,
        weight: (card as CardType).weight,
        article: (card as CardType).article ?? "",
        price: card.price as number,
        discountPrice: card.discountPrice as number
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

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    setTimeout(() => {
      if((card as CardType).stock > 0) {
        handleAddToBucket(event)
      }
      else {
        setOpenOrderForm(true)
      }
    }, 350)
  }

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
          {
            !shopBucket.some(item => item.id === card.id) ?
            <button
              className={styles["add-to-bucket-button"]}
              data-state={(card as CardType).stock > 0 ? "В корзину" : "Заказать"}
              onClick={handleButtonClick}
              ref={buttonRef}
            >
              <label>
                {(card as CardType).stock > 0 ? "В корзину" : "Заказать"}
              </label>
            </button>
            :
            <span>
              <i className="fa-solid fa-check"></i>
              &nbsp;
              В корзине
            </span>
          }
        </div>
      </div>
      <OrderForm
        key={`${openOrderForm}`}
        open={openOrderForm}
        handleClose={setOpenOrderForm.bind(this,false)}
        submitData={handleSubmitData}
      />
    </>
  );
};
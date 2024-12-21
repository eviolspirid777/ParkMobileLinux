"use client";
import React, { FC, useEffect, useReducer, useState } from "react";
import styles from "./Products.module.scss";
import { ProductCard } from "./ProductCard/ProductCard";
import { CardType } from "../../../Types/CardType";
import { useAtom } from "jotai";
import { DataType, shopBucketAtom } from "@/Store/ShopBucket";
import { ProductModal } from "./ProductModal/ProductModal";
import { useGetItemById } from "@/hooks/useGetItemById";

// import Image from "next/image";

type ProductsType = {
  cards?: CardType[];
  itemsCount: number | undefined;
  currentPage: number;
  onPageChange: (skip: number, page: number) => void;
};

type ReducerType = {
  skip: number;
  take: number;
  currentPage: number;
  itemsLength: number;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (
  state: unknown,
  { skip, take, currentPage, itemsLength }: ReducerType
) => {
  const totalPages = Math.ceil(itemsLength / take);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return {
    pages,
    currentPage: Math.min(currentPage, totalPages),
    skip,
    take,
  };
};

// const MarkdownContent = `
// Добро пожаловать в мир безграничных возможностей и качественного звука с наушниками **Apple AirPods Pro 2**. Эти ультрасовременные наушники объединяют в себе передовые технологии и высокое качество исполнения, чтобы удовлетворить даже самых требовательных пользователей.

// *Основные характеристики:*

// 1. **Беспроводное подключение через Bluetooth 5.3:** Самая последняя версия Bluetooth обеспечивает стабильное и быстрое подключение к вашему устройству для безупречного воспроизведения звука.
// 2. **Открытый акустический тип:** Наушники AirPods Pro 2 предлагают открытый акустический тип, который обеспечивает естественный и просторный звук, а также комфортное ношение на протяжении долгих периодов времени.
// 3. **Активное подавление шума:** Встроенная система активного подавления шума позволяет вам погрузиться в мир музыки, изолируя вас от внешних шумов и помех.
// 4. **Беспроводная зарядка:** Заряжайте наушники без лишних проводов благодаря беспроводной зарядной платформе, входящей в комплект поставки.
// 5. **Управление воспроизведением:** С удобными сенсорными поверхностями вы можете легко управлять воспроизведением музыки и отвечать на звонки, не прибегая к использованию устройства.
// 6. **Длительное время работы:** Благодаря мощному аккумулятору вы можете наслаждаться музыкой в течение до 30 часов без перерыва.

// Не имеет значения, слушаете ли вы музыку, смотрите фильмы или занимаетесь спортом, наушники AirPods Pro 2 обеспечат вам непревзойденное качество звука и комфортное использование в любой ситуации.
// `;

export const Products: FC<ProductsType> = ({
  cards,
  itemsCount,
  currentPage,
  onPageChange,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    pages: [],
    currentPage: 1,
    skip: 0,
    take: 16,
  });
  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);

  const [openProductCard, setOpenProductCard] = useState<{
    state: boolean;
    id: number | null;
  }>({ state: false, id: null });

  const { cardData, mutate } = useGetItemById();

  useEffect(() => {
    if (openProductCard.id !== null) {
      mutate(openProductCard.id);
    }
  }, [openProductCard.id]);

  useEffect(() => {
    if (itemsCount !== undefined) {
      dispatch({
        skip: (currentPage - 1) * 16,
        take: 16,
        currentPage,
        itemsLength: itemsCount,
      });
    }
  }, [itemsCount, currentPage]);

  const handlePageClick = (page: number) => {
    const newSkip = (page - 1) * 16;
    onPageChange(newSkip, page);
  };

  const handleAddToBucket = () => {
    if (cardData && Array.isArray(shopBucket)) {
      setShopBucket((previousShopBucket: DataType[]) => {
        if (previousShopBucket.some((item) => item.id === cardData.id)) {
          const newData = previousShopBucket.map((element) => {
            if (element.id === cardData.id) {
              return { ...element, count: element.count + 1 };
            }
            return element;
          });

          return newData;
        }

        return [
          ...previousShopBucket,
          {
            id: cardData.id!,
            name: cardData.name!,
            article: cardData.article!,
            count: 1,
            image: cardData.image!,
            price: cardData.price!,
            discountPrice: cardData.discountPrice ?? "",
          },
        ];
      });
      setOpenProductCard({ id: null, state: false });
    }
  };

  useEffect(() => {
    if (openProductCard.state) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openProductCard.state]);

  return (
    <>
      <div className={styles["product"]}>
        <div className={styles["product-cards-block"]}>
          {cards &&
            cards.map((el, index) => (
              <ProductCard
                key={index}
                card={el}
                onClick={setOpenProductCard.bind(this, {
                  state: true,
                  id: el.id ?? null,
                })}
              />
            ))}
        </div>
        <div className={styles["product-pagination-block"]}>
          {state.pages.map((el) => (
            <div
              key={el}
              className={`${styles["product-pagination-block-item"]} ${
                state.currentPage === el ? styles.selected : ""
              }`}
              onClick={() => handlePageClick(el)}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
      <ProductModal
        CardData={cardData}
        closeModal={setOpenProductCard.bind(this, { state: false, id: null })}
        handleAddToBucket={handleAddToBucket}
        openProductCard={openProductCard}
      />
    </>
  );
};

"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./PopularItems.module.scss";
import { useEffect, useState } from "react";
import { useGetPopularItems } from "@/hooks/useGetPopularItems";
import { ProductModal } from "../Catalog/Products/ProductModal/ProductModal";
import { useAtom } from "jotai";
import { DataType, shopBucketAtom } from "@/Store/ShopBucket";
import { useGetItemById } from "@/hooks/useGetItemById";

import Image from "next/image"
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";
import { Skeleton } from "antd";
// import { isItemOpenedAtom } from "@/Store/OpenedItem";

export const PopularItems = () => {
  const { 
    popularItemsList,
    popularItemsIsLoading
  } = useGetPopularItems();

  const [isClient, setIsClient] = useState(false);

  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);
  // const [, setIsItemOpened] = useAtom(isItemOpenedAtom);

  const { cardData, mutate } = useGetItemById();

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
            weight: cardData.weight,
            discountPrice:
              typeof cardData.discountPrice === "string"
                ? parseFloat(cardData.discountPrice) // Преобразуем строку в число
                : cardData.discountPrice ?? undefined, // Используем undefined, если discountPrice отсутствует
          },
        ];
      });
      setOpenProductCard({ id: null, state: false });
    }
  };

  const [openProductCard, setOpenProductCard] = useState<{
    state: boolean;
    id: number | null;
  }>({ state: false, id: null });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenCard = (id: number) => {
    mutate(id ?? -1);
    setOpenProductCard({
      id: id,
      state: true,
    });
    // setIsItemOpened(true)
  };

  return (
    <div className={styles["popular-items"]}>
      {
        popularItemsIsLoading ? 
          <>
            <Skeleton.Input active style={{width: "250px", height: "50px"}}/>
            <div
              style={{
                display: "flex",
                flexFlow: "row nowrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "120px"
              }}
            >
              {
                (isClient && window.screen.width > 1024 ? [1,2,3,4,5] : [1,2]).map((el, index) => (
                  <div
                    key={index}
                  >
                    <Skeleton.Node
                      style={
                        isClient && window.screen.width > 1024 ?
                        {
                          width:"250px",
                          height: "320px"
                        } :
                        {
                          width: "110px",
                          height: "180px"
                        }
                      }
                      active
                    />
                  </div>
                ))
              }
            </div>
          </> :
          <>
            <h2 className={styles["header"]}>Популярные товары</h2>
            <div className={`${styles["popular-items-block"]} popular-items`}>
              <Swiper
                pagination={
                  isClient && window.screen.width > 1024
                    ? undefined
                    : { clickable: true }
                }
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                navigation={isClient && window.screen.width > 1024 ? true : false}
                modules={
                  isClient && window.screen.width > 1024
                    ? [Navigation, Pagination, Autoplay]
                    : [Autoplay]
                }
                className="mySwiper"
                slidesPerView={isClient && window.screen.width > 1024 ? 5 : 2}
              >
                {
                  popularItemsList?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className={styles["popular-items-block-item"]}
                        onClick={handleOpenCard.bind(null, item.id ?? -1)}
                      >
                        <Image src={`data:image/jpeg;base64,${item.image}`} alt={item.name} width={60} height={60} quality={100}/>
                        <div className={styles["popular-items-block-price-block"]}>
                          <span className={styles["popular-items-block-item-tag"]}>
                            {item.name}
                          </span>
                          <div
                            className={styles["popular-items-block-price-block-prices"]}
                          >
                            <span
                              className={`${styles["popular-items-block-item-price"]} ${
                                item.discountPrice && styles["discount"]
                              }`}
                            >
                              {convertToIntlFormat(item.price)} ₽
                            </span>
                            {item.discountPrice && (
                              <span
                                className={styles["popular-items-block-item-price"]}
                              >
                                {convertToIntlFormat(item.discountPrice)} ₽
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )) 
                }
              </Swiper>
            </div>
          </>
      }
      <ProductModal
        CardData={cardData}
        openProductCard={openProductCard}
        closeModal={setOpenProductCard.bind(null, {
          id: null,
          state: false,
        })}
        handleAddToBucket={handleAddToBucket}
      />
    </div>
  );
};

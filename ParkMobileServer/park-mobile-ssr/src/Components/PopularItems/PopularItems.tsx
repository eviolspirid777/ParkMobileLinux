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
import { shopBucketAtom } from "@/Store/ShopBucket";
import { useGetItemById } from "@/hooks/useGetItemById";

export const PopularItems = () => {
  const { popularItemsList } = useGetPopularItems();

  const [isClient, setIsClient] = useState(false);

  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);
  const { cardData, mutate } = useGetItemById();

  const handleAddToBucket = () => {
    if (cardData && Array.isArray(shopBucket)) {
      setShopBucket((previousShopBucket) => {
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
  };

  if (!popularItemsList) {
    return <div className={styles["popular-items-none"]} />;
  }

  return (
    <div className={styles["popular-items"]}>
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
          style={{
            paddingTop: "3%",
          }}
        >
          {popularItemsList?.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={styles["popular-items-block-item"]}
                onClick={handleOpenCard.bind(null, item.id ?? -1)}
              >
                {/* <div className={styles["popular-items-block-item-gurantee"]}>
                  Гарантия
                </div> */}
                <img src={`data:image/jpeg;base64,${item.image}`} alt="" />
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
                      {item.price} ₽
                    </span>
                    {item.discountPrice && (
                      <span
                        className={styles["popular-items-block-item-price"]}
                      >
                        {item.discountPrice} ₽
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
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

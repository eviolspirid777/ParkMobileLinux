"use client";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./TilesMobile.module.scss";
import { useAtom } from "jotai";
import { categoryAtom } from "@/Store/FiltersStore";
import { animateScroll as scroll } from "react-scroll";

export const TilesMobile = () => {
  const [isClient, setIsClient] = useState(false);
  const [, setCategories] = useAtom(categoryAtom);

  const handleCategory = (category: string) => {
    scroll.scrollTo(2552, {
      duration: 50,
      smooth: true,
    });

    setCategories(category);
  };

  const tilesItems = [
    {
      image: "images/TilesImages/AppleWatchTile/appleWatchTileReviewed.png",
      header: "Apple Watch",
      text: "Умнее. Ярче. Могущественнее",
      color: "white",
      action: () => handleCategory("Watch"),
    },
    {
      image: "images/TilesImages/MacBookTile/macBookReviewed.png",
      header: "MacBook Pro",
      text: "Сногсшибательный. Вскружит голову.",
      color: "black",
      action: () => handleCategory("Mac"),
    },
    {
      image: "images/TilesImages/AirpodsTile/PodsTileReviewed.png",
      header: "AirPods Pro",
      text: "Никаких проводов. Только магия звука.",
      color: "white",
      action: () => handleCategory("Airpods"),
    },
    {
      image: "images/TilesImages/IpadTile/ipadTileReviewed.png",
      header: "iPad",
      text: "Твой следующий компьютер - не компьютер.",
      color: "black",
      action: () => handleCategory("iPad"),
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Swiper
      modules={isClient ? [Navigation, Pagination, Autoplay] : [Autoplay]}
      pagination={isClient ? undefined : { clickable: true }}
      navigation={isClient ? true : false}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="mySwiper"
      style={{
        paddingTop: "3%",
      }}
    >
      {tilesItems.map((el) => (
        <SwiperSlide key={el.header}>
          <div
            className={styles["popular-item-slide"]}
            style={{
              backgroundImage: `url(${el.image})`,
              color: `${el.color}`,
            }}
          >
            <div className={styles["popular-item-slide-block"]}>
              <h2>{el.header}</h2>
              <span>{el.text}</span>
              <div className={styles["button-block"]}>
                <button data-button="купить" onClick={el.action}>
                  Купить
                </button>
                <button data-button="подробнее" onClick={el.action}>
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

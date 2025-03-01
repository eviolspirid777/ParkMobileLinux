"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./TilesMobile.module.scss";

export const TilesMobile = () => {
  const [isClient, setIsClient] = useState(false);
  const naviagate = useRouter();

  const handleCategory = (route: string) => {
    naviagate.push(route)
  };

  const tilesItems = [
    {
      image: "images/TilesImages/AppleWatchTile/appleWatchTileReviewedMobile.jpg",
      header: "Apple Watch",
      text: "Умнее. Ярче. Могущественнее",
      color: "white",
      action: () => handleCategory("Watch"),
      route: "/categories/Apple/watches",
    },
    {
      image: "images/TilesImages/MacBookTile/macBookReviewedMobile.jpg",
      header: "MacBook Pro",
      text: "Сногсшибательный. Вскружит голову.",
      route: "/categories/Apple/MacBook",
      color: "black",
      action: () => handleCategory("Mac"),
    },
    {
      image: "images/TilesImages/AirpodsTile/PodsTileReviewedMobile.jpg",
      header: "AirPods",
      text: "Никаких проводов. Только магия звука.",
      route: "/categories/Apple/AirPods",
      color: "white",
      action: () => handleCategory("Airpods"),
    },
    {
      image: "images/TilesImages/IpadTile/ipadTileReviewedMobile.jpg",
      header: "iPad",
      text: "Твой следующий компьютер - не компьютер.",
      color: "black",
      route: "/categories/Apple/iPad",
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
            }}
          >
            <div className={styles["popular-item-slide-block"]}>
              <h2>{el.header}</h2>
              <span>{el.text}</span>
              <div className={styles["button-block"]}>
                <button
                  data-button="купить"
                  onClick={handleCategory.bind(null, el.route)}
                >
                  Купить
                </button>
                <button
                  data-button="подробнее"
                  onClick={handleCategory.bind(null, el.route)}
                >
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

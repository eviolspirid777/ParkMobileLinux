"use client"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Swiper.module.scss";
import { fetchImages } from "./fetchImages";
import Image from "next/image";

export const SwiperList = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const cachedImages = localStorage.getItem("cachedImages");
    if (cachedImages) {
      setImages(JSON.parse(cachedImages));
    } else {
      fetchImages().then((fetchedImages) => {
        setImages(fetchedImages);
        localStorage.setItem("cachedImages", JSON.stringify(fetchedImages));
      });
    }
  }, []);

  return (
    <Swiper
      navigation={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            className={styles["image-container"]}
            src={`data:image/jpeg;base64,${image}`}
            alt=""
            width={1200}
            height={300}
            layout="relative"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
"use client";
import React from "react";
import styles from "./UnderTilesLogos.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const UnderTilesLogos = () => {
  const navigate = useRouter();

  const images = [
    {
      image: "/images/ItemsLogos/apple.webp",
      link: "Apple",
    },
    {
      image: "/images/ItemsLogos/dyson.webp",
      link: "Dyson",
    },
    {
      image: "/images/ItemsLogos/samsung.webp",
      link: "Samsung",
    },
    {
      image: "/images/ItemsLogos/xiaomi.webp",
      link: "Xiaomi",
    },
    {
      image: "/images/ItemsLogos/sony.webp",
      link: "Gaming",
    },
    {
      image: "/images/ItemsLogos/yandex.webp",
      link: "Headphones/yandex",
    },
  ];

  const handleRoute = (route: string) => {
    navigate.push(`/categories/${route}`);
  };

  return (
    <div className={styles["under-tiles-logos-block"]}>
      {images.map((image, key) => (
        <Image
          src={image.image}
          key={key}
          alt={`image_${key}`}
          height="300"
          width="300"
          onClick={handleRoute.bind(null, image.link)}
        />
      ))}
    </div>
  );
};

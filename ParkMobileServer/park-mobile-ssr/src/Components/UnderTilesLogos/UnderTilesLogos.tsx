"use client";
import React from "react";
import styles from "./UnderTilesLogos.module.scss";
import { useRouter } from "next/navigation";

export const UnderTilesLogos = () => {
  const navigate = useRouter();

  const images = [
    {
      image: "/images/ItemsLogos/apple.png",
      link: "Apple",
    },
    {
      image: "/images/ItemsLogos/dyson.png",
      link: "Dyson",
    },
    {
      image: "/images/ItemsLogos/samsung.png",
      link: "Samsung",
    },
    {
      image: "/images/ItemsLogos/sony.png",
      link: "Gaming",
    },
  ];

  const handleRoute = (route: string) => {
    navigate.push(`/categories/${route}`);
  };

  return (
    <div className={styles["under-tiles-logos-block"]}>
      {images.map((image, key) => (
        <img
          src={image.image}
          key={key}
          alt=""
          height="300"
          width="300"
          onClick={handleRoute.bind(null, image.link)}
        />
      ))}
    </div>
  );
};

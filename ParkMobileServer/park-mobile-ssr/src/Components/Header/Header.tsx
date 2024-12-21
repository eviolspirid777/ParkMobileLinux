"use client";
import { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { FC } from "react";
import React from "react";
import { ContentType } from "@/Types/SliderContentType";
import { useAtom } from "jotai";
import { shopBucketAtom } from "@/Store/ShopBucket";

type HeaderProps = {
  mouseEnter: (
    type: ContentType,
    tiles: string[] | undefined,
    subTitles: string[] | undefined
  ) => void;
  handleMouseClick: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void;
  handleMouseCategoryEnter: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  handleMainMenuRoute: () => void;
  handleShopBag: () => void;
};

export const Header: FC<HeaderProps> = ({
  mouseEnter,
  handleMouseClick,
  handleMainMenuRoute,
  handleShopBag,
  handleMouseCategoryEnter,
}) => {
  const linkedItems = [
    {
      navTitle: "Apple",
      titles: [
        "iPhone",
        "MacBook",
        "iPad",
        "Apple Watch",
        "AirPods",
        "Apple TV",
      ],
      subTitles: ["Заявка на Трейд-Ин", "Заявка на ремонт"],
    },
    {
      navTitle: "Samsung",
      titles: ["Смартфоны", "Наушники", "Умные часы"],
      subTitles: ["Заявка на Трейд-Ин", "Заявка на ремонт"],
    },
    {
      navTitle: "Xiaomi",
      titles: ["Смартфоны", "Наушники", "ТВ Приставки"],
      subTitles: ["Заявка на Трейд-Ин", "Заявка на ремонт"],
    },
    {
      navTitle: "Dyson",
      titles: [
        "Стайлеры",
        "Фены",
        "Выпрямители",
        "Пылесосы",
        "Очистители воздуха",
      ],
    },
    {
      navTitle: "Акустика и гарнитура",
      titles: ["Яндекс Станции", "JBL", "Marshall"],
    },
    {
      navTitle: "Гейминг",
      titles: [
        "Sony Playstation",
        "Xbox",
        "Nintendo",
        "Steam Deck",
        "Аксессуары",
      ],
    },
  ];

  const [shopBucket] = useAtom(shopBucketAtom);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  const handleMouseEnter = (
    type: ContentType,
    titles: string[] | undefined,
    subTitles: string[] | undefined
  ) => {
    mouseEnter(type, titles, subTitles);
  };

  useEffect(() => {
    const controller = new AbortController();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 420;

      if (scrollPosition >= threshold) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <header
      className={`${styles["header"]} ${
        isHeaderHidden ? styles["header-hidden"] : ""
      }`}
    >
      <img
        src={"/images/Logo/Logo.svg"}
        alt=""
        className={styles["logo"]}
        onClick={handleMainMenuRoute}
        draggable="false"
      />
      <nav className={styles["nav-bar"]}>
        {linkedItems.map((el) => (
          <a
            key={el.navTitle}
            className={styles["nav-item"]}
            onMouseEnter={(event) => {
                handleMouseEnter("menu", el.titles, el.subTitles);
                handleMouseCategoryEnter(event);
              }
            }
            onClick={handleMouseClick}
          >
            {el.navTitle}
          </a>
        ))}
      </nav>
      <nav className={styles["nav-bucket-search"]}>
        <i
          className="fa-thin fa-magnifying-glass fa-lg"
          onClick={() => handleMouseEnter("search", undefined, undefined)}
          onMouseEnter={() => handleMouseEnter("search", undefined, undefined)}
        />
        <div className={styles["nav-bucket-search-shop-block"]}>
          <span>{shopBucket.length}</span>
          <i
            className="fa-sharp fa-thin fa-bag-shopping fa-lg"
            onClick={handleShopBag}
          />
        </div>
      </nav>
    </header>
  );
};

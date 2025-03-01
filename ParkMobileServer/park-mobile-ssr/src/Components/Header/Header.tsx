"use client";
import styles from "./Header.module.scss";
import { FC, useEffect } from "react";
import React from "react";
import { ContentType } from "@/Types/SliderContentType";
import { useAtom } from "jotai";
import { shopBucketAtom } from "@/Store/ShopBucket";
import Image from "next/image"
import Link from "next/link";
import { Dropdown, MenuProps } from "antd";

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

const items: MenuProps["items"] = [
  {
    key: "1",
    label: 
    <Link href="/help/delivery">
      Доставка и оплата
    </Link>,
  },
  {
    key: "2",
    label: 
    <Link href="/help/gurantee">
      Гарантии и возврат
    </Link>,
  },
  {
    key: "3",
    label: 
    <Link href="/help/trade-in">
      Trade-in
    </Link>,
  },
  {
    key: "4",
    label: 
    <Link href="/help/credit">
      Рассрочка и кредит
    </Link>,
  },
]

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
        "Sony",
        "Xbox",
        "Nintendo",
        "Steam Deck",
        "Аксессуары",
      ],
    },
  ];

  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);

  useEffect(() => {
    const localShopBucket = localStorage.getItem("shopBucket");
    if(localShopBucket) {
      const shopBucket = JSON.parse(localShopBucket);
      setShopBucket(shopBucket)
    }
  }, [])

  useEffect(() => {
    const _shopBucket = JSON.stringify(shopBucket);
    localStorage.setItem("shopBucket", _shopBucket);
  }, [shopBucket])

  const handleMouseEnter = (
    type: ContentType,
    titles: string[] | undefined,
    subTitles: string[] | undefined
  ) => {
    mouseEnter(type, titles, subTitles);
  };

  return (
    <header
      className={`${styles["header"]}`}
    >
      <Image
        src={"/images/Logo/Logo.svg"}
        alt="logo"
        width={50}
        height={50}
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
      <nav
        className={styles["nav-bar-moreover"]}
      >
        <Dropdown
          menu={{
            items
          }}
        >
          <a>Помощь</a>
        </Dropdown>
        <Link href="/about/contacts">О компании</Link>
      </nav>
      <nav className={styles["nav-bucket-search"]}>
        <i
          className="fa-thin fa-magnifying-glass fa-lg"
          onClick={() => handleMouseEnter("search", undefined, undefined)}
          onMouseEnter={() => handleMouseEnter("search", undefined, undefined)}
        />
        <div className={styles["nav-bucket-search-shop-block"]}>
          <span>
            {shopBucket.length}
          </span>
          <i
            className="fa-sharp fa-thin fa-bag-shopping fa-lg"
            onClick={handleShopBag}
          />
        </div>
      </nav>
    </header>
  );
};

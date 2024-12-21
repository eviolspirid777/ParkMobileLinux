"use client";
import { FC, useEffect, useState } from "react";
import styles from "./MobileHeader.module.scss";
import { TelegramIcon } from "@/Components/Footer/Telegram";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { useAtom } from "jotai";
import { Drawer } from "antd";
import { useRouter } from "next/navigation";

import { MobileHeaderCatalog } from "./MobileHeaderBlocks/Catalog/MobileHeaderCatalog";
import { MobileHeaderAbout } from "./MobileHeaderBlocks/About/MobileHeaderAbout";
import { MobileHeaderHelp } from "./MobileHeaderBlocks/Help/MobileHeaderHelp";
import { MobileHeaderSubscribe } from "./MobileHeaderBlocks/Subscribe/MobileHeaderSubscribe";
import { MobileSearchMenu } from "./MobileSearchMenu/MobileSearchMenu";

type MobileHeaderProps = {
  handleMainMenuRoute: () => void;
  handleShopBag: () => void;
};

export const MobileHeader: FC<MobileHeaderProps> = ({
  handleMainMenuRoute,
  handleShopBag,
}) => {
  const [shopBucket] = useAtom(shopBucketAtom);
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedDrawer, setSelectedDrawer] = useState("");

  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const naviagate = useRouter();

  useEffect(() => {
    const _html = document.documentElement; // Изменяем html
    const _body = document.body;

    if (isMenuOpened) {
      _html.style.overflow = "hidden"; // Отключаем скролл на html
      _body.style.overflow = "hidden"; // Отключаем скролл на body
    } else {
      _html.style.overflow = "visible"; // Включаем скролл на html
      _body.style.overflow = "visible"; // Включаем скролл на body
    }

    return () => {
      _html.style.overflow = "visible"; // Сбрасываем стили при размонтировании
      _body.style.overflow = "visible"; // Сбрасываем стили при размонтировании
    };
  }, [isMenuOpened]);

  const drawerDictionary = new Map([
    ["catalog", () => <MobileHeaderCatalog handlePath={handleNavigate} />],
    ["about", () => <MobileHeaderAbout handlePath={handleNavigate} />],
    ["help", () => <MobileHeaderHelp handlePath={handleNavigate} />],
    ["subscribe", () => <MobileHeaderSubscribe />],
  ]);

  const handleNavigate = (path: string) => {
    naviagate.push(path);
    setOpen(false);
    setIsMenuOpened(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpened((prev) => !prev);
  };

  const handleDrawer = (
    category: "catalog" | "about" | "help" | "subscribe"
  ) => {
    setOpen(true);
    setSelectedDrawer(category);
  };

  const handleSearchMenuToggle = () => {
    setSearchMenuOpen((previous) => !previous);
  };

  return (
    <>
      <nav>
        <div className={styles["navbar"]}>
          <div className={`${styles["container"]} ${styles["nav-container"]}`}>
            <input
              className={styles["checkbox"]}
              type="checkbox"
              id="menuToggle"
              checked={isMenuOpened}
              onChange={handleMenuToggle}
            />
            <div
              className={styles["hamburger-lines"]}
              onClick={handleMenuToggle}
            >
              <span className={`${styles["line"]} ${styles["line1"]}`}></span>
              <span className={`${styles["line"]} ${styles["line2"]}`}></span>
              <span className={`${styles["line"]} ${styles["line3"]}`}></span>
            </div>
            <div className={styles["logo-container"]}>
              <img
                src={"/images/Logo/Logo.svg"}
                alt="Логотип"
                className={styles["image"]}
                onClick={handleMainMenuRoute}
                draggable="false"
              />
              <div className={styles["nav-bucket-search"]}>
                <i
                  className="fa-thin fa-magnifying-glass fa-lg"
                  onClick={handleSearchMenuToggle}
                />
                <div className={styles["nav-bucket-search-shop-block"]}>
                  <span>{shopBucket.length}</span>
                  <i
                    className="fa-sharp fa-thin fa-bag-shopping fa-lg"
                    onClick={handleShopBag}
                  />
                </div>
              </div>
            </div>
            <div className={styles["menu-items"]}>
              <li>
                <a href="#" onClick={handleDrawer.bind(this, "catalog")}>
                  Каталог
                </a>
              </li>
              <li>
                <a href="#" onClick={handleDrawer.bind(this, "about")}>
                  О компании
                </a>
              </li>
              <li>
                <a href="#" onClick={handleDrawer.bind(this, "help")}>
                  Помощь
                </a>
              </li>
              <li>
                <a href="#" onClick={handleDrawer.bind(this, "subscribe")}>
                  Подпишись
                </a>
              </li>
              <li>
                <a href="#" onClick={console.log}>
                  Контакты
                </a>
              </li>
              <div className={styles["menu-items-description"]}>
                Магазин цифровой техники Park Mobile — ведущий поставщик
                оригинальной техники в Краснодаре. Мы рады предложить вам
                продукцию топовых марок, включая Apple, Dyson, Samsung, DJI,
                Xiaomi и многие другие.
              </div>
              <div className={styles["menu-items-contact-block"]}>
                <a href="tel:89337772777">+7 933 777‑27‑77</a>
                <div className={styles["menu-items-contact-block-social"]}>
                  <a href="https://t.me/@ParkMobile23">
                    <TelegramIcon />
                  </a>
                  <a href="https://wa.me/79337772777">
                    <img
                      src={"/images/AboutContacts/WhatssApp.png"}
                      height={46}
                      width={46}
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {searchMenuOpen && (
        <MobileSearchMenu
          isOpened={searchMenuOpen}
          handleCloseSearch={setSearchMenuOpen.bind(this, false)}
        />
      )}
      <Drawer
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        width="100%"
        className={styles["drawer"]}
        closeIcon={
          <i className="fa-solid fa-xmark fa-2xl" style={{ color: "white" }} />
        }
      >
        <div className={styles["drawer-body"]}>
          {drawerDictionary.get(selectedDrawer)?.()}
        </div>
      </Drawer>
    </>
  );
};

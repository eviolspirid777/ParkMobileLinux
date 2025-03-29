"use client"
import { Button, ConfigProvider } from "antd";
import { useRouter } from "next/navigation";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import styles from "./Success.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Success = () => {
  const navigate = useRouter();
  const [isRendered, setIsRendered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsRendered(true);
    setIsMobile(window.innerWidth < 1024);
  }, [isRendered])

  const handleNavigateHome = () => {
    navigate.push("/")
  }

  return (
    <YMaps>
      <div
        className={styles["success-block-container"]}
      >
        <div className={styles["success-block-container-info-block"]}>
          <h3>Заказ совершен успешно!</h3>
          <p>Ожидайте звонка менеджера для подтверждения заказа</p>
          <ConfigProvider
            key="1"
            theme={{
              components: {
                Button: {
                  colorPrimary: '#829a86',
                  colorPrimaryHover: '#a2c0a7',
                  colorPrimaryActive: '#768d7a',
                }
              }
            }}
          >
            <Button
              type="primary"
              onClick={handleNavigateHome}
            >
              На главную
            </Button>
          </ConfigProvider>
        </div>
        <div className={styles["success-block-container-secondary-block"]}>
          <div className={styles["success-block-container-secondary-block-info-block"]}>
            <p>Остались вопросы? Свяжитесь с нами</p>
            <div className={styles["success-block-container-secondary-block-info-block-icons"]}>
              <a href="https://wa.me/79337772777">
                <Image src={"/images/AboutContacts/WhatssApp.webp"} alt="Whatsapp" height={30} width={30}/>
              </a>
              <a href="https://t.me/parkmobile_krasnodar">
                <Image src={"/images/AboutContacts/telegram.png"} alt="Telegram" height={30} width={30}/>
              </a>
              <a href="https://vk.com/parkmobile">
                <Image src={"/images/AboutContacts/vk.png"} alt="Vk" height={30} width={30}/>
              </a>
            </div>
            <a href="tel:79337772777">+7 933 777-27-77</a>
          </div>
          <Map
            defaultState={{ center: [45.018244, 38.965192], zoom: 17 }}
            width={(isRendered && !isMobile) ? "700px" : "280px"}
            height="360px"
            onLoad={(ymaps) => {
              console.log(ymaps);
            }}
          >
            <Placemark geometry={[45.018244, 38.965192]} />
          </Map>
          <p>Краснодар, ул. Советская, 36</p>
        </div>
      </div>
    </YMaps>
  )
}
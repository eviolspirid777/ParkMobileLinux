"use client"
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import styles from "./AboutMainPage.module.scss";

export const AboutMainPage = () => {
  return (
    <YMaps>
      <div className={styles["about-contacts-block"]}>
        <div
          className={styles["about-contacts-block-map"]}
        >
          <h3>Мы на карте</h3>
          <Map
            defaultState={{ center: [45.018244, 38.965192], zoom: 17 }}
            width="100%"
            height="360px"
            onLoad={(ymaps) => {
              console.log(ymaps);
            }}
          >
            <Placemark geometry={[45.018244, 38.965192]} />
          </Map>
        </div>
        <div
          className={styles["about-contacts-block-about"]}
        >
          <div className={styles["about-contacts-block-info-block"]}>
            <h3>О компании</h3>
            <h3>Park Mobile</h3>
          </div>
          <div className={styles["about-contacts-block-info-block-text"]}>
            <span>
              Вас приветствует салон цифровой техники Park Mobile. Мы являемся
              ведущим поставщиком оригинальной техники в Краснодаре и рады
              предложить вам продукцию топовых марок, включая Apple, Dyson,
              Samsung, DJI, Xiaomi и многие другие.
            </span>
            <span>
              С Park Mobile вы можете быть уверены в надежности и безопасности
              покупок. Мы гарантируем оригинальность всех товаров и предлагаем
              гибкие условия оплаты и доставки по всей России.
            </span>
          </div>
        </div>
      </div>
    </YMaps>
  )
}
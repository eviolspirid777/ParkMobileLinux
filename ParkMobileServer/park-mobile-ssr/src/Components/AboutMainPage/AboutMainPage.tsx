"use client"
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import styles from "./AboutMainPage.module.scss";
import { Comments } from "../Comments/Comments";

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
            height="300px"
            onLoad={(ymaps) => {
              console.log(ymaps);
            }}
          >
            <Placemark geometry={[45.018244, 38.965192]} />
          </Map>
          <Comments />
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
              Park Mobile - Ваш надежный партнер в мире техники. 
            </span>
            <span>
              Вас приветствует салон цифровой техники Park Mobile. Мы радуем своих клиентов широким ассортиментом смартфонов,
              планшетов, ноутбуков, игровых консолей, аудио-видео техники,
              а также аксессуаров и других гаджетов.
              В Park Mobile вы найдете все, что нужно для комфортного общения, работы и развлечений в цифровом мире.
            </span>
            <span>
              С 2021 года мы начали свою деятельность как интернет-магазин. 
              В ответ на возрастающий спрос и стремление обеспечить максимальный комфорт нашим клиентам, мы открыли наш первый оффлайн-магазин в г. Краснодар по адресу: ул. Советская, дом 36.
            </span>
            <span>
              Мы гордимся нашим молодым и энергичным коллективом, который стремится найти индивидуальный подход к каждому клиенту. 
              Качественное обслуживание, профессиональные консультации и помощь в выборе идеального устройства — наши приоритеты.
            </span>
            <span>
              В нашем магазине представлены мировые бренды: Apple, Samsung, Xiaomi, Dyson, Sony, xBox, DJI, Marshall, Yandex.
              Наш ассортимент ежедневно растет, продолжая приносить радость нашим клиентам.
            </span>
            <span>
              Мы не собираемся останавливаться на достигнутых результатах и планируем открытие новых магазинов в разных районах г.Краснодара и Краснодарского края для обеспечения максимального удобства наших клиентов. 
            </span>
          </div>
        </div>
      </div>
    </YMaps>
  )
}
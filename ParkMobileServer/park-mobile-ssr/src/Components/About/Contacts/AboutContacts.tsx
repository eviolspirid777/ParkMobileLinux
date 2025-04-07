"use client";
import styles from "./AboutContacts.module.scss";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { TelegramIcon } from "../../Footer/Telegram";

import Image from "next/image";
import { useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import { apiClient } from "@/api/ApiClient";

export const AboutContacts = () => {
  const [api, contextHolder] = notification.useNotification();

  const handleCallRequest = async () => {
    api.destroy();

    const handleFormFinish = async ({ number }: { number: string }) => {
      await apiClient.PostCall(number).then(() => api.destroy());
    };

    api.open({
      message: "",
      description: (
        <Form onFinish={handleFormFinish}>
          <div className={styles["notification-block"]}>
            <h3>Свяжитесь со мной</h3>
            <span>
              Оставьте свой номер телефона и наш менеджер вам перезвонит
            </span>
            <Form.Item name="number">
              <Input placeholder="+7 999 999 99-99" />
            </Form.Item>
            <Button
              className={styles["submit-button"]}
              type="primary"
              htmlType="submit"
            >
              Отправить
            </Button>
          </div>
        </Form>
      ),
      placement: "bottomRight",
      onClose: api.destroy,
      duration: 0,
      style: {
        width: "450px",
      },
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {contextHolder}
      <YMaps>
        <div className={styles["about-contacts-block"]}>
          <div className={styles["about-contacts-block-info-block"]}>
            <h3>О компании</h3>
            <h3>Park Mobile</h3>
          </div>
          <div className={styles["about-contacts-block-info-block-text"]}>
            <span>
              Park Mobile - Ваш надежный партнер в мире техники.
              <br/>
              <br/>
              С 2021 года мы начали свою деятельность как интернет-магазин. В ответ на возрастающий спрос и стремление обеспечить максимальный комфорт нашим клиентам, мы открыли наш первый оффлайн-магазин в г. Краснодар по адресу: ул. Советская, дом 36. 
              <br/>
              <br/>
              Мы радуем своих клиентов широким ассортиментом смартфонов, планшетов, ноутбуков, игровых консолей, аудио-видео техники, а также аксессуаров и других гаджетов. В Park Mobile вы найдете все, что нужно для комфортного общения, работы и развлечений в цифровом мире. 
              <br/>
              <br/>
              Мы гордимся нашим молодым и энергичным коллективом, который стремится найти индивидуальный подход к каждому клиенту. Качественное обслуживание, профессиональные консультации и помощь в выборе идеального устройства — наши приоритеты. 
              <br/>
              <br/>
              В нашем магазине представлены мировые бренды: Apple, Samsung, Xiaomi, Dyson, Sony, xBox, DJI, Marshall, Yandex. Наш ассортимент ежедневно растет, продолжая приносить радость нашим клиентам. 
              <br/>
              <br/>
              Мы не собираемся останавливаться на достигнутых результатах и планируем открытие новых магазинов в разных районах г.Краснодара и Краснодарского края для обеспечения максимального удобства наших клиентов. 
            </span>
            <span className={styles["about-contacts-block-info-block-text-list"]}>
              <h3>
                Что мы предлагаем:
              </h3>
              <ul>
                <li>
                  <strong>
                    Индивидуальный подход:
                  </strong>
                  <span>
                    наши менеджеры помогут вам с выбором, ответят на все вопросы и учтут ваши пожелания.
                  </span>
                </li>
                <li>
                  <strong>
                    Широкий ассортимент:
                  </strong>
                  <span>
                    от последних моделей iPhone, Samsung, Xiaomi до доступных и функциональных смартфонов и гаджетов других брендов.
                    </span>
                  </li>
                <li>
                  <strong>
                    Оригинальная продукция:
                  </strong>
                  <span>
                    гарантия качества и надежности всех устройств.
                  </span>
                </li>
                <li>
                  <strong>
                    Конкурентные цены:
                  </strong>
                  <span>
                    мы следим за рынком и предлагаем лучшие условия для наших покупателей.
                  </span>
                </li>
                <li>
                  <strong>
                    Удобное расположение и график работы:
                  </strong>
                  <span>
                    мы располагаемся в центре Краснодара (ул. Советская 36) и работаем ежедневно с 11:00 до 20:00.
                  </span>
                </li>
                <li>
                  <strong>
                    Быстрая доставка: 
                  </strong>
                  <span>
                    наши курьеры доставят оформленный Вами заказ в течение нескольких часов по Краснодару, либо отправят транспортной компанией СДЭК в день оформления в любой город России.
                  </span>
                </li>
              </ul>
            </span>
          </div>
          <blockquote>
            Park Mobile — больше, чем просто магазин. Это место, где технологии становятся ближе!
          </blockquote>
          <hr style={{ backgroundColor: "#e8e8ed" }} />
          <h3>Наши контакты</h3>
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
          <div className={styles["about-contacts-block-data-grid"]}>
            <div className={styles["about-contacts-block-data-grid-1"]}>
              <h3>Наши реквизиты:</h3>
              <div
                className={styles["about-contacts-block-data-grid-1-reqesits"]}
              >
                <span>ИП Безганс Эмиль Владимирович</span>
                <span>ОГРНИП: 323237500114924</span>
                <span>ИНН: 090108428776</span>
              </div>
              <h3>Наши контакты:</h3>
              <div
                className={styles["about-contacts-block-data-grid-1-contacts"]}
              >
                <span>г. Краснодар, ул. Советская 36</span>
                <span>(Работаем без выходных с 11:00 до 20:00)</span>
              </div>
              <div className={styles["contacts"]}>
                <a href="tel:79337772777">+7 933 777 27-77</a>
                <div>
                  <a href="https://t.me/parkmobile_krasnodar">
                    <TelegramIcon />
                  </a>
                  <a href="https://wa.me/79337772777">
                    <Image src={"/images/AboutContacts/WhatssApp.webp"} alt="Whatsapp" height={500} width={500}/>
                  </a>
                </div>
              </div>
            </div>
            <div className={styles["about-contacts-block-data-grid-2"]}>
              <span>
                Мы предлагаем доставку по Краснодару и отправку в другие города
                любым удобным для вас способом. Нужную вам позицию можно
                заказать с выдачей на следующий день.
              </span>
              <span>
                По всем вопросам обращайтесь к нашему менеджеру по указанным
                контактам.
              </span>
              <span>
                Присоединяйтесь к семье Park Mobile сегодня и откройте для себя
                мир высоких технологий с нами!
              </span>
            </div>
          </div>
          <div className={styles["about-contacts-block-questions"]}>
            <div className={styles["about-contacts-block-questions-data"]}>
              <h3>У вас возникли вопросы?</h3>
              <span>
                Позвоните или оставьте номер для связи, и мы грамотно, четко и
                ясно ответим на все вопросы.
              </span>
              <div
                className={styles["about-contacts-block-questions-data-call"]}
              >
                <h3>+7 933 777 27-77</h3>
                <button onClick={handleCallRequest}>Заказать звонок</button>
              </div>
            </div>
            <Image src={"/images/AboutContacts/Phone_demo.webp"} alt="phone_demo" height={350} width={350}/>
          </div>
        </div>
      </YMaps>
    </>
  );
};

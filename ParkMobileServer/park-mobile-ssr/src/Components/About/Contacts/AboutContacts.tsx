"use client";
import styles from "./AboutContacts.module.scss";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { TelegramIcon } from "../../Footer/Telegram";

// import img from "next/img";
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
                  <a href="https://t.me/@ParkMobile23">
                    <TelegramIcon />
                  </a>
                  <a href="https://wa.me/79337772777">
                    <img src={"/images/AboutContacts/WhatssApp.png"} alt="" />
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
            <img src={"/images/AboutContacts/Phone_demo.png"} alt="" />
          </div>
        </div>
      </YMaps>
    </>
  );
};

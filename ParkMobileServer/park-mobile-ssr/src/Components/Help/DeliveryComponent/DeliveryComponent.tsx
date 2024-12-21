import styles from "./DeliveryComponent.module.scss";
import { AccordionComponent } from "@/Shared/Components/Accordion/AccordionComponent";
import { Metadata } from "next";

import Img from "next/image";
import sdek from "./Images/SDEK.png";

export const metadata: Metadata = {
  title: "Доставка ParkMobile",
  description: "Park Mobile Краснодар",
};

export const DeliveryComponent = () => {
  const accordionData = [
    //TODO: Дописать пункты для соответсвующих значений
    [
      "Доставка и оплата по Краснодару",
      <>
        <div className={styles["krasnodar-delivery-block"]}>
          <div className={styles["krasnodar-delivery-block-delivery"]}>
            <strong>Доставка:</strong>
            <ul>
              <li>Стоимость: 500-100 рублей</li>
              <li>Срок доставки: 1 день</li>
              <li>
                Время доставки: В день заказа в пределах города, возможна
                ежедневно до 22:00.
              </li>
            </ul>
          </div>
          <span>Вы также можете забрать товар в нашем магазине</span>
          <div className={styles["krasnodar-delivery-block-payment"]}>
            <strong>Варианты оплаты:</strong>
            <ul>
              <li>Наличными при получении.</li>
              <li>Оплата на сайте через онлайн-кассу.</li>
              <li>Оплата по QR-коду.</li>
            </ul>
          </div>
        </div>
      </>,
    ],
    [
      "Доставка и оплата по России",
      <>
        <div className={styles["russia-delivery-block"]}>
          <span>
            Для доставки по всей России мы сотрудничаем с компанией СДЭК,
            которая осуществляет доставку в любую точку страны.
          </span>
          <div className={styles["russia-delivery-block-delivery"]}>
            <strong>Доставка:</strong>
            <ul>
              <li>Стоимость: по тарифам компании СДЭК</li>
              <li>
                Срок доставки: 1-7 дней, в зависимости от местоположения и
                выбранного тарифа.
              </li>
            </ul>
          </div>
          <div className={styles["russia-delivery-block-payment"]}>
            <strong>Варианты оплаты:</strong>
            <ul>
              <li>Оплата на сайте через онлайн-кассу.</li>
              <li>Оплата по QR-коду.</li>
              <li>Перевод.</li>
            </ul>
          </div>
          <div className={styles["russia-delivery-block-nodes"]}>
            <span>
              Пожалуйста, укажите ваш адрес и предпочтительный способ оплаты,
              чтобы мы могли рассчитать стоимость доставки и оформить ваш заказ
              через компанию СДЭК.
            </span>
            <span>
              Если у вас есть какие-либо вопросы или требуется дополнительная
              информация, не стесняйтесь обращаться!
            </span>
          </div>
        </div>
      </>,
    ],
    [
      "Сроки подтверждения заказа",
      'После оформления заказа на сайте мы свяжемся для подтверждения заказа выбранным вами методом. Если вы выбрали "Перезвоните мне для подтверждения заказа", менеджер свяжется с вами в течение 30 минут. Пожалуйста, проверьте корректность номера телефона. Мы обрабатываем заказы ежедневно с 11:00 до 20:00.',
    ],
    [
      "Для юридических лиц",
      "Если вас интересуют закупки для офисных нужд компании и построения бизнес-решений с учетом специфики вашего бизнеса, корпоративных подарков, мы предложим вам оптимальные условия покупки с доставкой и широким перечнем дополнительных технических сервисов. Счёт выставляется менеджером при подтверждении заказа. После выставления счета товар резервируется на 3 дня. В течение этого времени необходимо оплатить товар и сообщить менеджеру об оплате.",
    ],
  ];

  return (
    <>
      <div className={styles["delivery-block"]}>
        <div className={styles["delivery-block-payment-info"]}>
          <h3>Доставка и оплата</h3>
          <span>
            Для нас доставка - это не просто процесс, это важнейшая часть нашей
            работы. Мы понимаем, что наши клиенты ищут лучшее соотношение
            &quot;Цена-Качество&quot; и находятся по всей России, от Краснодара,
            где находится наш магазин, до Петропавловска-на-Камчатке.
          </span>
          <span>
            Мы гарантируем надежную и оперативную доставку, чтобы каждый клиент
            получил заказ в срок и в отличном состоянии.
          </span>
        </div>
        <div className={styles["delivery-block-krasnodar-delivery"]}>
          <h4>Доставка по городу Краснодару</h4>
          <ul>
            <li>Стоимость доставки: 500-1000 рублей</li>
            <li>Срок доставки: 1 день</li>
          </ul>
          <div className={styles["delivery-block-krasnodar-delivery-payment"]}>
            <h5>Варианты оплаты:</h5>
            <span>
              наличными при получении, на сайте через онлайн-кассу, по QR-коду.
            </span>
          </div>
        </div>
        <div className={styles["delivery-block-russia-delivery"]}>
          <div className={styles["delivery-block-russia-delivery-text-grid"]}>
            <h4>Доставка по России</h4>
            <ul>
              <li>Стоимость доставки: по тарифам компании</li>
              <li>Срок доставки: 1-7 дней</li>
            </ul>
            <div className={styles["delivery-block-russia-delivery-payment"]}>
              <h5>Варианты оплаты</h5>
              <span>переводом, по QR-коду.</span>
            </div>
          </div>
          <div className={styles["delivery-block-russia-delivery-image-grid"]}>
            <Img src={sdek} alt="" width="170" />
          </div>
        </div>
        <div className={styles["delivery-block-faq"]}>
          <h3>Часто задаваемые вопросы</h3>
          <AccordionComponent data={accordionData} />
        </div>
      </div>
    </>
  );
};

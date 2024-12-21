import { ConfigProvider, Steps } from "antd";
import styles from "./CreditComponent.module.scss";

export const CreditComponent = () => {
  const imagesLogos = [
    "/images/Banks/HomeKredit.png",
    "/images/Banks/RenessanceCredit.png",
    "/images/Banks/MTS.png",
    "/images/Banks/OTP_bank.png",
    "/images/Banks/PochtaBank.png",
    "/images/Banks/Russkiy_Standart.png",
    "/images/Banks/SovKomBank.png",
    "/images/Banks/Tinkoff.png",
  ];

  return (
    <div className={styles["credit-component-block"]}>
      <div className={styles["credit-component-block-conditions"]}>
        <h4>Рассрочка и кредит</h4>
        <div className={styles["credit-component-block-conditions-textblock"]}>
          <span>
            Мы понимаем, что покупка техники может быть значительным вложением,
            поэтому мы предлагаем гибкие условия оплаты, чтобы сделать процесс
            приобретения максимально удобным для наших клиентов. У нас вы можете
            воспользоваться услугами рассрочки и кредита.{" "}
          </span>
          <span>
            Мы сотрудничаем с ведущими банками и финансовыми учреждениями, чтобы
            предоставить вам возможность приобрести нужные вам товары уже
            сегодня, а оплатить их позже или в рассрочку.
          </span>
        </div>
      </div>
      <div className={styles["credit-component-block-requirments"]}>
        <h4>Оформление кредита или рассрочки</h4>
        <ul>
          <li>Вы являетесь Гражданином РФ в возрасте 18-80 лет;</li>
          <li>
            У Вас имеется постоянная регистрация по месту жительства на
            территории РФ;
          </li>
          <li>
            Вы официально трудоустроены или являетесь пенсионером по возрасту
            или выслуге лет;
          </li>
        </ul>
        <span>
          Не является публичной офертой. Уточняйте условия у наших менджеров*
        </span>
      </div>
      <div className={styles["credit-component-block-submit"]}>
        <h4>Процесс оформления</h4>
        <ConfigProvider
          theme={{
            components: {
              Steps: {
                colorPrimary: "black", // Основной цвет
              },
            },
          }}
        >
          <Steps
            className="custom-steps"
            direction="vertical"
            size="default"
            items={[
              {
                title: "Выберите товар",
                description:
                  "Добавьте в корзину один или несколько товаров. Перейдите к оформлению заказа, на последнем шаге выберите способ оплаты «В кредит». Подтвердите оформление заказа.",
                status: "process",
              },
              {
                title: "Заполните анкету и дождитесь решения по вашей заявке",
                description:
                  "После подтверждения заказа вас с вами свяжется наш менджер для заполнения анкеты. Заполните ее, следуя инструкциям. В установленный банком срок вам придет уведомление о решении по вашей кредитной заявке.",
                status: "process",
              },
              {
                title: "Подпишите кредитный договор",
                description:
                  "Подпишите документы в магазине, в отделении банка, через курьера банка или по SMS. Варианты подписания будут обозначены после одобрения вашей заявки.",
                status: "process",
              },
              {
                title: "Заберите заказ в магазине",
                description:
                  "Дождитесь уведомления о готовности заказа и заберите его в магазине. Вам потребуется паспорт.",
                status: "process",
              },
            ]}
          />
        </ConfigProvider>
      </div>
      <div className={styles["credit-component-block-partners"]}>
        <h4>Наши партнёры</h4>
        <div className={styles["credit-component-block-partners-grid-images"]}>
          {imagesLogos.map((el, key) => (
            <div
              key={key}
              data-number={key}
              className={styles["image-container"]}
            >
              <img src={el} alt="" width={250} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

"use client";
import { AccordionComponent } from "@/Shared/Components/Accordion/AccordionComponent";
import styles from "./TradeInComponent.module.scss";
import { TradeInModal } from "./TradeInModal/TradeInModal";
import { useState } from "react";
import { CustomQueryProvider } from "@/Shared/Components/CustomQueryProvider/CustomQueryProvider";


export const TradeInComponent = () => {
  const accordionData = [
    [
      "Каким образом происходит оценка моего устройства?",
      "Для оценки вашего устройства предварительно необходимо ответить на вопросы. Анкету для заполнения вы увидите при выборе модели, которую планируете сдать в Trade In. После подачи заявки менеджер ознакомится с устройством и свяжется с вами для уточнения деталей. Предварительная оценка выставляется на основе исходных данных, которые были отправлены. Обычно процедура занимает не более 5-10 минут. Менеджер пригласит вас в магазин для диагностики устройства и выкупа. Обратите внимание, что предварительная оценка устройства - это не окончательная сумма выкупа и она может измениться как в меньшую, так и в большую сторону. После проведения диагностики специалистом, составляется договор купли продажи. Стоимость вашего устройства будет учтена в виде скидки в новом товаре. Для установления цены мы используем в первую очередь агрегатор Avito, поэтому гарантируем, что вы получите рыночную оценку устройства.",
    ],
    [
      "Какие устройства принимаете в Trade-in?",
      "Мы принимаем все виды техники Apple, за исключением устаревших моделей: iPhone, iPad, Mac и Macbook, Airpods, Apple Watch. Более подробно ознакомиться с перечнем продукции вы можете, нажав на одну из моделей.",
    ],
    [
      "Могу ли я сдать свое устройство без покупки у вас нового?",
      "Да, мы можем выкупить ваше устройство и выплатить денежные средства. Для этого необходимо пройти те же самые шаги и указать в заявке, что не планируете приобретать у нас новую модель.",
    ],
    [
      "Если у меня не осталось чека от моего устройства, вы его принимаете?",
      "Да, принимаем, но это может повлиять на стоимость устройства (не сильно, но может). Главное, чтобы товар был в хорошем состоянии.",
    ],
    [
      "Сколько по времени занимает оценка устройства?",
      "Среднее время удаленной оценки менеджером - 5-10 минут. А второй этап подразумевает диагностику устройства специалистом в магазине, которая занимает не менее 30 минут. Во время обращения будет составлен акт приема передачи с указанием тех недочетов, которые были до диагностики. После того, как специалист сделает заключение, Вам будет сделано предложение с финальной оценкой вашего устройства. Будьте внимательны, что заключение действительно до конца рабочего дня.",
    ],
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <CustomQueryProvider>
        <div className={styles["trade-in-block"]}>
          <h2>
            Сдайте свою старую технику и получите скидку на покупку новой по
            программе Трейд-ин
          </h2>
          <span className={styles["header-text"]}>
            Trade-in — это умный, удобный и экологичный способ покупки новых
            устройств. Теперь вам есть куда принести свои устройства, которые вы
            решили обновить, получить при этом выгоду себе и принести пользу
            окружающей среде.
          </span>
          <button
            className={styles["submit-button"]}
            onClick={setOpen.bind(this, true)}
          >
            Подать заявку на трейд-ин
          </button>
          <div className={styles["faq-block"]}>
            <h3>Часто задаваемые вопросы</h3>
            <AccordionComponent data={accordionData} />
          </div>
        </div>
        <TradeInModal
          key={`${open}`}
          handleClose={setOpen.bind(this, false)}
          open={open}
        />
      </CustomQueryProvider>
    </>
  );
};

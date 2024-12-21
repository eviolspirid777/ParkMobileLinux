"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Footer.module.scss";
import { TelegramIcon } from "./Telegram";
import { animateScroll as scroll } from "react-scroll";
import { useAtom } from "jotai";
import { categoryAtom } from "@/Store/FiltersStore";

export const Footer = () => {
  const pathName = usePathname();
  const naviagate = useRouter();

  const [, setCategories] = useAtom(categoryAtom);

  const handlePath = (path: string, scrollValue?: number) => {
    if (pathName === path) {
      return (() => scroll.scrollTo(scrollValue ?? 0))();
    }
    naviagate.push(path);
  };

  const handleCategory = (category: string) => {
    scroll.scrollTo(window.screen.width > 1024 ? 3200 : 4200, {
      duration: 700,
      smooth: true,
    });

    setCategories(category);
  };

  return (
    <div className={styles["footer-block"]}>
      <div className={styles["footer-block-help"]}>
        <div className={styles["footer-block-help-items"]}>
          <h2>О компании</h2>
          <span onClick={handlePath.bind(this, "/about/contacts", 0)}>
            Адреса магазинов
          </span>
          <span onClick={handlePath.bind(this, "/about/contacts", 400)}>
            Контакты
          </span>
          <span onClick={handlePath.bind(this, "/about/contacts", 1310)}>
            Обратная связь
          </span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Помощь</h2>
          <span onClick={handlePath.bind(this, "/help/delivery", 0)}>
            Доставка и оплата
          </span>
          <span onClick={handlePath.bind(this, "/help/gurantee", 0)}>
            Гарантии и возврат
          </span>
          <span onClick={handlePath.bind(this, "/help/trade-in", 0)}>
            Trade-in
          </span>
          <span onClick={handlePath.bind(this, "/help/credit", 0)}>
            Рассрочка и кредит
          </span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Каталог</h2>
          <span onClick={handleCategory.bind(null, "Mac")}>Mac</span>
          <span onClick={handleCategory.bind(null, "iPhone")}>iPhone</span>
          <span onClick={handleCategory.bind(null, "Watch")}>Watch</span>
          <span onClick={handleCategory.bind(null, "iPad")}>iPad</span>
          <span onClick={handleCategory.bind(null, "Аксессуары")}>
            Аксессуары
          </span>
          <span onClick={handleCategory.bind(null, "Гаджеты")}>Гаджеты</span>
        </div>
        <div className={styles["footer-block-help-items"]}>
          <h2>Подпишись</h2>
          <a
            href="https://www.instagram.com/parkmobile_"
            title="Запрещенная в РФ организация META"
          >
            Instagram*
          </a>
          <a href="https://vk.com/parkmobile">VK</a>
          <a href="https://t.me/parkmobile_krasnodar">Telegram</a>
        </div>
        <div
          className={styles["footer-block-help-items"]}
          style={{ width: "255px" }}
        >
          <div className={styles["footer-block-help-items-first-block"]}>
            <div
              className={
                styles["footer-block-help-items-first-block-number-address"]
              }
            >
              <a href="tel:89337772777">+7 933 777 27-77</a>
              <div>
                <a href="https://yandex.ru/maps/-/CDxYZJo0">
                  с 11:00 до 20:00, без выходных г. Краснодар ул.Советская, 36
                </a>
              </div>
            </div>
            <a href="https://t.me/parkmobile_krasnodar">
              <TelegramIcon />
            </a>
          </div>
          <span className={styles["subscribe-text"]}>
            Подпишитесь на наш телеграмм канал, чтобы получать уведомления о
            наших лучших предложениях
          </span>
          <div className={styles["reqesits"]}>
            <img src={"/images/requisits/reqesits.png"} alt="" />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles["footer-block-info"]}>
        <div className={styles["footer-data"]}>
          <span>
            ИП Безганс Эмиль Владимирович | ОГРНИП: 323237500114924 | ИНН:
            090108428776
          </span>
          <strong>
            Сеть магазинов электроники «Park Mobile». Указанные на сайте цены не
            являются публичной офертой (ст.435 ГК РФ)., 2012-2024
          </strong>
        </div>
        <span onClick={handlePath.bind(this, "/policy", 0)}>
          Политика конфиденциальности
        </span>
      </div>
    </div>
  );
};

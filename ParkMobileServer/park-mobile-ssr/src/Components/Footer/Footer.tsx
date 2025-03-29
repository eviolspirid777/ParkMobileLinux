"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Footer.module.scss";
import { TelegramIcon } from "./Telegram";
import { animateScroll as scroll } from "react-scroll";
import Image from "next/image";

export const Footer = () => {
  const pathName = usePathname();
  const naviagate = useRouter();

  const handlePath = (path: string, scrollValue?: number) => {
    if (pathName === path) {
      return (() => scroll.scrollTo(scrollValue ?? 0))();
    }
    naviagate.push(path);
  };

  const handleCatalogNavigate = (path: string) => {
    naviagate.push(path);
  }

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
          <span onClick={handleCatalogNavigate.bind(null, "/categories/Apple/MacBook")}>Mac</span>
          <span onClick={handleCatalogNavigate.bind(null, "/categories/Apple/iPhone")}>iPhone</span>
          <span onClick={handleCatalogNavigate.bind(null, "/categories/Apple/watches")}>Watch</span>
          <span onClick={handleCatalogNavigate.bind(null, "/categories/Apple/iPad")}>iPad</span>
          <span onClick={handleCatalogNavigate.bind(null, "/categories/Gaming/accessories")}>
            Аксессуары
          </span>
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
            <Image src={"/images/requisits/reqesits.webp"} alt="requesits" width={150} height={150} layout="responsive"/>
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
            являются публичной офертой (ст.435 ГК РФ)., 2012-2025
          </strong>
        </div>
        <span onClick={handlePath.bind(this, "/policy", 0)}>
          Политика конфиденциальности
        </span>
      </div>
    </div>
  );
};

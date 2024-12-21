import Link from "next/link";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles["not-found-main-block"]}>
      <div className={styles["not-found-main-block-text"]}>
        <div>
          <h3>404. Страница</h3>
          <h3>не найдена</h3>
        </div>
        <div>
          <h5>Возможно она была перемещена или вы просто</h5>
          <h5>неверно указали адрес страницы</h5>
        </div>
        <Link href="/">На главную</Link>
      </div>
      <img src="/images/ErrorImages/Cow.webp" />
    </div>
  );
}

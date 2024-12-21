import styles from "./SliderSearchCard.module.scss";
import { FC } from "react";
import { SearchItemShortType } from "@/Types/SearchItemShortType";

type SliderSearchCardType = {
  card: SearchItemShortType;
  onClick?: (card: SearchItemShortType) => void
};

export const SliderSearchCard: FC<SliderSearchCardType> = ({
  card,
  onClick
}) => {
  return (
    <div className={styles["slider-search-card"]} onClick={onClick && onClick.bind(this, card)}>
      <img src={`data:image/jpeg;base64,${card.image}`} alt="" />
      <div className={styles["slider-search-card-info"]}>
        <span>{card.name}</span>
        <strong>{card.price} ₽</strong>
      </div>
    </div>
  );
};

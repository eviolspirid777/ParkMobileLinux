import styles from "./SliderSearchCard.module.scss";
import { FC } from "react";
import { SearchItemShortType } from "@/Types/SearchItemShortType";
import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";

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
      <Image src={`data:image/jpeg;base64,${card.image}`} alt={card.name} width={70} height={70}/>
      <div className={styles["slider-search-card-info"]}>
        <span>{card.name}</span>
        <strong>{convertToIntlFormat(card.price)} ₽</strong>
      </div>
    </div>
  );
};

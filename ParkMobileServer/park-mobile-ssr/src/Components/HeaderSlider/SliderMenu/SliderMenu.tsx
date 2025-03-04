import { FC } from "react";
import styles from "./SliderMenu.module.scss";
import { CardType } from "@/Types/CardType";
import Link from "next/link";

import Image from "next/image";
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";
import { subCategoryDictionary } from "@/Store/FiltersStore";


type SliderMenuProps = {
  titles?: string[];
  subTitles?: string[];
  items?: CardType[];
  category: string | undefined,
  handleTradeIn?: () => void;
  handleDeviceFix?: () => void;
};

export const SliderMenu: FC<SliderMenuProps> = ({
  titles,
  subTitles,
  items,
  category,
  handleDeviceFix,
  handleTradeIn
}) => {
  return (
    <>
      <div className={styles["blur-block-content-visible-titles"]}>
        {titles && titles.map((el, index) => 
        <Link
          key={index}
          className={styles["blur-block-content-visible-titles-link"]}
          href={`/categories/${category}/${subCategoryDictionary.get(el.toLowerCase()) ?? el}`}
        >
          {el}
        </Link>)}
        {subTitles && (
          <>
            <hr style={{ backgroundColor: "#878375" }} />
            <div className={styles["blur-block-content-visible-subtitles"]}>
              {subTitles.map((el, index) => {
                if(el === "Заявка на Трейд-Ин") {
                  return <span key={index} onClick={handleTradeIn}>{el}</span>
                }
                if(el === "Заявка на ремонт") {
                  return <span key={index} onClick={handleDeviceFix}>{el}</span>
                }
                return <span key={index}>{el}</span>
              })}
            </div>
          </>
        )}
      </div>
      <div className={styles["blur-block-content-visible-items"]}>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              className={`${styles["blur-block-content-visible-items-item-block"]}`}
            >
              <Image
                src={item.image}
                alt={item.name}
                height={70}
                width={70}
                className={
                  styles["blur-block-content-visible-items-item-block-image"]
                }
              />
              <div
                className={
                  styles[
                    "blur-block-content-visible-items-item-block-text-block"
                  ]
                }
              >
                <span
                  className={
                    styles[
                      "blur-block-content-visible-items-item-block-text-block-tag"
                    ]
                  }
                >
                  {item.name}
                </span>
                <span
                  className={
                    styles[
                      "blur-block-content-visible-items-item-block-text-block-price"
                    ]
                  }
                >
                  {convertToIntlFormat(item.price)} ₽
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

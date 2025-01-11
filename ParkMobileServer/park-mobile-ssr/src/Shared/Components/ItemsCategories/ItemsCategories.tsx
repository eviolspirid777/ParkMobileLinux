"use client";
import React, { FC } from "react";

import styles from "./ItemsCategories.module.scss";

type CategoriesProps = {
  categoriesItems: string[];
  onSelect?: (item: string) => void;
};

export const ItemsCategories: FC<CategoriesProps> = ({
  categoriesItems,
  onSelect,
}) => {
  const handleCategory = (event: React.MouseEvent<HTMLSpanElement>) => {
    const newFilter = event.currentTarget.textContent ?? "";

    if(onSelect) {
      onSelect(newFilter)
    }
  };

  return (
    <div className={styles["categories-block"]}>
      {categoriesItems.map((el, index) => (
        <span
          key={index}
          onClick={handleCategory}
        >
          {el}
        </span>
      ))}
    </div>
  );
};

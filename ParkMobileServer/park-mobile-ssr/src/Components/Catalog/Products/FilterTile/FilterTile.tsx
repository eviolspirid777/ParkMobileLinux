"use client"
import { useAtom } from "jotai";
import styles from "./FilterTile.module.scss";
import React, { FC } from "react";
import { categoryAtom } from "@/Store/FiltersStore";

type FilterTileType = {
  itemsCount: number | undefined;
};

export const FilterTile: FC<FilterTileType> = ({ itemsCount }) => {
  const [filter, setFilter] = useAtom(categoryAtom);

  if (filter && filter !== "Все") {
    return (
      <>
        <div className={styles["tile"]} onClick={setFilter.bind(this, "Все")}>
          {filter as string}
        </div>
        {itemsCount && (
          <span className={styles["total-items"]}>Найдено: {itemsCount}</span>
        )}
      </>
    );
  }
};

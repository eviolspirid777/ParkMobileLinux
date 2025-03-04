"use client";
import { type FC, useEffect, useState } from "react";
import { Products } from "../Products";
import { animateScroll as scroll } from "react-scroll";
import { useMutation } from "@tanstack/react-query";

import styles from "./ProductObertka.module.scss";
import { apiClient } from "@/api/ApiClient";
import { ItemsCategories } from "@/Shared/Components/ItemsCategories/ItemsCategories";
import { useRouter } from "next/navigation";
import { GetItemType } from "@/Types/GetItemType";
import { ItemsFilters } from "@/Shared/FiltersData/Filters";
import { SortSelect } from "@/Shared/Components/SortSelect/SortSelect";
import { SortType } from "@/Types/SortType";

type ProductObertkaProps = {
  category: string;
};

const itemsOnPage = 8;

export const ProductObertka: FC<ProductObertkaProps> = ({ category }) => {
  let filters: string[] = [];
  
  const navigate = useRouter();

  if(category) {
    filters = ItemsFilters.get(category as string) as string[]
  }

  const [take] = useState(itemsOnPage);
  const [sort, setSort] = useState<SortType>()
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    mutateAsync: getItemsAsync,
    mutate: getItems,
    isPending: isPendingItems
  } = useMutation({
    mutationKey: ["items"],
    mutationFn: async (item: GetItemType) =>
      apiClient.GetFilteredItems(item),
  });

  useEffect(() => {
    getItems({skip: 0, take, filters: [category], sort: sort})
  }, [sort])

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setCurrentPage(newPage);
    await getItemsAsync({take, skip: newSkip, filters: [category], sort: sort});
  };

  const handlePath = (path: string) => {
    let _path = path;
    switch (path) {
      case "Apple Watch":
        _path = "watches"
        break;
      case "Apple TV":
        _path = "tv"
        break;
      case "Смартфоны":
        _path = "phones"
        break;
      case "Наушники":
        _path = "headphones";
        break;
      case "Умные часы":
        _path = "watches"
        break;
      case "ТВ Приставки":
        _path = "tv"
        break;
      case "Стайлеры":
        _path = "styler"
        break;
      case "Фены":
        _path = "hairdryer"
        break;
      case "Выпрямители":
        _path = "rectifier"
        break;
      case "Пылесосы":
        _path = "vacuumcleaner"
        break;
      case "Очистители воздуха":
        _path = "airpurifiers"
        break;
      case "Яндекс Станции":
        _path = "yandex"
        break;
      case "JBL":
        _path = "jbl"
        break;
      case "Sony":
        _path = "sony"
        break;
      case "Xbox":
        _path = "microsoft"
        break;
      case "Nintendo":
        _path = "nintendo"
        break;
      case "Steam Deck":
        _path = "steam"
        break;
      case "Аксессуары":
        _path = "accessories"
        break;
    }
    navigate.push(`/categories/${category}/${_path}`)
  }

  const setSortType = (value: string) => {
    const [field, type] = value.split(",")
    setSort({field: field, type: type as "asc" | "desc"})
  }

  if (isPendingItems || items?.count === 0) {
    return <div style={{ height: "320vh", width: "100%" }} />;
  }

  return (
    <div className={styles["product-container"]}>
      <h4>
        Каталог
      </h4>
      {
        filters.length > 0 &&
        <div
          className={styles["categories-and-sort-block"]}
        >
          <ItemsCategories
            categoriesItems={filters}
            onSelect={handlePath}
          />
          <SortSelect
            size="large"
            onSelectChange={setSortType}
            value={sort ? `${sort?.field},${sort?.type}` : null}
          />
        </div>
      }
      <Products
        cards={items?.items}
        itemsCount={items?.count}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
        itemsOnPage={itemsOnPage}
      />
    </div>
  );
};

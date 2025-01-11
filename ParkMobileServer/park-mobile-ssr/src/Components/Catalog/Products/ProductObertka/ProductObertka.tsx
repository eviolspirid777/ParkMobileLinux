"use client";
import { type FC, useState } from "react";
import { Products } from "../Products";
import { animateScroll as scroll } from "react-scroll";
import { useQuery } from "@tanstack/react-query";

import styles from "./ProductObertka.module.scss";
import { apiClient } from "@/api/ApiClient";
import { CategoryFilters } from "@/Shared/FiltersData/Filters";
import { ItemsCategories } from "@/Shared/Components/ItemsCategories/ItemsCategories";
import { useRouter } from "next/navigation";

type ProductObertkaProps = {
  category: string;
};

const categoryDictionary = new Map([
  ["Apple", "brand=Apple"],
  ["Samsung", "brand=Samsung"],
  ["Xiaomi", "brand=Xiaomi"],
  ["Dyson", "brand=Dyson"],
  ["Headphones", "category=Audio"],
  ["Gaming", "category=Gaming"],
]);

export const ProductObertka: FC<ProductObertkaProps> = ({ category }) => {
  let filters: string[] = [];
  
  const navigate = useRouter();

  if(category) {
    filters = CategoryFilters.get(category as string) as string[]
  }

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    refetch,
    isLoading: isLoadingAll,
  } = useQuery({
    queryKey: ["items", skip, take],
    //TODO: Здесь нужно будет пофиксить баг с тем, что категории неправильно отправляются, нужна дополнительная обработка на беке
    queryFn: async () =>
      apiClient.GetItemsCostil(
        skip,
        take,
        categoryDictionary.get(category) ?? ""
      ),
    refetchOnWindowFocus: false,
  });

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  const handlePath = (path: string) => {
    let _path = path;
    if(_path === "Apple Watch") {
      _path = "watches"
    }
    if(_path === "Apple TV") {
      _path = "tv"
    }
    if(_path === "Смартфоны") {
      _path = "phones"
    }
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

  if (isLoadingAll || items?.count === 0) {
    return <div style={{ height: "320vh", width: "100%" }} />;
  }

  return (
    <div className={styles["product-container"]}>
      <h4>
        Каталог
      </h4>
      {
        filters.length > 0 &&
        <ItemsCategories
          categoriesItems={filters}
          onSelect={handlePath}
        />
      }
      <Products
        cards={items?.items}
        itemsCount={items?.count}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
    </div>
  );
};

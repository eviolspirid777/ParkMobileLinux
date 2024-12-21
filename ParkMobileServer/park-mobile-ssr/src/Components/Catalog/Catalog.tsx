"use client";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { CatalogHeader } from "./Header/CatalogHeader";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
// import { FilterTile } from "./Products/FilterTile/FilterTile";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { categoryAtom, categoryDictionary } from "../../Store/FiltersStore";
import { animateScroll as scroll } from "react-scroll";
import { apiClient } from "@/api/ApiClient";

export const Catalog = () => {
  const [storeCategory] = useAtom(categoryAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    refetch,
    isLoading: isLoadingAll,
  } = useQuery({
    queryKey: ["items", skip, take],
    queryFn: async () =>
      apiClient.GetItems(
        skip,
        take,
        categoryDictionary.get(storeCategory ?? "") ?? ""
      ),
    refetchOnWindowFocus: false,
  });

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(window.screen.width > 1024 ? 3600 : 4300, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [storeCategory]);

  return (
    <div className={styles["catalog-block"]}>
      <CatalogHeader />
      <Categories />
      {/* <FilterTile itemsCount={items?.count} /> */}
      {isLoadingAll ? (
        <div style={{ height: "2040px", width: "1239px" }}>Loading...</div>
      ) : (
        <Products
          cards={items?.items}
          itemsCount={items?.count}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      )}
    </div>
  );
};

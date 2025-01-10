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
import { apiClient } from "@/api/ApiClient";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { useRouter } from "next/navigation";

export const Catalog = () => {
  const navigate = useRouter();

  const [storeCategory] = useAtom(categoryAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    refetch,
    isLoading: isLoadingAll,
    isSuccess
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

  useEffect(() => {
    setSkip(0);
    setCurrentPage(1)
  }, [storeCategory])

  useEffect(() => {
    navigate.push("#catalog")
  }, [isSuccess])

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [storeCategory]);

  return (
    <div id="catalog" className={styles["catalog-block"]}>
      <CatalogHeader />
      <Categories />
      {/* <FilterTile itemsCount={items?.count} /> */}
      {isLoadingAll ? (
        <LoadingComponent />
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

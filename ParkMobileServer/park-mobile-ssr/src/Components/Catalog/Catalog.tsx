"use client";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { CatalogHeader } from "./Header/CatalogHeader";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
// import { FilterTile } from "./Products/FilterTile/FilterTile";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { categoryAtom, categoryDictionary } from "../../Store/FiltersStore";
import { apiClient } from "@/api/ApiClient";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { useRouter } from "next/navigation";
import { GetItemType } from "@/Types/GetItemType";

export const Catalog = () => {
  const navigate = useRouter();

  const [storeCategory] = useAtom(categoryAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    mutateAsync: fetchAsync,
    isPending: isPendingItems,
    isSuccess,
  } = useMutation({
    mutationKey: ["items", skip, take],
    mutationFn: async (item: Omit<GetItemType, "filters" | "brand">) =>
      apiClient.GetItems({
        skip: item.skip,
        take: item.take,
        category: categoryDictionary.get(item.category ?? "") ?? ""
      })
  });

  useEffect(() => {
    if(currentPage !== 1) {
      navigate.push("#catalog")
    }
  }, [isSuccess, isPendingItems])

  useEffect(() => {
    setSkip(0);
    setCurrentPage(1)
  }, [storeCategory])

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    setCurrentPage(newPage);
    await fetchAsync({skip: newSkip, take, category: storeCategory});
    if(newPage === 1) {
      navigate.push("#catalog")
    }
  };

  useEffect(() => {
    const setData = async () => {
      await fetchAsync({skip, take, category: storeCategory});
    }
    setData();
  }, [storeCategory]);

  return (
    <div id="catalog" className={styles["catalog-block"]}>
      <CatalogHeader />
      <Categories />
      {/* <FilterTile itemsCount={items?.count} /> */}
      {isPendingItems ? (
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

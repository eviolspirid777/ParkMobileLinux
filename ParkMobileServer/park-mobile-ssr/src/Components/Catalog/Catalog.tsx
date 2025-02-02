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
import { GetItemsMainMenuType } from "@/Types/GetItemsMainMenu";
import { SortSelect } from "@/Shared/Components/SortSelect/SortSelect";
import { SortType } from "@/Types/SortType";

export const Catalog = () => {
  const navigate = useRouter();

  const [storeCategory] = useAtom(categoryAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);
  const [sort, setSort] = useState<SortType>()
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: items,
    mutateAsync: fetchAsync,
    isPending: isPendingItems,
    isSuccess,
  } = useMutation({
    mutationKey: ["items", skip, take],
    mutationFn: async (item: GetItemsMainMenuType) =>
      apiClient.GetItems({
        skip: item.skip,
        take: item.take,
        category: categoryDictionary.get(item.category ?? "") ?? "",
        sort: sort
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
    setSort(undefined)
  }, [storeCategory])

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    setCurrentPage(newPage);
    await fetchAsync({skip: newSkip, take, category: storeCategory, sort: sort});
    if(newPage === 1) {
      navigate.push("#catalog")
    }
  };

  const setSortType = (value: string) => {
    const [field, type] = value.split(",")
    setSort({field: field, type: type as "asc" | "desc"})
  }

  useEffect(() => {
    const setData = async () => {
      await fetchAsync({skip, take, category: storeCategory, sort: sort});
    }
    setData();
  }, [storeCategory, sort]);

  return (
    <div id="catalog" className={styles["catalog-block"]}>
      <CatalogHeader />
      <Categories />
      {
        !isPendingItems && 
        <div
          className={styles["sort-block"]}
        >
          <SortSelect
            size="large"
            onSelectChange={setSortType}
            value={sort ? `${sort?.field},${sort?.type}` : null}
          />
        </div>
      }
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

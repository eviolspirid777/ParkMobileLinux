"use client";
import { useEffect, useState } from "react";
import styles from "./Catalog.module.scss";
import { CatalogHeader } from "./Header/CatalogHeader";
import { Categories } from "./Categories/Categories";
import { Products } from "./Products/Products";
// import { FilterTile } from "./Products/FilterTile/FilterTile";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { apiClient } from "@/api/ApiClient";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { useRouter } from "next/navigation";
import { GetItemsMainMenuType } from "@/Types/GetItemsMainMenu";
import { SortSelect } from "@/Shared/Components/SortSelect/SortSelect";
import { SortType } from "@/Types/SortType";
import { filterAtom } from "@/Store/Filter";

const itemsOnPage = 8;

export const Catalog = () => {
  const navigate = useRouter();

  const [filters] = useAtom(filterAtom);

  const [skip, setSkip] = useState(0);
  const [take] = useState(itemsOnPage);
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
      apiClient.GetFilteredItems({
        skip: item.skip,
        take: item.take,
        sort: sort,
        filters: filters
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
  }, [filters])

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    setCurrentPage(newPage);
    await fetchAsync({
      skip: newSkip,
      take,
      sort: sort
    });
    if(newPage === 1) {
      navigate.push("#catalog")
    }
  };

  const setSortType = (value: string) => {
    const [field, type] = value.split(",")
    setSort({
      field: field,
      type: type as "asc" | "desc"
    })
  }

  useEffect(() => {
    const setData = async () => {
      await fetchAsync({
        skip,
        take,
        sort: sort
      });
    }
    setData();
  }, [filters,sort]);

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
          itemsOnPage={itemsOnPage}
        />
      )}
    </div>
  );
};

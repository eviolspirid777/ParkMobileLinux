"use client"
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/ApiClient";
import { useParams } from 'next/navigation';
import { Products } from "@/Components/Catalog/Products/Products";

import styles from "./ItemsPage.module.scss"
import { ItemsCategories } from "@/Shared/Components/ItemsCategories/ItemsCategories";
import { ItemsFilters } from "@/Shared/FiltersData/Filters";
import { useAtom } from "jotai";
import { filterAtom } from "@/Store/Filter";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { GetItemType } from "@/Types/GetItemType";

const ItemPage = () => {
  const { category, items } = useParams();

  const [filter, setFilter] = useAtom(filterAtom);

  useEffect(() => {
    setFilter([category as string, ...items as string[]]);
  }, [])

  const [filters, ] = useState<string[]>(() => {
      if(items) {
        let _items = items[items.length - 1];
        if(category === "Samsung") {
          if(items === "phones") {
            _items = "SamsungPhones";
          }
          if(items === "headphones") {
            _items = "SamsungHeadphones"
          }
          if(items === "watches") {
            _items = "SamsungSmartWatches"
          }
        }
        if(category === "Xiaomi") {
          if(items === "phones") {
            _items = "XiaomiPhones";
          }
          if(items === "headphones") {
            _items = "XiaomiHeadphones"
          }
          if(items === "tv") {
            _items = "XiaomiTv";
          }
        }
        return ItemsFilters.get(_items as string) as string[] ?? []
      }
      return []
    }
  );

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: itemsFromStore,
    mutateAsync: mutateItemsAsync,
    isPending: isLoadingAll,
  } = useMutation({
    mutationKey: ["items"],
    mutationFn: async (item: GetItemType) =>
      apiClient.GetFilteredItems(item),
  });

  useEffect(() => {
    const refreshItems = async () => {
      await mutateItemsAsync({skip, take, filters: [category as string, ...items as string[]]})
    }

    refreshItems()
  }, [])

  const handleFilterSelect = async (item: string) => {
    if(!filter.includes(item)) {
      setFilter(prevFilters => [...prevFilters, item])
    }
    await mutateItemsAsync({ skip: skip, take: take, filters: [...filter, item] })
  }

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    if(filter) {
      await mutateItemsAsync({skip: newSkip, take: take, filters: [...filter]})
    }
    setCurrentPage(newPage);
  };

  return (
    <div
      className={styles["product-container"]}
    >
      <h4
        style={Array.isArray(filters) && filters.length === 0 ? {
          marginBottom: "5%"
        } : {}}
      >
        Каталог
      </h4>
      {
        filters && filters.length > 0 &&
        <ItemsCategories
          categoriesItems={filters}
          onSelect={handleFilterSelect}
        />
      }
      {
        isLoadingAll ?
        <div style={{
          height:"50vh"
        }}>
          <LoadingComponent />
        </div> :
        <Products
          cards={itemsFromStore?.items}
          itemsCount={itemsFromStore?.count}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      }
    </div>
  );

}

export default ItemPage;
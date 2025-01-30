"use client"
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/ApiClient";
import { useParams } from 'next/navigation';
import { Products } from "@/Components/Catalog/Products/Products";

import styles from "./ItemsPage.module.scss"
import { ItemsCategories } from "@/Shared/Components/ItemsCategories/ItemsCategories";
import { ItemsFilters } from "@/Shared/FiltersData/Filters";
import { useGetSearchItems } from "@/hooks/useGetSearchItems";
import { useAtom } from "jotai";
import { filterAtom } from "@/Store/Filter";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";

const ItemPage = () => {
  const { category, items } = useParams();

  const {
    mutateSearchedItems,
    searchedItems,
    isSearchedItemsPending,
    isSearchedItemsError,
  } = useGetSearchItems();

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
    refetch,
    isLoading: isLoadingAll,
  } = useQuery({
    queryKey: ["items", skip, take],
    queryFn: async () => apiClient.GetItemsByHeader(skip, take, category as string, items as string),
    refetchOnWindowFocus: false,
  });

  const handleFilterSelect = async (item: string) => {
    setFilter(prevFilters => [...prevFilters, item])
    await mutateSearchedItems({ skip: skip, take: take, tag: item, fromSearch: false })
  }

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    if(filter) {
      mutateSearchedItems({skip: newSkip, take: take, tag: filter[0], fromSearch: false})
    }
    setCurrentPage(newPage);
    refetch();
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
        isLoadingAll || isSearchedItemsPending || isSearchedItemsError ?
        <div style={{
          height:"50vh"
        }}>
          <LoadingComponent />
        </div> :
        <Products
          cards={searchedItems?.items ? searchedItems.items : itemsFromStore?.items}
          itemsCount={searchedItems?.count ? searchedItems.count : itemsFromStore?.count}
          currentPage={currentPage}
          onPageChange={handleOnPageChange}
        />
      }
    </div>
  );

}

export default ItemPage;
"use client"
import { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/ApiClient";
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Products } from "@/Components/Catalog/Products/Products";

import styles from "./ItemsPage.module.scss"
import { ItemsCategories } from "@/Shared/Components/ItemsCategories/ItemsCategories";
import { ItemsFilters } from "@/Shared/FiltersData/Filters";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { GetItemType } from "@/Types/GetItemType";
import { SortSelect } from "@/Shared/Components/SortSelect/SortSelect";
import { SortType } from "@/Types/SortType";

const itemsOnPage = 8;

const convertFilter = (item: string) => {
  return decodeURIComponent(item.replaceAll("%20", " ").replaceAll("%22", "\""))
}

const ItemPage = () => {
  const { category, items } = useParams();
  const navigate = useRouter();
  const path = usePathname();

  const [filters, ] = useState<string[]>(() => {
      if(items) {
        let _items = convertFilter(items[items.length - 1]);
        if(category === "Samsung") {
          if(items.includes("phones")) {
            _items = "SamsungPhones";
          }
          if(items.includes("Galaxy%20S")) {
            _items = "Galaxy S"
          }
          if (items.includes("Galaxy%20A")) {
            _items = "Galaxy A"
          }
          if(items.includes("Galaxy%20Z")) {
            _items = "Galaxy Z"
          }
          if(items.includes("headphones")) {
            _items = "SamsungHeadphones"
          }
          if(items.includes("watches")) {
            _items = "SamsungSmartWatches"
          }
        }
        if(category === "Xiaomi") {
          if(items.includes("phones")) {
            _items = "XiaomiPhones";
          }
          if(items.includes("Xiaomi%2014%20Ultra")) {
            _items = "Xiaomi 14 Ultra"
          }
          if (items.includes("Xiaomi%2014")) {
            _items = "Xiaomi 14"
          }
          if(items.includes("Xiaomi%2014T%20Pro")) {
            _items = "Xiaomi 14T Pro"
          }
          if(items.includes("Xiaomi%2014T")) {
            _items = "Xiaomi 14T"
          }
          if (items.includes("Xiaomi%2013%20Pro%20Plus")) {
            _items = "Xiaomi 13 Pro Plus"
          }
          if(items.includes("Xiaomi%2013%20Pro")) {
            _items = "Xiaomi 13 Pro"
          }
          if(items.includes("Xiaomi%2013T")) {
            _items = "Xiaomi 13T"
          }
          if(items.includes("headphones")) {
            _items = "XiaomiHeadphones"
          }
          if(items.includes("tv")) {
            _items = "XiaomiTv";
          }
        }
        if(items.includes("yandex")) {
          _items = decodeURIComponent(items.slice(-1) as string ?? "")
        }
        return ItemsFilters.get(_items as string) as string[] ?? []
      }
      return []
    }
  );

  const [skip, setSkip] = useState(0);
  const [take] = useState(itemsOnPage);
  const [sort, setSort] = useState<SortType>()
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

  const collectFilters = (): string[] => {
    return [category as string, ...(items as string[]).map(convertFilter)]
  }

  useEffect(() => {
    const refreshItems = async () => {
      await mutateItemsAsync({skip, take, filters: [...collectFilters()], sort: sort})
    }

    refreshItems()
  }, [sort])

  const handleFilterSelect = async (item: string) => {
    const lastElement = path.split("/").pop()
    if(lastElement && item !== convertFilter(lastElement)) {
      navigate.push(`${path}/${item}`)
    }
  }

  const setSortType = (value: string) => {
    const [field, type] = value.split(",")
    setSort({field: field, type: type as "asc" | "desc"})
  }

  const handleOnPageChange = async (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    await mutateItemsAsync({skip: newSkip, take: take, filters: [...collectFilters()], sort: sort})
    setCurrentPage(newPage);
  };

  return (
    <div
      className={styles["product-container"]}
    >
      <div className={styles["product-container-header"]}>
        <i
          className="fa-solid fa-arrow-left fa-xl"
          onClick={navigate.back}
        />
        <h4
          style={Array.isArray(filters) && filters.length === 0 ? {
            marginBottom: "5%"
          } : {}}
        >
          Каталог
        </h4>
      </div>
      <div
        className={styles["categories-and-sort-block"]}
      >
        {
          filters && filters.length > 0 &&
          <ItemsCategories
            key={filters.length}
            categoriesItems={filters}
            onSelect={handleFilterSelect}
          />
        }
        <SortSelect
          size="large"
          onSelectChange={setSortType}
          value={sort ? `${sort?.field},${sort?.type}` : null}
        />
      </div>
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
          itemsOnPage={itemsOnPage}
        />
      }
    </div>
  );

}

export default ItemPage;
"use client";
import { type FC, useState } from "react";
import { Products } from "../Products";
import { animateScroll as scroll } from "react-scroll";
import { useQuery } from "@tanstack/react-query";

import styles from "./ProductObertka.module.scss";
import { createPortal } from "react-dom";
import { Modal } from "antd";
import { apiClient } from "@/api/ApiClient";

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
  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [open, setOpen] = useState(false);

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

  if (isLoadingAll || items?.count === 0) {
    return <div style={{ height: "320vh", width: "100%" }} />;
  }

  return (
    <div className={styles["product-container"]}>
      <h4
        onClick={setOpen.bind(null, true)}
        onKeyDown={setOpen.bind(null, true)}
      >
        Каталог
      </h4>
      <Products
        cards={items?.items}
        itemsCount={items?.count}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
      {createPortal(
        <Modal
          open={open}
          onCancel={setOpen.bind(null, false)}
          onClose={setOpen.bind(null, false)}
          style={{
            width: "100vw",
            height: "100vh",
          }}
        />,
        document.body
      )}
    </div>
  );
};

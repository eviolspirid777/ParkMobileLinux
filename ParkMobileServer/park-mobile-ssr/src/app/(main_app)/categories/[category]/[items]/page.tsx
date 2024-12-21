"use client"
import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import { useQuery } from "@tanstack/react-query";

import { createPortal } from "react-dom";
import { Modal } from "antd";
import { apiClient } from "@/api/ApiClient";
import { useParams } from 'next/navigation';
import { Products } from "@/Components/Catalog/Products/Products";

import styles from "./ItemsPage.module.scss"

const ItemPage = () => {
  const { category, items } = useParams();

  const [skip, setSkip] = useState(0);
  const [take] = useState(16);

  const [open, setOpen] = useState(false);

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

  const handleOnPageChange = (newSkip: number, newPage: number) => {
    scroll.scrollTo(100, {
      duration: 700,
      smooth: true,
    });

    setSkip(newSkip);
    setCurrentPage(newPage);
    refetch();
  };

  if (isLoadingAll || itemsFromStore?.count === 0) {
    return <div style={{ height: "320vh", width: "100%" }} />;
  }

  return (
    <div
      className={styles["product-container"]}
    >
      <h4
        onClick={setOpen.bind(null, true)}
        onKeyDown={setOpen.bind(null, true)}
      >
        Каталог
      </h4>
      <Products
        cards={itemsFromStore?.items}
        itemsCount={itemsFromStore?.count}
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

}

export default ItemPage;
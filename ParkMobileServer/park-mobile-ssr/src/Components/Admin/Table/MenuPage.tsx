"use client";
import { Button, Input, Table, TableColumnsType } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "lodash";

import styles from "./Menu.module.scss";
import { useAtom } from "jotai";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { brandsAtom } from "@/Store/BrandsStore";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetBrands } from "@/hooks/useGetBrands";
import { ModalWindow } from "./ModalWindow/ModalWindow";
import { useGetItemsAdmin } from "@/hooks/useGetItemsAdmin";
import { CardTypeAdmin, RecivedCardDataAdminType } from "@/Types/CardTypeAdmin";
import { AggregationColor } from "antd/es/color-picker/color";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Image from "next/image";
import { currentPageAtom, pageSizeAtom, searchKeyWordAtom } from "@/Store/AdminItems";
import { useGetFilters } from "@/hooks/useGetFilters";

export type FormItemChange = {
  article: string;
  description: string;
  name: string;
  price: number;
  discountPrice?: number;
  stock: number;
  categoryId: number;
  brandId: number;
  optionName?: string;
  optionValue: string | AggregationColor;
  isPopular?: boolean;
  isNewItem?: boolean,
  isInvisible?: boolean,
  filters?: string[],
};

type DataType = {
  id?: number | string;
  key: number;
  image: string;
  name: string;
  count: number;
  price: string;
  isPopular: boolean,
  isNewItem: boolean,
  isInvisible: boolean,
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Изображение",
    dataIndex: "image",
    key: "image",
    width: 100,
    render: (image: string) => (
      <Image src={`data:image/jpeg;base64,${image}`} alt="" width={50} height={40} layout="responsive" />
    ),
    align: "center",
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Популярное",
    dataIndex: "isPopular",
    key: "isPopular",
    render: (isPopular: boolean) => {
      return isPopular ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    },
    align: "center"
  },
  {
    title: "Новинка",
    dataIndex: "isNewItem",
    key: "isNewItem",
    render: (isNewItem: boolean) => (
      isNewItem ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    ),
    align: "center"
  },
  {
    title: "Невидимый",
    dataIndex: "isInvisible",
    key: "isInvisible",
    render: (isInvisible: boolean) => (
      isInvisible ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    ),
    align: "center"
  },
  {
    title: "Колличество",
    dataIndex: "count",
    key: "count",
    align: "center"
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    align: "center"
  },
];

export const MenuPage = () => {
  //TODO: исправь баг с сохранением файла
  //TODO: исправь баг с сохранением изображения к карточке
  //TODO: некоторые поля не попадают в модальное окно(цена со скидкой, описание, и кол-во на складе)
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)
  const [pageSize, ] = useAtom(pageSizeAtom)

  const { itemsList, itemsListIsSuccess, refetchItemsList } =
    useGetItemsAdmin();
    
  useGetFilters();
  
  const { deleteItem } = useDeleteItem();
  useGetCategories();
  useGetBrands();

  const [, setSearchKeyWord] = useAtom(searchKeyWordAtom);
  const [filteredData, setFilteredData] = useState<RecivedCardDataAdminType>();
  useEffect(() => {
    setFilteredData(itemsList)
  }, [itemsList, itemsListIsSuccess])

  const onSearchChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(event.target.value);
  }, 300);

  const [categories] = useAtom(categoriesAtom);
  const categoriesOptions = categories?.map((el) => ({
    label: el.name,
    value: el.id,
  }));
  const [brands] = useAtom(brandsAtom);
  const brandsOptions = brands?.map((el) => ({
    label: el.name,
    value: el.id,
  }));

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CardTypeAdmin | null>();

  useEffect(() => {
    if (selectedItem) {
      setSelectedItem(
        itemsList?.items.find((item) => item.id === selectedItem.id)
      );
    }
  }, [itemsList]);

  useEffect(() => {
    if (itemsList) {
      setFilteredData({
        count: itemsList.count,
        items: itemsList.items.map((el) => {
          return {
            key: el.id!,
            name: el.name!,
            article: el.article!,
            count: el.stock!,
            price: el.price!,
            discountPrice: el.discountPrice,
            description: el.description,
            image: el.image!,
            isPopular: el.isPopular!,
            isNewItem: el.isNewItem!,
            brandId: el.brandId,
            categoryId: el.categoryId,
            isInvisible: el.isInvisible,
            filters: el.filters
          };
        }) 
      }
      );
    }
  }, [itemsList]);

  const handleRowClick = (record: DataType) => {
    let selected: CardTypeAdmin;
    if(record.key && filteredData) {
      selected = filteredData.items.find((item) => item.key === record.key) ??
      {
        key: 0,
        article: "",
        count: 0,
        image: "",
        isNewItem: false,
        isPopular: false,
        isInvisible: false,
        name: "",
        price: "",
      };
      setSelectedItem(selected);
    }
    else if(record.id && filteredData) {
      selected = filteredData.items.find((item) => item.key === record.key) ??
      {
        key: 0,
        article: "",
        count: 0,
        image: "",
        isNewItem: false,
        isPopular: false,
        isInvisible: false,
        name: "",
        price: ""
      };
      setSelectedItem(selected);
    }
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteItem(id);
    setTimeout(() => {
      refetchItemsList();
      setOpen(false);
      setSelectedItem(null);
    }, 2000);
  };

  const handleTableChange = (pagination: number) => {
    setCurrentPage(pagination);
  };

  return (
    <div className={styles["menu-items-list"]}>
      <Input.Search
        placeholder="Поиск"
        onChange={onSearchChange}
      />
      <Button
        className={styles["menu-items-list-button"]}
        onClick={handleAddItem}
      >
        Добавить товар
      </Button>
      <Table
        key={`${itemsListIsSuccess}-${filteredData?.items.length}`}
        columns={columns}
        dataSource={filteredData?.items}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: itemsList?.count,
          onChange: handleTableChange,
          showSizeChanger: false,
          pageSizeOptions: [],
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <ModalWindow
        key={`${selectedItem?.key}`}
        refetchItems={refetchItemsList}
        brandsOptions={brandsOptions!}
        categoriesOptions={categoriesOptions!}
        closeModal={handleCloseModal}
        handleDelete={handleDelete}
        open={open}
        selectedItem={selectedItem}
      />
    </div>
  );
};

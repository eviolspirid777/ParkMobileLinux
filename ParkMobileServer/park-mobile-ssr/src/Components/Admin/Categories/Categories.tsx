"use client";
import { useGetCategories } from "@/hooks/useGetCategories";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { useAtom } from "jotai";

import styles from "./Categories.module.scss";
import { useState } from "react";
import { useAddCategory } from "@/hooks/useAddCategory";

type DataType = {
  name: string;
  id: number;
};

const columns: TableColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    width: 100,
  },
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
];

export const CategoriesPage = () => {
  useGetCategories();
  const { mutateAsync } = useAddCategory();

  const [categories] = useAtom(categoriesAtom);
  console.log(categories);

  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleFinish = async (values: { name: string }) => {
    console.log(values);
    await mutateAsync(values.name);
    closeModal();
  };

  return (
    <div className={styles["categories-container"]}>
      <Button onClick={openModal}>Добавить категорию</Button>
      <Table
        key={`${categories?.length}`}
        columns={columns}
        dataSource={categories}
      />
      <Modal
        open={open}
        onCancel={closeModal}
        onClose={closeModal}
        title="Новая категория"
        footer={null}
        centered
      >
        <Form onFinish={handleFinish}>
          <Form.Item name="name" label="Название категории">
            <Input placeholder="Категория" />
          </Form.Item>
          <Form.Item
            style={{
              display: "flex",
              flexFlow: "row nowrap",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={closeModal}>Отменить</Button>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

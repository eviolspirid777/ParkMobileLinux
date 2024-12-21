"use client";
import { useGetBrands } from "@/hooks/useGetBrands";
import { brandsAtom } from "@/Store/BrandsStore";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { useAtom } from "jotai";

import styles from "./Brands.module.scss";
import { useState } from "react";
import { useAddBrand } from "@/hooks/useAddBrand";

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

export const BrandsPage = () => {
  useGetBrands();

  const [brands] = useAtom(brandsAtom);

  const { mutateAsync } = useAddBrand();

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
    <div className={styles["brands-container"]}>
      <Button onClick={openModal}>Добавить брэнд</Button>
      <Table columns={columns} dataSource={brands} />
      <Modal
        open={open}
        onCancel={closeModal}
        onClose={closeModal}
        title="Новая категория"
        footer={null}
        centered
      >
        <Form onFinish={handleFinish}>
          <Form.Item name="name" label="Название брэнда">
            <Input placeholder="Брэнд" />
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

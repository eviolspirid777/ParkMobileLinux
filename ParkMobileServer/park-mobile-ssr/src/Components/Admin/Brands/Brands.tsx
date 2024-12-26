"use client";
import { useGetBrands } from "@/hooks/useGetBrands";
import { brandsAtom } from "@/Store/BrandsStore";
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { useAtom } from "jotai";

import styles from "./Brands.module.scss";
import { useState } from "react";
import { useAddBrand } from "@/hooks/useAddBrand";
import { useForm } from "antd/es/form/Form";

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
  const [form] = useForm();
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
    await mutateAsync(values.name);
    closeModal();
    form.resetFields();
  };

  return (
    <div className={styles["brands-container"]}>
      <Button onClick={openModal}>Добавить бренд</Button>
      <Table columns={columns} dataSource={brands} />
      <Modal
        open={open}
        onCancel={closeModal}
        onClose={closeModal}
        title="Новая категория"
        footer={null}
        centered
      >
        <Form onFinish={handleFinish} form={form}>
          <Form.Item name="name" label="Название бренда">
            <Input placeholder="Бренд" />
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

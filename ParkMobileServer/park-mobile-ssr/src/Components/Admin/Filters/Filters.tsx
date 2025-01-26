"use client";
import styles from "./Filters.module.scss"
import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { useAtom } from "jotai";

import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useGetFilters } from "@/hooks/useGetFilters";
import { usePostFilters } from "@/hooks/usePostFilters";
import { FiltersAtom } from "@/Store/Filters";

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

export const Filters = () => {
  const {
    refetchFilters
  } = useGetFilters();
  const {
    postFilterAsync
  } = usePostFilters();

  const [form] = useForm();
  const [filtersFromStore] = useAtom(FiltersAtom)

  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const handleFinish = async (values: { name: string }) => {
    await postFilterAsync(values.name);
    closeModal();
    form.resetFields();
    refetchFilters()
  };

  return (
    <div
      className={styles["filters-container"]}
    >
      <Button
        onClick={openModal}
      >
        Добавить фильтр
      </Button>
      <Table
        key={`${filtersFromStore?.length}`}
        columns={columns}
        dataSource={filtersFromStore}
      />
      <Modal
        open={open}
        onCancel={closeModal}
        onClose={closeModal}
        title="Новый фильтр"
        footer={null}
        centered
      >
        <Form onFinish={handleFinish} form={form}>
          <Form.Item name="name" label="Название фильтра">
            <Input placeholder="Фильтр" />
          </Form.Item>
          <Form.Item
            className={styles["filters-container-form-item"]}
          >
            <Button
              onClick={closeModal}
            >
              Отменить
            </Button>
            <Button
              type="primary"
              htmlType="submit"
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
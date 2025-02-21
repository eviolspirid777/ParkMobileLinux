"use client"
import { Table, TableColumnsType } from "antd";
import styles from "./Orders.module.scss";
import { apiClient } from "@/api/ApiClient";
import { useEffect, useState } from "react";
import { OrderTableData, PaymentDictionary } from "@/Types/Order";
import { ApproveModal } from "./ApproveModal/ApproveModal";
import { ordersCountAtom } from "@/Store/OrdersStore";
import { useAtom } from "jotai";

export const Orders = () => {
  const [ ordersCount ] = useAtom(ordersCountAtom);
  const [orders, setOrders] = useState<OrderTableData[]>();
  const [open, setOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number>();

  const columns: TableColumnsType<OrderTableData> = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
      width: 100,
    },
    {
      title: "Тип оплаты",
      dataIndex: "payment",
      key: "payment",
      render: (value) => PaymentDictionary.get(value) ?? value
    },
    {
      title: "Адрес",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Код ПВЗ",
      dataIndex: "pvzCode",
      key: "pvzCode",
    },
    {
      title: "",
      dataIndex: "buttonBlock",
      key: "buttonBlock",
      width: 200,
      render: (item, record, index) => (
        <div
          className={styles["button-block"]}
        >
          <i
            onClick={handleApprove.bind(this, record.id)}
            className="fa-solid fa-check fa-lg"
            title="Одобрить"
          />
          <i
            onClick={handleDecline.bind(this, record.id)}
            className="fa-solid fa-xmark fa-lg"
            title="Отклонить"
          />
        </div>
      )
    }
  ];

  const handleApprove = (id: number | undefined) => {
    setSelectedItemId(id);
    setOpen(true)
  }

  const handleDecline = async (id: number | undefined) => {
    id && await apiClient.DeleteOrder(id)
  }

  useEffect(() => {
    const GetOrders = async () => {
      const data = await apiClient.GetOrders();
      const transformedData = data.map(order => ({
        ...order,
        buttonBlock: (
          <div className={styles["button-block"]}>
            <i
              className="fa-solid fa-check fa-lg"
              title="Одобрить"
            />
            <i
              className="fa-solid fa-xmark fa-lg"
              title="Отклонить"
            />
          </div>
        )
      }));
      setOrders(transformedData);
    }
    GetOrders()
  }, [ordersCount])

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
      />
      <Table
        columns={columns}
        dataSource={orders?.filter(el => el.state)}
      />
      <ApproveModal
        open={open}
        setOpen={setOpen.bind(this, (prevValue) => !prevValue)}
        id={selectedItemId}
      />
    </>
  )
}
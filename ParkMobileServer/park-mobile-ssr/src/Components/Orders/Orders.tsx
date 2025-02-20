import { Table, TableColumnsType } from "antd";
import styles from "./Orders.module.scss";
import { apiClient } from "@/api/ApiClient";
import { useEffect, useState } from "react";
import { OrderTableData, PaymentDictionary } from "@/Types/Order";

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
    render: () => (
      <div
        className={styles["button-block"]}
      >
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
  }
];

export const Orders = () => {
  const [orders, setOrders] = useState<OrderTableData[]>();

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
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={orders}
    />
  )
}
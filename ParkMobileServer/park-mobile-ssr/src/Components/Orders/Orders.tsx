"use client"
import { Table, TableColumnsType } from "antd";
import styles from "./Orders.module.scss";
import { apiClient } from "@/api/ApiClient";
import { useEffect, useState } from "react";
import { OrderState, OrderTableData, PaymentDictionary } from "@/Types/Order";
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
      render: (item, record) => {
        return record.state === null ?
          (
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
          ) : (
            <i className={record.state === OrderState.Approved ? "fa-solid fa-check fa-lg" : "fa-solid fa-xmark fa-lg"}/>
          )
      }
    }
  ];

  const handleApprove = (id: number | undefined) => {
    setSelectedItemId(id);
    setOpen(true)
  }

  const handleDecline = async (id: number | undefined) => {
    setSelectedItemId(id);
    id && await apiClient.ChangeOrderStatus({ id: id, state: OrderState.Disapproved }) 
    setSelectedItemId(undefined)
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

      selectedItemId === undefined && setOrders(transformedData);
    }
    GetOrders()
  }, [ordersCount, selectedItemId])

  const handleSubmitSuccess = async (id: number | null) => {
    id && await apiClient.ChangeOrderStatus({ id: id, state: OrderState.Approved })
    setSelectedItemId(undefined)
    setOpen(prev => !prev)
  }

  return (
    <div
      className={styles["orders-layout"]}
    >
      <h2>Ждут рассмотрения</h2>
      <Table
        columns={columns}
        size="small"
        dataSource={orders?.filter(el => el.state === null)}
        pagination={{
          pageSize: 8,
        }}
      />
      <h2>Рассмотрены</h2>
      <Table
        columns={columns}
        size="small"
        dataSource={orders?.filter(el => el.state !== null)}
        pagination={{
          pageSize: 8,
        }}
      />
      <ApproveModal
        open={open}
        setOpen={handleSubmitSuccess}
        id={selectedItemId}
      />
    </div>
  )
}
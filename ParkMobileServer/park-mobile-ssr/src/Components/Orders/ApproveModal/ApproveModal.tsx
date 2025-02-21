"use client"
import { Button, Form, InputNumber, Modal } from "antd";
import styles from "./ApproveModal.module.scss";
import { FC, useEffect, useState } from "react";
import { Order } from "@/Types/Order";
import { apiClient } from "@/api/ApiClient";
import { CardItemType } from "@/Types/CardType";
import { deliveryTypes, ItemType, SdekPostTypeBase, Tariffs_SDEK } from "@/Types/CDEK";

type ApproveModalProps = {
  id: number | undefined,
  open: boolean,
  setOpen: (id: number | null) => void,
}

type FormFinishValuesType = {
  itemInfo: ItemOptionsType
}

type ItemOptionsType = {
  items: {
    weight: number
  }[],
  length: number,
  width: number,
  height: number,
}

export const ApproveModal: FC<ApproveModalProps> = ({
  id,
  open,
  setOpen
}) => {
  const [order, setOrder] = useState<Order>();
  const [items, setItems] = useState<CardItemType[]>([]);

  useEffect(() => {
      Promise.all(order?.items?.map(item => apiClient.GetItem(item.itemId)) ?? [])
              .then(items => setItems(items))
  }, [order])

  useEffect(() => {
    const requestOrder = async () => {
      if(id) {
        const order = await apiClient.GetOrderById(id)
        setOrder(order);
      }
    }

    requestOrder()
  }, [id])

  const handleSubmitForm = async (values: FormFinishValuesType) => {
    const testObj: SdekPostTypeBase = {
      tariff_code: Tariffs_SDEK.StorageToStorage,
      type: deliveryTypes.InternetShop,
      comment: order?.client.comment,
      number: `${Math.round(Math.random() * 1000)}`,
      shipment_point: "KSD11",
      delivery_point: order?.pvzCode ?? "",
      seller: {
        name: "Безганс Эмиль Владимирович",
        inn: "090108428776",
        ownership_form: "16",
        phone: "89337772777",
        address: "г. Краснодар, ул.Советская, 36"
      },
      recipient: {
        name: order?.client.clientName ?? "",
        contragent_type: "INDIVIDUAL",
        email: order?.client.email ?? "",
        phones: [{
          number: order?.client.telephone ?? ""
        }]
      },
      packages: [{
        number: `${Math.round(Math.random() * 1000)}-KSD`,
        comment: order?.client.comment,
        weight: values.itemInfo.items.reduce((acc, value) => {
          return acc + value.weight
        }, 0),
        length: values.itemInfo.length,
        width: values.itemInfo.width,
        height: values.itemInfo.height,
        items: items.map((el, index) => ({
          name: el.name,
          ware_key: el.article,
          amount: order?.items?.[index].count,
          cost: 0,
          payment: {
            value: 0
          },
          weight: values.itemInfo.items[index].weight,
        } as ItemType)),
      }]
    }
    await apiClient.AutorizeCDEK();
    await apiClient.PostCDEKForm(testObj)
    setOpen(id ?? null);
  }

  return (
    <Modal
      open={open}
      onCancel={setOpen.bind(this, null)}
      onClose={setOpen.bind(this, null)}
      title="Формирование заявки СДЕК"
      footer={null}
      centered
    >
      <Form
        className={styles["item-block-form"]}
        onFinish={handleSubmitForm}
      >
        {
          order?.items?.map((_, index) => (
            <div
              key={index}
              className={styles["item-block"]}
            >
              {items.length > 0 && <span>{items[index]?.name}</span>}
              <Form.Item
                name={["itemInfo", "items", index, "weight"]}
              >
                <InputNumber
                  style={{
                    width: "100%"
                  }}
                  placeholder="Введите вес товара (в граммах)"
                />
              </Form.Item>
            </div>
          ))
        }
        <strong>Заполните данные о заказе</strong>
        <Form.Item
          name={["itemInfo","length"]}
        >
          <InputNumber
            style={{
              width: "100%"
            }}
            placeholder="Введите длину упаковки (в сантиметрах)"
          />
        </Form.Item>
        <Form.Item
          name={["itemInfo", "width"]}
        >
          <InputNumber
            style={{
              width: "100%"
            }}
            placeholder="Введите ширину упаковки (в сантиметрах)"
          />
        </Form.Item>
        <Form.Item
          name={["itemInfo","height"]}
        >
          <InputNumber
            style={{
              width: "100%"
            }}
            placeholder="Введите высоту упаковки (в сантиметрах)"
          />
        </Form.Item>
        <div className={styles["button-block"]}>
          <Button htmlType="submit" type="primary">
            Сформировать заявку
          </Button>
          <Button
            onClick={setOpen.bind(this, null)}
          >
            Отменить
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
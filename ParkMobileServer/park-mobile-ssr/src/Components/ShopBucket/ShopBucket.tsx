"use client";
import {
  Drawer,
  Radio,
  Button,
  Space,
  ConfigProvider,
  Form,
  RadioChangeEvent,
} from "antd";
import styles from "./ShopBucket.module.scss";
import { FC, useEffect, useState } from "react";
import { DataType, shopBucketAtom } from "@/Store/ShopBucket";
import { useAtom } from "jotai";
import { deliveryOptions } from "./DeliveryTypes/ShopBucketDeliveryOptions";
import Media from "react-media";
import { ShopBucketMobile } from "./ShopBucket/ShopBucketMobile";
import { apiClient } from "@/api/ApiClient";
import { useForm } from "antd/es/form/Form";
import Image from "next/image"
import { convertToIntlFormat } from "@/Shared/Functions/convertToIntlFormat";
import { deliveryPointAtom } from "@/Store/DeliveryPoint";
import { OrderPayment } from "@/Types/Order";
import { useOtpBank } from "@/Shared/Hooks/useOtpBank";
import { useRouter } from "next/navigation";

type ShopBucketType = {
  handleShopBag: () => void;
  open: boolean;
};

type FormValuesType = {
  city: string,
  deliveryType: "sdek-delivery" | "krasnodar-self-delivery" | "krasnodar-delivery",
  description: string,
  email: string,
  paymentType: "transfer" | "cash",
  personName: string,
  postmat?: string,
  reciver: string,
  telephone: string,
  items: {
    ProductId: number;
    Quantity: number;
  }[]
}

const translationKeyDictionary = new Map([
  ["article", "Артикул"],
  ["weight", "Вес"]
])

export const ShopBucket: FC<ShopBucketType> = ({ open, handleShopBag }) => {
  const [ deliveryPoint ] = useAtom(deliveryPointAtom);
  const [shopBucket, setShopBucket] = useAtom(shopBucketAtom);

  const navigate = useRouter();

  const [childDrawer, setChildDrawer] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");
  const [deliveryType, setDeliveryType] = useState<"sdek-delivery" | "krasnodar-self-delivery" | "krasnodar-delivery">("krasnodar-self-delivery");

  const [form] = useForm();

  const {
    redirectToOtp
  } = useOtpBank({items: shopBucket})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {});
  }, [])

  const parsKey = (k: string) => {
    return translationKeyDictionary.get(k);
  }

  const handleChildrenDrawer = () => {
    setChildDrawer((previous) => !previous);
  };

  const handleItemsCost = () => {
    let total = shopBucket.reduce((accumulator, item) => {
      if(item.discountPrice) {
        const price = item.discountPrice;
        const count = item.count || 0;
        return accumulator + price * count;
      }
      const price = item.price;
      const count = item.count || 0;
      return accumulator + price * count;
    }, 0);

    if (paymentType === "card") {
      total *= 1.06;
    }

    const formatter = new Intl.NumberFormat("ru-RU", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const formattedNumber = formatter.format(total);

    return formattedNumber;
  };

  const handleItemCount = (el: DataType, state: "minus" | "plus") => {
    setShopBucket((previousData) =>
      previousData.map((item) => {
        if (item === el) {
          if (state === "minus" && el.count === 1) {
            return item;
          }
          let _count = item.count;
          return state === "minus"
            ? { ...item, count: --_count }
            : { ...item, count: ++_count };
        }
        return item;
      })
    );
  };

  const handleDeleteItem = (id: number) => {
    setShopBucket((previousData) =>
      previousData.filter((_, index) => id !== index)
    );
  };

  const handlePayment = (event: RadioChangeEvent) => {
    if (event.target.value === "card") {
      setPaymentType("card");
    } else {
      setPaymentType("cash");
    }
  };

  const handleFinish = async (values: FormValuesType) => {
    try {
      const itemsToProceed = shopBucket.map((item) => ({
        ProductId: item.id,
        Quantity: item.count,
      }));

      values = { ...values, items: [...itemsToProceed] };

      await apiClient.OrderData(values);
      if(deliveryPoint?.code && values.deliveryType === "sdek-delivery") {
        await apiClient.PostOrder({
          trackNumber: null,
          address: "",
          client: {
            clientName: values.reciver,
            comment: values.description,
            email: values.email,
            telephone: values.telephone
          },
          payment: OrderPayment.Card,
          pvzCode: deliveryPoint.code,
          state: null,
          items: shopBucket.map(el => ({ itemId: el.id, count: el.count }))
        })
      }

      if("ym" in window && typeof window.ym === "function") {
        window.ym(99483189,'reachGoal','submitForm')
      }
      navigate.push("/success")
      setShopBucket([]);
      localStorage.removeItem("shopBucket");
    } catch (error) {
      console.error(error);
    } finally {
      form.resetFields();
      setChildDrawer((prev) => !prev);
      handleShopBag();
    }
  };

  return (
    <Drawer
      onClose={handleShopBag}
      open={open}
      closable={false}
      width={700}
      className="shop-bucket"
    >
      <div className={styles["drawer-items-block"]}>
        <header>
          <h3>Ваш заказ</h3>
          <i className="fa-regular fa-xmark fa-2xl" onClick={handleShopBag} />
        </header>
        <hr />
        <Media
          queries={{
            telephone: "(max-width: 1024px)",
            computer: "(min-width: 1025px)",
          }}
        >
          {(matches) => (
            <>
              {matches.computer ? (
                <main>
                  {shopBucket.map((el, index) => (
                    <div key={index} className={styles["item-block"]}>
                      <Image
                        src={`data:image/jpeg;base64,${el.image}`}
                        alt={el.name}
                        width={60}
                        height={60}
                      />
                      <div className={styles["item-block-info"]}>
                        {Object.entries(el).map(([k, v]) => {
                          if (!["id", "price", "image", "count", "discountPrice"].includes(k)) {
                            if (k === "name") {
                              return <strong key={k}>{v}</strong>;
                            }
                            return (
                              <div key={k}>
                                {parsKey(k) ?? k}: {v}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                      <div className={styles["item-block-count"]}>
                        <i
                          className="fa-solid fa-minus"
                          onClick={handleItemCount.bind(
                            this,
                            el as DataType,
                            "minus"
                          )}
                        />
                        <span>{el.count}</span>
                        <i
                          className="fa-solid fa-plus"
                          onClick={handleItemCount.bind(
                            this,
                            el as DataType,
                            "plus"
                          )}
                        />
                      </div>
                      <div className={styles["item-block-price"]}>
                        <span
                          className={el.discountPrice !== null ? styles["discount"] : ""}
                        >
                          {convertToIntlFormat(el.price)} ₽
                        </span>
                        {el.discountPrice && <span>{el.discountPrice} ₽</span>}
                      </div>
                      <div className={styles["item-block-decline"]}>
                        <i
                          className="fa-regular fa-trash fa-lg"
                          onClick={handleDeleteItem.bind(this, index)}
                        />
                      </div>
                    </div>
                  ))}
                </main>
              ) : (
                <ShopBucketMobile
                  handleDeleteItem={handleDeleteItem}
                  handleItemCount={handleItemCount}
                  shopBucket={shopBucket}
                  open={open}
                />
              )}
            </>
          )}
        </Media>
        <footer>
          <strong>Сумма: {handleItemsCost.call(this)} ₽</strong>
          <button
            onClick={handleChildrenDrawer}
            disabled={shopBucket.length === 0}
          >
            Оформить заказ
          </button>
        </footer>
      </div>
      <Drawer
        width="100%"
        open={childDrawer}
        onClose={handleChildrenDrawer}
        title="Ваш заказ"
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#87a08b",
            },
          }}
        >
          <div
            className={styles["submit-shopping-block"]}
          >
            <div className={styles["submit-shopping-block-data"]}>
              <Form
                form={form}
                onFinish={handleFinish}
              >
                <div className={styles["submit-shopping-block-data-delivery"]}>
                  <strong>Способ получения</strong>
                  <div>
                    <Form.Item
                      name="deliveryType"
                      initialValue={"krasnodar-self-delivery"}
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите тип доставки!",
                        },
                      ]}
                    >
                      <Radio.Group
                        onChange={(event) =>
                          setDeliveryType(event.target.value)
                        }
                      >
                        <Space direction="vertical">
                          <Radio value={"sdek-delivery"}>
                            <div className={styles["delivery-item-block"]}>
                              <strong>СДЭК</strong>
                              <span>от 5 дней, от 748,32 ₽</span>
                            </div>
                          </Radio>
                          <Radio value={"krasnodar-self-delivery"}>
                            <div className={styles["delivery-item-block"]}>
                              <strong>Самовывоз</strong>
                              <span>(г.Краснодар, ул.Советская 36)</span>
                            </div>
                          </Radio>
                          <Radio value={"krasnodar-delivery"}>
                            <div className={styles["delivery-item-block"]}>
                              <strong>Доставка по Краснодару</strong>
                              <span>от 1 дня, 500 ₽</span>
                            </div>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {deliveryOptions.get(deliveryType)
                      ? deliveryOptions.get(deliveryType)?.()
                      : null}
                  </div>
                  <div
                    className={
                      styles["submit-shopping-block-data-payment-choose"]
                    }
                  >
                    <strong>Способ оплаты</strong>
                    <Form.Item
                      name="paymentType"
                      rules={[
                        {
                          required: true,
                          message: "Пожалуйста, выберите тип оплаты!",
                        },
                      ]}
                    >
                      <Radio.Group onChange={handlePayment}>
                        <Space direction="vertical">
                          <Radio
                            value={
                              deliveryType === "sdek-delivery"
                                ? "transfer"
                                : "cash"
                            }
                          >
                            <div className={styles["delivery-item-block"]}>
                              <strong>
                                {deliveryType === "sdek-delivery"
                                  ? "Перевод"
                                  : "Наличными при получении"}
                              </strong>
                            </div>
                          </Radio>
                          <Radio value="card">
                            <div className={styles["delivery-item-block"]}>
                              <strong>
                                {
                                  deliveryType === "krasnodar-self-delivery" ?
                                  "Оплата картой (Visa, MasterCard, Мир)" :
                                  "Qr-кодом"
                                }
                              </strong>
                            </div>
                          </Radio>
                          <Radio
                            value="credit"
                            onChange={redirectToOtp}
                          >
                            <div className={styles["delivery-item-block"]}>
                              <strong>
                                В кредит
                              </strong>
                            </div>
                          </Radio>
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
                <div className={styles["submit-shopping-block-data-user-info"]}>
                </div>
                <Button
                  className={styles["submit-button"]}
                  htmlType="submit"
                  disabled={shopBucket.length === 0}
                >
                  Оформить заказ
                </Button>
              </Form>
            </div>
            <div className={styles["drawer-items-block"]}>
              <Media
                queries={{
                  telephone: "(max-width: 1024px)",
                  computer: "(min-width: 1025px)",
                }}
              >
                {(matches) => (
                  <>
                    {matches.computer ? (
                      <main>
                        {shopBucket.map((el, index) => (
                          <div key={index} className={styles["item-block"]}>
                            <Image
                              src={`data:image/jpeg;base64,${el.image}`}
                              alt={el.name}
                              width={60}
                              height={60}
                            />
                            <div className={styles["item-block-info"]}>
                              {Object.entries(el).map(([k, v]) => {
                                if (
                                  !["id", "price", "image", "count", "discountPrice"].includes(k)
                                ) {
                                  if (k === "name") {
                                    return <strong key={k}>{v}</strong>;
                                  }
                                  return (
                                    <div key={k}>
                                      {parsKey(k) ?? k}: {v}
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                            <div className={styles["item-block-count"]}>
                              <i
                                className="fa-solid fa-minus"
                                onClick={handleItemCount.bind(
                                  this,
                                  el as DataType,
                                  "minus"
                                )}
                              />
                              <span>{el.count}</span>
                              <i
                                className="fa-solid fa-plus"
                                onClick={handleItemCount.bind(
                                  this,
                                  el as DataType,
                                  "plus"
                                )}
                              />
                            </div>
                            <div>
                              <span className={styles["item-block-price"]}>
                                <span
                                  className={el.discountPrice !== null ? styles["discount"] : ""}
                                >
                                  {convertToIntlFormat(el.price)} ₽
                                </span>
                                {el.discountPrice && <span>{el.discountPrice} ₽</span>}
                              </span>
                            </div>
                            <div className={styles["item-block-decline"]}>
                              <i
                                className="fa-regular fa-trash fa-lg"
                                onClick={handleDeleteItem.bind(this, index)}
                              />
                            </div>
                          </div>
                        ))}
                        <strong>Сумма: {handleItemsCost.call(this)} ₽</strong>
                      </main>
                    ) : (
                      <ShopBucketMobile
                        handleDeleteItem={handleDeleteItem}
                        handleItemCount={handleItemCount}
                        shopBucket={shopBucket}
                        open={open}
                        price={handleItemsCost()}
                      />
                    )}
                  </>
                )}
              </Media>
            </div>
          </div>
        </ConfigProvider>
      </Drawer>
    </Drawer>
  );
};

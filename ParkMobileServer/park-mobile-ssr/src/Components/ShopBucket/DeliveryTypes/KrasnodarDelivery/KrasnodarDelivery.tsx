import { Form, Input } from "antd";

import styles from "./KrasnodarDelivery.module.scss";
import { BaseShopBucketFormData } from "../BaseShopBucketFormData";

export const KrasnodarDelivery = () => {
  return (
    <>
      <BaseShopBucketFormData />
      <Form.Item name="street">
        <Input placeholder="Улица" />
      </Form.Item>
      <div className={styles["grid-template"]}>
        <Form.Item name="house">
          <Input placeholder="Дом" />
        </Form.Item>
        <Form.Item name="entrance">
          <Input placeholder="Подъезд" />
        </Form.Item>
        <Form.Item name="floor">
          <Input placeholder="Этаж" />
        </Form.Item>
        <Form.Item name="flat">
          <Input placeholder="Квартира/офис" />
        </Form.Item>
      </div>
      <Form.Item name="description">
        <Input placeholder="Комментарий к заказу" />
      </Form.Item>
    </>
  );
};

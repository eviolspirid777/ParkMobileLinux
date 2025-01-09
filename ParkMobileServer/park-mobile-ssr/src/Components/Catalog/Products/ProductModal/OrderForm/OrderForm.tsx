import { Button, ConfigProvider, Form, Input, Modal } from "antd"
import { createPortal } from "react-dom";
import styles from "./OrderForm.module.scss";
import { FC } from "react";
import { OrderItem } from "@/Types/OrderItem";

type OrderFormProps = {
  open: boolean;
  handleClose: () => void;
  submitData: (values: Omit<OrderItem, "article" | "itemName">) => void;
}

export const OrderForm: FC<OrderFormProps> = ({
  handleClose,
  submitData,
  open
}) => {
  const handleFinish = (values: Omit<OrderItem, "article" | "itemName">) => {
    submitData(values)
    handleClose();
  }

  return (
    createPortal(
      <Modal
        open={open}
        onClose={handleClose}
        onCancel={handleClose}
        centered={true}
        title="Заявка на заказ"
        footer={null}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#87a08b",
            },
          }}
        >
          <Form
            onFinish={handleFinish}
            layout="vertical"
            style={{
              padding:"2% 0%",
              marginTop: "20px"
            }}
          >
            <strong className={styles["alarm"]}>Внимание! Уведомляем вас, что цены на модель по предзаказу могут меняться.</strong>
            <div className={styles["content-block"]}>
              <Form.Item
                name="name"
                label="Ваше имя"
                rules={[{required: true, message: "Введите название устройства!"}]}
                required={false}
              >
                <Input placeholder="Алексей"/>
              </Form.Item>
              <Form.Item
                name="telephone"
                label="Ваш номер телефона"
                rules={[{required: true, message: "Опишите неисправность устройства!"}]}
                required={false}
              >
                <Input
                  placeholder="+7(999)999-99-99"
                />
              </Form.Item>
            </div>
            <div className={styles["button-block"]}>
              <Button onClick={handleClose}>
                Выйти
              </Button>
              <Button htmlType="submit" type="primary">
                Отправить
              </Button>
            </div>
          </Form>
        </ConfigProvider>
      </Modal>
      , document.body
    )
  )
}
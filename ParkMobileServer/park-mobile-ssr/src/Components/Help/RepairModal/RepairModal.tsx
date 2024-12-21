import { Button, ConfigProvider, Form, Input, Modal } from "antd"

import styles from "./RepairModal.module.scss";
import { FC } from "react";
import { RepairRequestType } from "@/hooks/useAddRepairRequest";

type RepairModalProps = {
  open: boolean;
  handleClose: () => void;
  submitData: (values: RepairRequestType) => void;
}

export const RepairModal: FC<RepairModalProps> = ({
  handleClose,
  submitData,
  open
}) => {

  const handleFinish = (values: RepairRequestType) => {
    submitData(values)
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onCancel={handleClose}
      centered={true}
      title="Заявка на ремонт"
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
          <div>
            <Form.Item
              name="model"
              label="Модель устройства"
              rules={[{required: true, message: "Введите название устройства!"}]}
              required={false}
            >
              <Input placeholder="iPhone 16 PRO MAX"/>
            </Form.Item>
            <Form.Item
              name="description"
              label="Опишите неисправность"
              rules={[{required: true, message: "Опишите неисправность устройства!"}]}
              required={false}
            >
              <Input.TextArea
                placeholder="Опишите проблему, связанную с вашим устройством..."
                rows={5}
                autoSize={{ maxRows: 5, minRows: 5 }}  
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="name"
              label="Ваше имя"
              rules={[{required: true, message: "Введите имя!"}]}
              required={false}
            >
              <Input placeholder="Иван"/>
            </Form.Item>
            <Form.Item
              name="telephone"
              label="Ваш номер телефона"
              rules={[{required: true, message: "Заполните номер телефона!"}]}
              required={false}
            >
              <Input placeholder="+7 (999) 999-99-99"/>
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
  )
}
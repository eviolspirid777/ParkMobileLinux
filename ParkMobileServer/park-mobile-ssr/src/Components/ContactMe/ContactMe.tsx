"use client";
import { FloatButton, Input, Form, notification, Button, ConfigProvider, Tooltip } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { apiClient } from "@/api/ApiClient";
import { useCallback } from "react";

import styles from "./ContactMe.module.scss";

export const ContactMe = () => {
  const [api, contextHolder] = notification.useNotification();

  const handleFormFinish = useCallback(async ({ number }: { number: string }) => {
    await apiClient.PostCall(number);
  }, []);

  const handleCallRequest = useCallback(() => {
    api.destroy();

    const notificationConfig = {
      message: "",
      description: (
        <Form onFinish={handleFormFinish}>
          <div className={styles["notification-block"]}>
            <h3>Свяжитесь со мной</h3>
            <span>
              Оставьте свой номер телефона и наш менеджер вам перезвонит
            </span>
            <Form.Item name="number">
              <Input placeholder="+7 999 999 99-99" />
            </Form.Item>
            <Button
              className={styles["submit-button"]}
              type="primary"
              htmlType="submit"
            >
              Отправить
            </Button>
          </div>
        </Form>
      ),
      placement: "bottomRight" as const,
      duration: 0,
      style: {
        width: "450px",
      },
    };

    api.open(notificationConfig);
  }, [api, handleFormFinish]);

  return (
    <>
      {contextHolder}
      <ConfigProvider
        theme={{
          components: {
            FloatButton: {
              colorPrimary: "#000000",
              colorBgElevated: "#000000",
            }
          }
        }}
      >
        <Tooltip title="Заказать обратный звонок">
          <FloatButton
            style={{
              transform: "scale(1.2)", 
              border: "1px solid white",
            }}
            icon={<PhoneOutlined style={{ color: "#ffffff" }} />}
            onClick={handleCallRequest}
          />
        </Tooltip>
      </ConfigProvider>
    </>
  );
};

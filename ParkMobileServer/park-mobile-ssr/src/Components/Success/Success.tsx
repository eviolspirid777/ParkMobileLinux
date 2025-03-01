"use client"
import { Button, ConfigProvider, Result } from "antd";
import { useRouter } from "next/navigation";

export const Success = () => {
  const navigate = useRouter();

  const handleNavigateHome = () => {
    navigate.push("/")
  }

  return (
    <Result
      status="success"
      title="Покупка совершена успешно!"
      style={{
        height: "80vh",
        paddingTop: "10%"
      }}
      extra={[
        <ConfigProvider
          key="1"
          theme={{
            components: {
              Button: {
                colorPrimary: '#829a86', // Основной цвет для кнопок
                colorPrimaryHover: '#a2c0a7', // Цвет при наведении
                colorPrimaryActive: '#768d7a', // Цвет при нажатии
              }
            }
          }}
        >
          <Button
            type="primary"
            onClick={handleNavigateHome}
          >
            Домой
          </Button>
        </ConfigProvider>
      ]}
    />
  )
}
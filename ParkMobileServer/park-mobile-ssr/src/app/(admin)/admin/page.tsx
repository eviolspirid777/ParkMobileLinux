"use client";
import { Button, Form, Input, notification } from "antd";
import styles from "./PageStyles.module.scss";
import { LoadingComponent } from "@/Shared/Components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import { LoginType, useLoginAdmin } from "@/hooks/useLoginAdmin";
import { useRegisterAdmin } from "@/hooks/useRegisterAdmin";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = useForm();
  const navigate = useRouter();

  const { isLoginPending, isLoginSuccess, loginMutate, loginResponse } =
    useLoginAdmin();

  const {
    isRegisterPending,
    isRegisterError,
    registerAsync,
    resetRegisterStatus,
  } = useRegisterAdmin();

  const [isLoadingForm, setIsLoadingForm] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingForm(false)
    }, 100)
  }, [])

  if (isRegisterError) {
    api.open({
      message: "Запрос на регистрация отклонен!",
      showProgress: true,
      type: "error",
      placement: "bottomRight",
      onClose: api.destroy,
      duration: 5,
    });
    resetRegisterStatus();
  }

  if (isLoginSuccess && loginResponse?.status !== 204) {
    form.resetFields();
    navigate.push("/admin/menu");
  }

  const handleFinish = (values: LoginType) => {
    loginMutate(values);
  };

  const handleRegisterAccount = async () => {
    const values = form.getFieldsValue();
    await registerAsync(values);
  };

  return (
    <>
      {contextHolder}

        {isLoginPending || isRegisterPending || isLoadingForm ? (
          <div className={styles["loading-contanier"]}>
            <LoadingComponent />
          </div>
        ) : (
          <div className={styles["login-container"]}>
            <h1>ParkMobile Admin Page</h1>
            <Form onFinish={handleFinish} form={form}>
              <Form.Item
                label="Логин"
                name="userName"
                rules={[{ required: true, message: "Введите логин!" }]}
                required={false}
              >
                <Input placeholder="Введите логин" />
              </Form.Item>
              <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: "Введите пароль!" }]}
                required={false}
              >
                <Input.Password placeholder="Введите пароль" />
              </Form.Item>
              <div className={styles["button-block"]}>
                <Form.Item>
                  <Button type="link" onClick={handleRegisterAccount}>
                    Зарегистрироваться
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    Войти
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        )}
    </>
  );
};

export default LoginPage;

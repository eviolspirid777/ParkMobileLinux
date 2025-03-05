import { Form, Input } from "antd"
import { ChangeEvent } from "react";
import styles from "../ShopBucket.module.scss"

export const BaseShopBucketFormData = () => {
    const validatePhoneNumber = (_: unknown, value: string) => {
        const phoneRegex = /^(\+7|7|8)\d{10}$|^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    
        if (!value) {
          return Promise.reject();
        }
    
        if (!phoneRegex.test(value)) {
          return Promise.reject('Неверный формат телефона!');
        }
    
        return Promise.resolve();
      };
    
      const validateMail = (_: unknown, value: string) => {
        const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if(!value || !mailRegex.test(value)) {
          return Promise.reject()
        }
    
        return Promise.resolve();
      }
    
      const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const digits = value.replace(/\D/g, '');
        let formattedValue = '';
        if (digits.length > 0) {
          formattedValue = `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
        }
        e.target.value = formattedValue;
      };

    return (
        <>
          <div
            className={
              styles["submit-shopping-block-data-user-info-telname"]
            }
          >
            <Form.Item
              name="reciver"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя!",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="ФИО получателя*"
              />
            </Form.Item>
            <Form.Item
              name="telephone"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите телефон!",
                },
                {
                  validator: validatePhoneNumber
                }
              ]}
            >
                <Input
                type="tel"
                placeholder="+7 (999) 999-99-99"
                onChange={handlePhoneChange}
                />
            </Form.Item>
            </div>
            <Form.Item
            name="email"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: "Заполните электронную почту!",
                validator: validateMail
              }
            ]}
            >
            <Input
                type="email"
                placeholder="Ваша электронная почта"
            />
            </Form.Item>
        </>
    )
}
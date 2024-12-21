import { Map, YMaps } from "@pbe/react-yandex-maps";
import { Form, Input } from "antd";

export const SdekComponent = () => {
  return (
    <>
      <YMaps>
        <div>
          <Form.Item name="postmat">
            <Input type="text" placeholder="Выберите пункт получения" />
          </Form.Item>
        </div>
        <Map
          defaultState={{
            center: [45.018244, 38.965192],
            zoom: 17,
          }}
          width="100%"
          height="360px"
          onLoad={(ymaps) => {
            console.log(ymaps);
          }}
        ></Map>
        <div style={{ marginTop: "10px" }}>
          <Form.Item
            name="reciver"
            rules={[
              {
                required: true,
                message: "Пожалуйста, заполните получателя!",
              },
            ]}
          >
            <Input type="text" placeholder="Получатель: Иванов Иван Иванович" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="description">
            <Input type="text" placeholder="Комментарий к заказу" />
          </Form.Item>
        </div>
      </YMaps>
    </>
  );
};

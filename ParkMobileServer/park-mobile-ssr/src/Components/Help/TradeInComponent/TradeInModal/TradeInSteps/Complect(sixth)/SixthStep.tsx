import { useAtom } from "jotai";
import styles from "./SixthStep.module.scss";
import { tradeInAtom } from "@/Store/TradeInStore";
import { ConfigProvider, Radio, RadioChangeEvent } from "antd";

export const SixthStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      complectation: value.target.value,
    }));
  };
  
  return (
    <div className={styles["forth-step-block"]}>
      <h3>Комплектация устройства полная?</h3>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#87a08b",
          },
        }}
      >
        <Radio.Group
          className={styles["forth-step-block-radio-group"]}
          size="large"
          onChange={handleChange}
          defaultValue={tradeInStore?.complectation && tradeInStore.complectation}
        >
          <Radio value={"Полная комплектация"} style={{fontSize: "1rem"}}>Да, комплектация полная</Radio>
          <Radio value={"Неполная комплектация"} style={{fontSize: "1rem"}}>Нет, комплектация неполная</Radio>
        </Radio.Group>
      </ConfigProvider>
    </div>
  )
}
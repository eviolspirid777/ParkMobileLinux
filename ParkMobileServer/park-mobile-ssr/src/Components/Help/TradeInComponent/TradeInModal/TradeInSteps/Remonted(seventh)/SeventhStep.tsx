import { ConfigProvider, Radio, RadioChangeEvent } from "antd";
import styles from "./SeventhStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const SeventhStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleChange = (value: RadioChangeEvent) => {
    setTradeInStore((prevValues) => ({
      ...prevValues,
      remonted: value.target.value,
    }));
  };

  return (
    <div className={styles["forth-step-block"]}>
      <h3>Ремонитровалось ли устройство?</h3>
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
          defaultValue={tradeInStore?.remonted && tradeInStore.remonted}
        >
          <Radio value={"Ремонтировалось"} style={{fontSize: "1rem"}}>Да, устройство было в ремонте</Radio>
          <Radio value={"Не ремонтировалось"} style={{fontSize: "1rem"}}>Нет, устройство не ремонтировалось</Radio>
        </Radio.Group>
      </ConfigProvider>
    </div>
  );
};

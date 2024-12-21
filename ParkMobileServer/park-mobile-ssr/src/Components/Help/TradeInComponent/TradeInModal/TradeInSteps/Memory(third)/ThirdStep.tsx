import { ChangeEvent } from "react";
import styles from "./ThirdStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const ThirdStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTradeInStore(prev => ({...prev, memory: event.target.value}))
  }

  return (
    <div className={styles["second-step-block"]}>
      <h3>Укажите объем памяти вашего устройства</h3>
      <input
        type="text"
        placeholder="256gb"
        defaultValue={tradeInStore?.memory && tradeInStore.memory}
        onChange={handleInputChange}
      />
    </div>
  );
};

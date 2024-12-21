import { useAtom } from "jotai";
import styles from "./SecondStep.module.scss";
import { tradeInAtom } from "@/Store/TradeInStore";
import { ChangeEvent } from "react";

export const SecondStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTradeInStore(prev => ({...prev, color: event.target.value}))
  }

  return (
    <div className={styles["second-step-block"]}>
      <h3>Укажите цвет</h3>
      <input
        type="text"
        placeholder="Black"
        onChange={handleInputChange}
        defaultValue={tradeInStore?.color && tradeInStore.color}
      />
    </div>
  );
};

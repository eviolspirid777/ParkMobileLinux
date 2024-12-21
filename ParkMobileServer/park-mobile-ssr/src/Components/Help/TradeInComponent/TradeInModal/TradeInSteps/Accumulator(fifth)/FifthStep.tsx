import { useAtom } from "jotai";
import styles from "./FifthStep.module.scss";
import { tradeInAtom } from "@/Store/TradeInStore";

export const FifthStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleSelectItem = (itemTag: string) => {
    setTradeInStore((prev) => ({ ...prev, accumulator: itemTag }));
  };

  return (
    <div className={styles["fifth-step-block"]}>
      <h3>Укажите состояние аккумулятора</h3>
      <input
        type="text"
        placeholder="85%"
        onChange={event => handleSelectItem(event.target.value)}
        defaultValue={tradeInStore?.accumulator}
      />
    </div>
  );
}
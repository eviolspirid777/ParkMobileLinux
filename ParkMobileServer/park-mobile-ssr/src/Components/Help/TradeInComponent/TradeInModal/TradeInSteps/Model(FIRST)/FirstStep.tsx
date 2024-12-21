import styles from "./FirstStep.module.scss";
import { useAtom } from "jotai";
import { tradeInAtom } from "@/Store/TradeInStore";

export const FirstStep = () => {
  const [tradeInStore, setTradeInStore] = useAtom(tradeInAtom);

  const handleSelectItem = (itemTag: string) => {
    setTradeInStore((prev) => ({ ...prev, deviceType: itemTag }));
  };

  return (
    <div className={styles["first-step-block"]}>
      <h3>Укажите устройство, которое планируете сдать в Trade-in</h3>
      <input
        type="text"
        placeholder="iPhone 16 PRO MAX"
        onChange={event => handleSelectItem(event.target.value)}
        defaultValue={tradeInStore?.deviceType}
      />
    </div>
  );
};

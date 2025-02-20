import { SIGNAL_R_ORDERS } from "@/api/ApiClient";
import { ordersCountAtom } from "@/Store/OrdersStore";
import * as signalR from "@microsoft/signalr";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useOrdersCount = () => {
  const [, setCountFromStore] = useAtom(ordersCountAtom);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
                              .withUrl(SIGNAL_R_ORDERS)
                              .build();

    connection.on("ReceiveOrderCount", (count: number) => {
      setCountFromStore(count);
    })

    const startConnection = async () => {
      try {
        await connection.start();
        console.debug("Подключено к SignalR")
      } catch (err) {
        console.debug(`Ошибка подключения к SignalR ${err}`)
      }
    }

    startConnection();

    return () => {
      connection.stop();
    }
  }, [])
}
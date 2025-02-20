import { apiClient } from "@/api/ApiClient"
import { ordersAtom } from "@/Store/OrdersStore"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"

export const useGetOrders = () => {
  const [, setOrdersFromStore] = useAtom(ordersAtom)

  const {
    data: orders,
    isSuccess: isOrdersSuccess,
    isError: isOrderError
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => await apiClient.GetOrders(),
  })

  useEffect(() => {
    if(orders) {
      setOrdersFromStore(orders)
    }
  }, [isOrdersSuccess])

  return {
    isOrdersSuccess,
    isOrderError
  }
}
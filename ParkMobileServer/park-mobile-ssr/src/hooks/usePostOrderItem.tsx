import { apiClient } from "@/api/ApiClient"
import { OrderItem } from "@/Types/OrderItem"
import { useMutation } from "@tanstack/react-query"

export const usePostOrderItem = () => {
  const {
    isSuccess: isPostOrderItemSuccess,
    mutateAsync: postOrderItemAsync,
  } = useMutation({
    mutationFn: (item: OrderItem) => apiClient.PostOrderItem(item)
  })

  return {
    isPostOrderItemSuccess,
    postOrderItemAsync,
  }
}
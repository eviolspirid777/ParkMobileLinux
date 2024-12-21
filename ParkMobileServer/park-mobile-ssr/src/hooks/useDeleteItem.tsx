import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteItem = () => {
  const { mutate: deleteItem } = useMutation({
    mutationFn: (id: number) => apiClient.DeleteItem(id),
  });
  return {
    deleteItem,
  };
};

import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export const useGetItemById = () => {

  const { data: cardData, mutate } = useMutation({
    mutationFn: async (id: number) => apiClient.GetItem(id),
  });

  return {
    cardData,
    mutate
  }
}
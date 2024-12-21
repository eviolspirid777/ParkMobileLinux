import { apiClient } from "@/api/ApiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetItemsAdmin = () => {
  const {
    data: itemsList,
    refetch: refetchItemsList,
    isSuccess: itemsListIsSuccess,
  } = useQuery({
    queryKey: ["itemsListAdmin"],
    queryFn: () => apiClient.GetItemsAdmin(0, 100),
  });
  return {
    itemsList,
    refetchItemsList,
    itemsListIsSuccess,
  };
};

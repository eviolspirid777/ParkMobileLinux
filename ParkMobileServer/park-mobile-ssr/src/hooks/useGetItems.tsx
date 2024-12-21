import { apiClient } from "@/api/ApiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetItems = () => {
  const {
    data: itemsList,
    refetch: refetchItemsList,
    isSuccess: itemsListIsSuccess,
  } = useQuery({
    queryKey: ["itemsList"],
    queryFn: () => apiClient.GetItems(0, 100),
  });
  return {
    itemsList,
    refetchItemsList,
    itemsListIsSuccess,
  };
};

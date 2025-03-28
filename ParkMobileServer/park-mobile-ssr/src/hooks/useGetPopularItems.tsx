import { apiClient } from "@/api/ApiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularItems = () => {
  const {
    data: popularItemsList,
    refetch: refetchPopularItemsList,
    isSuccess: popularItemsListIsSuccess,
    isLoading: popularItemsIsLoading,
  } = useQuery({
    queryKey: ["popularItemsList"],
    queryFn: () => apiClient.GetPopularItems(),
  });
  return {
    popularItemsList,
    refetchPopularItemsList,
    popularItemsListIsSuccess,
    popularItemsIsLoading
  };
};

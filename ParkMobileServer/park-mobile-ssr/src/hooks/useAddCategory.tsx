import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";
import { useGetCategories } from "./useGetCategories";

export const useAddCategory = () => {
  const { refetchCategories } = useGetCategories();

  const {
    isPending: isCategoryPending,
    isSuccess: isCategorySuccess,
    mutateAsync: mutateAsync,
  } = useMutation({
    mutationFn: async (name: string) => await apiClient.PostCategory(name),
    onSuccess: () => {
      refetchCategories();
    },
  });

  return {
    mutateAsync,
    isCategoryPending,
    isCategorySuccess,
  };
};

import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";
import { useGetBrands } from "./useGetBrands";

export const useAddBrand = () => {
  const { refetchBrands } = useGetBrands();

  const {
    isPending: isBrandPending,
    isSuccess: isBrandSuccess,
    mutateAsync,
  } = useMutation({
    mutationFn: async (name: string) => await apiClient.PostBrand(name),
    onSuccess: () => {
      refetchBrands();
    },
  });

  return {
    mutateAsync,
    isBrandPending,
    isBrandSuccess,
  };
};

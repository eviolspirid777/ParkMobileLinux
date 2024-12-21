import { apiClient } from "@/api/ApiClient";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useGetCategories = () => {
  const [, setCategories] = useAtom(categoriesAtom);

  const {
    data: categoriesFromServer,
    isFetched: isCategoriesFetched,
    isSuccess: isCategoriesSuccess,
    isRefetching,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => apiClient.GetCategories(),
  });

  useEffect(() => {
    setCategories(categoriesFromServer);
  }, [isCategoriesSuccess, isRefetching]);

  return {
    refetchCategories,
    categoriesFromServer,
    isCategoriesFetched,
    isCategoriesSuccess,
  };
};

import { apiClient } from "@/api/ApiClient";
import { brandsAtom } from "@/Store/BrandsStore";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useGetBrands = () => {
  const [, setBrands] = useAtom(brandsAtom);

  const {
    data: brandsFromServer,
    isFetched: isBrandsFetched,
    isSuccess: isBrandsSuccess,
    isRefetching,
    refetch: refetchBrands,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await apiClient.GetBrands(),
  });

  useEffect(() => {
    setBrands(brandsFromServer);
  }, [isBrandsSuccess, isRefetching]);

  return {
    isBrandsSuccess,
    isBrandsFetched,
    brandsFromServer,
    refetchBrands,
  };
};

import { apiClient } from "@/api/ApiClient";
import { 
  currentPageAtom,
  searchKeyWordAtom
} from "@/Store/AdminItems";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const useGetItemsAdmin = () => {
  const [skip, setSkip] = useState(0);
  const [currentPage, ] = useAtom(currentPageAtom)
  const [searchKeyWord, ] = useAtom(searchKeyWordAtom);

  const {
    data: itemsList,
    refetch: refetchItemsList,
    isSuccess: itemsListIsSuccess,
  } = useQuery({
    queryKey: ["itemsListAdmin", skip, searchKeyWord],
    queryFn: () => apiClient.GetItemsAdmin(skip, 10, searchKeyWord),
  });

  useEffect(() => {
    setSkip(currentPage === 1 ? 0 : (currentPage - 1) * 10)
  }, [currentPage])

  useEffect(() => {
    refetchItemsList();
  }, [searchKeyWord]);

  return {
    itemsList,
    refetchItemsList,
    itemsListIsSuccess,
  };
};

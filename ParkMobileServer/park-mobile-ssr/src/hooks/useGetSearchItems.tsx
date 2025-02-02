import { apiClient } from "@/api/ApiClient";
import { searchedItemsAtom } from "@/Store/SearchedItemsStore";
import { GetItemByNameType } from "@/Types/GetItemByName";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useGetSearchItems = () => {
  const [, setSearchedItemsFromStore] = useAtom(searchedItemsAtom);

  const {
    data: searchedItems,
    isPending: isSearchedItemsPending,
    isSuccess: isSearchedItemsSuccess,
    isError: isSearchedItemsError,
    mutateAsync: mutateSearchedItems,
  } = useMutation({
    mutationFn: async (item: GetItemByNameType) => apiClient.GetSearchItems(item),
    onSuccess: (data) => {
      setSearchedItemsFromStore(data.items);
    },
    onError: () => {
      setSearchedItemsFromStore([]);
    },
  });

  return {
    searchedItems,
    isSearchedItemsPending,
    isSearchedItemsSuccess,
    isSearchedItemsError,
    mutateSearchedItems,
  };
};

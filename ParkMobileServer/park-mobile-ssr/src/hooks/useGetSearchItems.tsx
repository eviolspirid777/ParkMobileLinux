import { apiClient } from "@/api/ApiClient";
import { searchedItemsAtom } from "@/Store/SearchedItemsStore";
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
    mutationFn: async ({
      tag,
      skip,
      take,
      fromSearch,
    }: {
      tag: string;
      skip: number;
      take: number;
      fromSearch?: boolean;
    }) => apiClient.GetSearchItems(tag, skip, take, fromSearch),
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

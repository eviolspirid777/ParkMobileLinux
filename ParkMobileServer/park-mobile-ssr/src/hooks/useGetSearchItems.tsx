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
    mutateAsync: mutateSearchedItems,
  } = useMutation({
    mutationFn: async ({
      tag,
      skip,
      take,
    }: {
      tag: string;
      skip: number;
      take: number;
    }) => apiClient.GetSearchItems(tag, skip, take),
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
    mutateSearchedItems,
  };
};

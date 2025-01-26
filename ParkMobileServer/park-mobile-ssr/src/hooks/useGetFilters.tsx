import { apiClient } from "@/api/ApiClient"
import { FiltersAtom } from "@/Store/Filters"
import { useQuery } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { useEffect } from "react"

export const useGetFilters = () => {
    const [, setFiltersFromStore] = useAtom(FiltersAtom)

    const {
        data: filtersResponse,
        isSuccess: isFilterSuccess,
        isRefetching,
        refetch: refetchFilters,
    } = useQuery({
        queryKey: ["filters"],
        queryFn: () => apiClient.GetFilters(),
    })

    useEffect(() => {
        setFiltersFromStore(filtersResponse)
    }, [isFilterSuccess, isRefetching])

    return {
        filtersResponse,
        isFilterSuccess,
        refetchFilters
    }
}
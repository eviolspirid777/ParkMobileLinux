import { apiClient } from "@/api/ApiClient"
import { useQuery } from "@tanstack/react-query"

export const useGetSliders = () => {
    const {
        data: sliderResponse,
        isSuccess: isSliderSuccess,
        isLoading: isSliderLoading,
        isFetched: isSliderFetched,
        isPending: isPending,
        refetch: refetchSlider,
    } = useQuery({
        queryKey: ["slider"],
        queryFn: async () => await apiClient.GetSliderData()
    })

    return {
        sliderResponse,
        isSliderLoading,
        isSliderSuccess,
        isSliderFetched,
        isPending,
        refetchSlider,
    }
}
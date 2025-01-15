import { apiClient } from "@/api/ApiClient"
import { useQuery } from "@tanstack/react-query"

export const useGetMobileSliders = () => {
    const {
        data: sliderMobileResponse,
        isSuccess: isSliderMobileSuccess,
        isLoading: isSliderMobileLoading,
        isFetched: isSliderMobileFetched,
        isPending: isMobilePending,
        refetch: refetchMobileSlider,
    } = useQuery({
        queryKey: ["slider"],
        queryFn: async () => await apiClient.GetMobileSliderData()
    })

    return {
        sliderMobileResponse,
        isSliderMobileLoading,
        isSliderMobileSuccess,
        isSliderMobileFetched,
        isMobilePending,
        refetchMobileSlider,
    }
}
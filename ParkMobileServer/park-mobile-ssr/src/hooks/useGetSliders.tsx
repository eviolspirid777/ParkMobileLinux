import { apiClient } from "@/api/ApiClient"
import { useMutation } from "@tanstack/react-query"

export const useGetSlidersAdmin = () => {
    const {
        data: sliderResponse,
        isSuccess: isSliderSuccess,
        mutate: refetchSlider,
    } = useMutation({
        mutationKey: ["slider"],
        mutationFn: async () => await apiClient.GetSliderDataAdmin()
    })

    return {
        sliderResponse,
        isSliderSuccess,
        refetchSlider,
    }
}
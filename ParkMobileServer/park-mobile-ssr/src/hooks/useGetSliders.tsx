import { apiClient } from "@/api/ApiClient"
import { useMutation } from "@tanstack/react-query"

export const useGetSliders = () => {
    const {
        data: sliderResponse,
        isSuccess: isSliderSuccess,
        mutate: refetchSlider,
    } = useMutation({
        mutationKey: ["slider"],
        mutationFn: async (isForAdmin: boolean = false) => await apiClient.GetSliderData(isForAdmin)
    })

    return {
        sliderResponse,
        isSliderSuccess,
        refetchSlider,
    }
}
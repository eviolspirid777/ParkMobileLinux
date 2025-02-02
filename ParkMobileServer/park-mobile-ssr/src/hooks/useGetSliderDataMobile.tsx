import { apiClient } from "@/api/ApiClient"
import { useMutation } from "@tanstack/react-query"

export const useGetSliderDataMobile = () => {
    const {
        data: mobileSliderData,
        mutateAsync: getMobileSliderDataAsync,
        isSuccess: isMobileDataSuccess,
        isPending: isMobileDataPending,
    } = useMutation({
        mutationKey: ["sliderMobile"],
        mutationFn: () => apiClient.GetMobileSliderData()
    })

    return {
        mobileSliderData,
        getMobileSliderDataAsync,
        isMobileDataSuccess,
        isMobileDataPending
    }
}
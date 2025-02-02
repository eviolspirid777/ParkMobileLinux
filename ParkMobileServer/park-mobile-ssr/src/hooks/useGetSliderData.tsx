import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export const useGetSliderData = () => {
    const {
        data: sliderData,
        mutateAsync: getSliderDataAsync,
        isSuccess: isGetSliderDataSuccess,
        isPending: isGetSliderDataPending,
    } = useMutation({
        mutationKey: ["sliderData"],
        mutationFn: () => apiClient.GetSliderData(),
    })

    return {
        sliderData,
        getSliderDataAsync,
        isGetSliderDataSuccess,
        isGetSliderDataPending
    }
}
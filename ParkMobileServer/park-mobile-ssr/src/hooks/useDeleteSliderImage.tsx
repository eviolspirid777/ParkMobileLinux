import { apiClient } from "@/api/ApiClient"
import { useMutation } from "@tanstack/react-query"

export const useDeleteSliderImage = () => {
    const {
        mutateAsync: deleteSlideAsync,
        isSuccess: isDeleteSlideSuccess
    } = useMutation({
        mutationFn: async (id: number) => await apiClient.DeleteSliderData(id),
    })

    return {
        deleteSlideAsync,
        isDeleteSlideSuccess
    }
}
import { apiClient } from "@/api/ApiClient"
import { useMutation } from "@tanstack/react-query"

export const usePostFilters = () => {
    const {
        data: postFilterResponse,
        isSuccess: isPostFilterSuccess,
        isError: isPostFilterError,
        mutateAsync: postFilterAsync,
    } = useMutation({
        mutationFn: (name: string) => apiClient.PostFilter(name)
    })

    return {
        postFilterResponse,
        isPostFilterError,
        isPostFilterSuccess,
        postFilterAsync
    }
}
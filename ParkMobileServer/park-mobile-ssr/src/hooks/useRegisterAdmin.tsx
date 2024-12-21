import { apiClient, AuthorizationType } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export const useRegisterAdmin = () => {
  const {
    mutateAsync: registerAsync,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
    isError: isRegisterError,
    reset: resetRegisterStatus,
  } = useMutation({
    mutationFn: async (values: AuthorizationType) => apiClient.Register(values),
  });
  return {
    registerAsync,
    isRegisterPending,
    isRegisterSuccess,
    isRegisterError,
    resetRegisterStatus,
  };
};

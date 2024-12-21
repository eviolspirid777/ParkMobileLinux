import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export type LoginType = {
  userName: string;
  password: string;
};

export const useLoginAdmin = () => {
  const {
    data: loginResponse,
    mutate: loginMutate,
    isPending: isLoginPending,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: async (account: LoginType) => apiClient.Login(account),
  });
  return {
    loginResponse,
    loginMutate,
    isLoginPending,
    isLoginSuccess,
  };
};

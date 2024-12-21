import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export type RepairRequestType = {
  model: string,
  description: string,
  name: string,
  telephone: string
}

export const useAddRepairRequest = () => {
  const {
    isPending: isRepairPending,
    isSuccess: isRepairSuccess,
    mutateAsync: mutateAsync,
  } = useMutation({
    mutationFn: async (request: RepairRequestType) => await apiClient.RepairRequest(request),
  });

  return {
    mutateAsync,
    isRepairPending,
    isRepairSuccess,
  };
};

import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePhoto = () => {
  const { mutate: updatePhoto } = useMutation({
    mutationFn: (formData: FormData) => apiClient.UpdatePhoto(formData),
  });
  return {
    updatePhoto,
  };
};

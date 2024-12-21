import { apiClient } from "@/api/ApiClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useSession = () => {
  const router = useRouter();
  const [sessionToken, setSessionToken] = useState(apiClient.sessionToken);

  useEffect(() => {
    localStorage.setItem("sessionToken", apiClient.sessionToken as string); // Или другое место хранения токена
    const token = localStorage.getItem("sessionToken");
    setSessionToken(token);
  }, []);

  const logout = async () => {
    setSessionToken(null);
    await apiClient.Logout();
    router.push("/admin");
  };

  return {
    sessionToken,
    setSessionToken,
    logout,
  };
};

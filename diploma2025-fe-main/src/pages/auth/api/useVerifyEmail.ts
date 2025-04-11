import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@shared/api/axios";
import { Error } from "src/types/types";

export default function useVerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return useQuery<void, Error>({
    queryKey: ["verifyEmail", token],
    queryFn: async () => {
      const response = await api.get(
        `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/verify-email?token=${token}`
      );
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });
}

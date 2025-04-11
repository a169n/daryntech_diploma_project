import { useMutation } from "@tanstack/react-query";
import { Error } from "src/types/types";

export default function useGoogleLogin() {
  return useMutation<void, Error>({
    mutationFn: async () => {
      try {
        window.location.href = `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/google`;
      } catch (error) {
        console.error("Error initiating Google login:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Handle success if needed
    },
    onError: (error) => {
      console.error("Google login failed:", error);
    },
  });
}

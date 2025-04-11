import api from "@shared/api/axios";
import { useMutation } from "@tanstack/react-query";
import { Error } from "src/types/types";

type SignupParams = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupResponse = {
  message: string;
};

export default function useSignup() {
  return useMutation<SignupResponse, Error, SignupParams>({
    mutationFn: async ({
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }) => {
      try {
        const response = await api.post<SignupResponse>(
          `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/signup`,
          {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          }
        );
        return response.data;
      } catch (error: any) {
        console.error("Error signing up:", error);
        throw error.response?.data || error;
      }
    },
    onSuccess: (data) => {
      console.log("Signup successful:", data.message);
    },
    onError: (error) => {
      console.error("Signup failed:", error.message);
    },
  });
}

import api from "@shared/api/axios";
import { useMutation } from "@tanstack/react-query";
import { Error } from "src/types/types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  message?: string;
};

type TokenPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
};

export default function useLogin() {
  return useMutation<LoginResponse, Error, LoginParams>({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await api.post<LoginResponse>(
          `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error logging in:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");

      const decoded: TokenPayload = jwtDecode(data.access_token);

      Cookies.set("access_token", data.access_token, {
        expires: new Date(decoded.exp * 1000),
        path: "/",
      });
      Cookies.set("refresh_token", data.refresh_token, {
        path: "/",
      });

      return data;
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

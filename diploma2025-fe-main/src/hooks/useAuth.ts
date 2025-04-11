/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import api from "@shared/api/axios";
import { jwtDecode } from "jwt-decode";

type User = {
  userId: string;
  email: string;
  role: string;
};

type TokenPayload = {
  sub: string;
  email: string;
  role: string;
  exp: number;
};

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    try {
      const decoded: TokenPayload = jwtDecode(accessToken);

      // Check expiration
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        if (refreshToken) {
          refreshAccessToken(refreshToken);
        } else {
          logout();
        }
      } else {
        setUser({
          userId: decoded.sub,
          email: decoded.email,
          role: decoded.role,
        });
      }
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }

    setLoading(false);
  }, []);

  async function refreshAccessToken(refreshToken: string) {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_REACT_APP_BASE_API_URL}/auth/refresh`,
        { refreshToken }
      );
      const newAccessToken = response.data.access_token;

      const decoded: TokenPayload = jwtDecode(newAccessToken);
      setUser({
        userId: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });

      Cookies.set("access_token", newAccessToken, {
        expires: new Date(decoded.exp * 1000),
        path: "/",
      });
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  }

  function logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setUser(null);
  }

  return { user, loading, logout };
}

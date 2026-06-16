"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { getAccessToken } from "@/lib/api";

function isTokenExpired(token: string | null): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp;
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export default function AuthCheck() {
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const rehydrated = useAuthStore((state) => state.rehydrated);

  useEffect(() => {
    if (!rehydrated || !isAuthenticated) return;

    const token = getAccessToken();
    if (isTokenExpired(token)) {
      logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }

    // Check every 5 minutes
    const interval = setInterval(() => {
      const t = getAccessToken();
      if (isTokenExpired(t)) {
        logout();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated, rehydrated, logout]);

  return null;
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  username: string;
  role: string;
  exp?: number;
  iat?: number;
}

interface AuthContextType {
  token: string | null;
  user: { username: string; role: string } | null;
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  getAuthHeaders: (includeContentType?: boolean) => HeadersInit;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to parse expiration time from environment variable
const parseExpireTime = (expireStr: string): number => {
  const match = expireStr.match(/^(\d+)([dhm])$/);
  if (!match) return 2 * 24 * 60 * 60 * 1000; // Default: 2 days

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60 * 1000; // days to ms
    case "h":
      return value * 60 * 60 * 1000; // hours to ms
    case "m":
      return value * 60 * 1000; // minutes to ms
    default:
      return 2 * 24 * 60 * 60 * 1000; // fallback: 2 days
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token");
    }
    return null;
  });

  const [user, setUser] = useState<{ username: string; role: string } | null>(
    () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("admin_user");
        return storedUser ? JSON.parse(storedUser) : null;
      }
      return null;
    },
  );

  const router = useRouter();
  const logoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Helper function to get token expiration time
  const getTokenExpirationTime = (
    token: string,
    currentTime: number = Date.now(),
  ): number | null => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      // If JWT has exp field, use it (convert from seconds to milliseconds)
      if (decoded.exp) {
        return decoded.exp * 1000;
      }

      // Fallback to environment variable
      const expireInEnv = process.env.NEXT_PUBLIC_ADMIN_EXPIRE_IN || "2d";
      const expireDuration = parseExpireTime(expireInEnv);
      const issuedAt = decoded.iat ? decoded.iat * 1000 : currentTime;

      return issuedAt + expireDuration;
    } catch (error) {
      console.error("Error decoding token:", error);
      // Fallback: use current time + expire duration from env
      const expireInEnv = process.env.NEXT_PUBLIC_ADMIN_EXPIRE_IN || "2d";
      const expireDuration = parseExpireTime(expireInEnv);
      return currentTime + expireDuration;
    }
  };

  // Auto logout function
  const autoLogout = useCallback(() => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
    router.push("/admin/login");
  }, [router]);

  // Helper function to schedule automatic logout
  const scheduleAutoLogout = useCallback(
    (token: string, currentTime: number) => {
      // Clear existing timeout
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }

      const expirationTime = getTokenExpirationTime(token, currentTime);
      if (!expirationTime) return;

      const timeUntilExpiration = expirationTime - currentTime;

      // If token is already expired, schedule immediate logout asynchronously
      if (timeUntilExpiration <= 0) {
        logoutTimeoutRef.current = setTimeout(() => {
          autoLogout();
        }, 0);
        return;
      }

      // Schedule logout just before expiration
      logoutTimeoutRef.current = setTimeout(() => {
        autoLogout();
      }, timeUntilExpiration);
    },
    [autoLogout],
  );

  // Set up auto-logout when token changes
  useEffect(() => {
    if (token) {
      const currentTime = Date.now();
      scheduleAutoLogout(token, currentTime);
    } else {
      // Clear timeout if no token
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
        logoutTimeoutRef.current = null;
      }
    };
  }, [token, scheduleAutoLogout]);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      // Store token and user info
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    // Clear timeout
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
      logoutTimeoutRef.current = null;
    }

    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setToken(null);
    setUser(null);
    router.push("/admin/login");
  };

  const getAuthHeaders = useCallback(
    (includeContentType: boolean = true): HeadersInit => {
      if (!token) return {};

      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
      };

      if (includeContentType) {
        headers["Content-Type"] = "application/json";
      }

      return headers;
    },
    [token],
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
        getAuthHeaders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

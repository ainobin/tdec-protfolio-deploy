"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { Ad } from "@/types";

interface AdContextType {
  activeAd: Ad | null;
  isLoading: boolean;
  error: string | null;
  lastFetchTime: number | null;
  refreshActiveAd: () => Promise<void>;
}

interface AdCache {
  ad: Ad | null;
  timestamp: number;
  expiresAt: number;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Maximum retry attempts
const MAX_RETRIES = 3;

// Retry delay in milliseconds (exponential backoff base)
const RETRY_DELAY_BASE = 1000;

// Minimum time between fetches in milliseconds (30 seconds)
const MIN_FETCH_INTERVAL = 30 * 1000;

// Module-level cache to persist across component remounts
let globalAdCache: AdCache | null = null;
let fetchInProgress: Promise<Ad | null> | null = null;

export const AdProvider = ({ children }: { children: ReactNode }) => {
  const [activeAd, setActiveAd] = useState<Ad | null>(
    globalAdCache?.ad || null,
  );
  const [isLoading, setIsLoading] = useState(!globalAdCache);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(
    globalAdCache?.timestamp || null,
  );

  const retryCountRef = useRef(0);
  const mountedRef = useRef(true);

  /**
   * Check if cache is valid
   */
  const isCacheValid = useCallback((): boolean => {
    if (!globalAdCache) return false;
    return Date.now() < globalAdCache.expiresAt;
  }, []);

  /**
   * Fetch active ad with retry logic and deduplication
   */
  const fetchActiveAdInternal = useCallback(
    async (retryCount = 0): Promise<Ad | null> => {
      try {
        const response = await fetch("/api/ads/active", {
          // Allow browser caching for 30 seconds
          next: { revalidate: 30 },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          return data.data || null;
        } else {
          throw new Error(data.error || "Failed to fetch active ad");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";

        // Retry with exponential backoff
        if (retryCount < MAX_RETRIES) {
          const delay = RETRY_DELAY_BASE * Math.pow(2, retryCount);
          console.log(
            `Retrying ad fetch in ${delay}ms (attempt ${
              retryCount + 1
            }/${MAX_RETRIES})`,
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchActiveAdInternal(retryCount + 1);
        }

        throw new Error(
          `Failed to fetch active ad after ${MAX_RETRIES} attempts: ${errorMessage}`,
        );
      }
    },
    [],
  );

  /**
   * Fetch active ad with caching and deduplication
   */
  const fetchActiveAd = useCallback(
    async (force = false): Promise<void> => {
      // Check if cache is valid and we're not forcing refresh
      if (!force && isCacheValid()) {
        if (globalAdCache) {
          setActiveAd(globalAdCache.ad);
          setLastFetchTime(globalAdCache.timestamp);
          setIsLoading(false);
        }
        return;
      }

      // Prevent fetching too frequently
      if (
        !force &&
        lastFetchTime &&
        Date.now() - lastFetchTime < MIN_FETCH_INTERVAL
      ) {
        return;
      }

      // If a fetch is already in progress, wait for it
      if (fetchInProgress) {
        try {
          const result = await fetchInProgress;
          if (mountedRef.current) {
            setActiveAd(result);
            setIsLoading(false);
            setError(null);
          }
          return;
        } catch (err) {
          // Continue to try fetching if the in-progress request failed
        }
      }

      setIsLoading(true);
      setError(null);

      // Create fetch promise and store it for deduplication
      fetchInProgress = fetchActiveAdInternal(0);

      try {
        const ad = await fetchInProgress;

        // Update cache
        const now = Date.now();
        globalAdCache = {
          ad,
          timestamp: now,
          expiresAt: now + CACHE_TTL,
        };

        if (mountedRef.current) {
          setActiveAd(ad);
          setLastFetchTime(now);
          setError(null);
          retryCountRef.current = 0;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch active ad";

        if (mountedRef.current) {
          setError(errorMessage);
          // Keep showing cached ad if available
          if (globalAdCache?.ad) {
            setActiveAd(globalAdCache.ad);
          }
        }

        // console.error("Error fetching active ad:", errorMessage);
      } finally {
        fetchInProgress = null;
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    },
    [fetchActiveAdInternal, isCacheValid, lastFetchTime],
  );

  /**
   * Public method to force refresh the active ad
   */
  const refreshActiveAd = useCallback(async (): Promise<void> => {
    await fetchActiveAd(true);
  }, [fetchActiveAd]);

  // Fetch on mount if cache is invalid
  useEffect(() => {
    mountedRef.current = true;

    // Check cache validity at mount time
    const cacheValid = globalAdCache && Date.now() < globalAdCache.expiresAt;

    if (!cacheValid) {
      fetchActiveAd();
    } else if (globalAdCache) {
      // Use cached data
      setActiveAd(globalAdCache.ad);
      setLastFetchTime(globalAdCache.timestamp);
      setIsLoading(false);
    }

    return () => {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - only run on mount

  // Set up periodic refresh (every 5 minutes) to check for new ads
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (mountedRef.current && !fetchInProgress) {
        fetchActiveAd();
      }
    }, CACHE_TTL);

    return () => clearInterval(intervalId);
  }, [fetchActiveAd]);

  return (
    <AdContext.Provider
      value={{
        activeAd,
        isLoading,
        error,
        lastFetchTime,
        refreshActiveAd,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

/**
 * Hook to access ad context
 */
export const useActiveAd = (): AdContextType => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error("useActiveAd must be used within an AdProvider");
  }
  return context;
};

/**
 * Clear the global cache (useful for admin operations)
 */
export const clearAdCache = (): void => {
  globalAdCache = null;
  fetchInProgress = null;
};

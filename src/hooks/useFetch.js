import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  fetchWithCache,
  getCached,
  getStale,
  setCached,
} from "../lib/fetchCache";

const DEFAULT_TTL_MS = 5 * 60 * 1000;

/**
 * Cached fetch with stale-while-revalidate.
 * Fresh cache → instant data, no spinner.
 * Expired cache → show stale, refresh in background.
 */
const useFetch = (url, options) => {
  const ttlMs = options?.ttlMs ?? DEFAULT_TTL_MS;
  const swr = options?.swr !== false;
  const bypassCache = Boolean(options?.bypassCache);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [data, setData] = useState(() =>
    url && !bypassCache ? getCached(url) : null
  );
  const [loading, setLoading] = useState(
    () => Boolean(url) && (bypassCache || getCached(url) == null)
  );
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  const fetchData = useCallback(
    async (signal, { force = false } = {}) => {
      if (!url) {
        setLoading(false);
        return;
      }

      const axiosRest = { ...(optionsRef.current || {}) };
      delete axiosRest.ttlMs;
      delete axiosRest.swr;
      delete axiosRest.bypassCache;

      const fresh = !bypassCache && !force ? getCached(url) : null;
      if (fresh != null) {
        setData(fresh);
        setLoading(false);
        if (!swr) return;
      }

      const stale = !bypassCache ? getStale(url) : null;
      if (stale != null && fresh == null) {
        setData(stale);
        setLoading(false);
      } else if (fresh == null) {
        setLoading(true);
      }

      setIsValidating(true);
      setError(null);

      try {
        if (bypassCache) {
          const response = await axios(url, { ...axiosRest, signal });
          setCached(url, response.data, ttlMs);
          if (!signal?.aborted) setData(response.data);
        } else {
          const result = await fetchWithCache(
            url,
            (requestUrl, config) =>
              axios(requestUrl, { ...axiosRest, ...config }),
            { ttlMs, force: force || fresh == null, signal }
          );
          if (!signal?.aborted) setData(result.data);
        }
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        if (!signal?.aborted && stale == null && fresh == null) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "An error occurred while fetching data"
          );
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
          setIsValidating(false);
        }
      }
    },
    [bypassCache, swr, ttlMs, url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData(undefined, { force: true });
  }, [fetchData]);

  return { data, loading, error, refetch, isValidating };
};

export default useFetch;

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Custom hook for data fetching with loading and error states
 * @param {string} url - The URL to fetch data from
 * @param {object} options - Optional axios config options
 * @returns {object} - { data, loading, error, refetch }
 */
const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);
  const requestOptions = useMemo(() => options || {}, [options]);

  const fetchData = useCallback(
    async (signal) => {
      if (!url) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios(url, { ...requestOptions, signal });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err) || err.name === "CanceledError") return;
        setError(
          err.response?.data?.message ||
            err.message ||
            "An error occurred while fetching data"
        );
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [requestOptions, url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    return () => controller.abort();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
